import { useIsFocused } from "@react-navigation/native"
import { AccessibilityInfo, Animated, Easing, ScrollView, StyleSheet, View } from "react-native"
import { useEffect, useRef, useState } from "react"
import LinearGradient from "react-native-linear-gradient"
import { useSelector } from "react-redux"
import Icon from "../../components/Icon"
import Image from "../../components/Image"
import Row from "../../components/Row"
import Text from "../../components/Text"
import Touchable from "../../components/Touchable"
import { APP_NAME } from "../../config/env"
import colors from "../../helpers/colors"
import { formatDate } from "../../helpers/date"
import { getGreeting } from "../../helpers/general"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import { selectUser } from "../../redux/selectors"
import useHomeController from "./useHomeController"

const GreetingCard = ({ user }) => {

    const member_since = formatDate(user?.createdAt)

    return (
        <View style={styles.card}>
            <LinearGradient
                colors={[colors.dark_primary, colors.primary, colors.light_primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
                pointerEvents="none"
            />
            <View style={styles.circle_one} />
            <View style={styles.circle_two} />
            <View style={styles.circle_three} />

            <Row align="center" gap={14} style={styles.content}>
                <View style={styles.avatar}>
                    <Icon
                        rounded="full"
                        source={{ uri: user?.image_url }}
                        size={64}
                        resize="cover"
                        border={colors.white}
                    />
                </View>
                <View style={styles.text_block}>
                    <Text size={13} weight="semibold" color={colors.lightest_primary}>
                        {getGreeting()}
                    </Text>
                    <Text size={20} weight="bold" color={colors.white} lines={1}>
                        {user?.name || "Guest"}
                    </Text>
                    {member_since ? (
                        <Row align="center" gap={6} style={styles.member_row}>
                            <Icon name="calendar" size={14} color={colors.lightest_primary} />
                            <Text size={12} color={colors.lightest_primary}>
                                Member since {member_since}
                            </Text>
                        </Row>
                    ) : null}
                </View>
            </Row>
        </View>
    )
}

// Background colours for slides without a business photo, cycled per slide (from the prototype).
const BILLBOARD_GRADIENTS = [
    ["#0B3317", "#1E6B34"],
    ["#3a2a10", "#8a5a18"],
    ["#1d1b3a", "#3d3a7a"],
    ["#0f2b3a", "#1f5f7a"],
    ["#3a1012", "#8a2a2d"],
]
const BILLBOARD_INTERVAL = 3500
const BILLBOARD_ZOOM = 6000

const BillboardSlide = ({ slot, index, width, active, animate, onPress }) => {

    const zoom = useRef(new Animated.Value(1)).current

    // Slow zoom-out each time this slide comes into view.
    useEffect(() => {
        if (!active || !animate) return
        zoom.setValue(1.12)
        const animation = Animated.timing(zoom, {
            toValue: 1,
            duration: BILLBOARD_ZOOM,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        })
        animation.start()
        return () => animation.stop()
    }, [active, animate, zoom])

    const special = slot.special
    const business = special?.business || slot.business
    const category_name = business?.category?.name
    const image_url = business?.image_url || business?.logo_url
    const ends = formatDate(special?.expires_at, { format: "D MMM" })
    const meta = [special?.discount, ends ? `Ends ${ends}` : null].filter(Boolean).join(" · ")

    return (
        <Touchable onPress={() => onPress(slot)} style={[styles.billboard_slide, { width }]}>
            <LinearGradient
                colors={BILLBOARD_GRADIENTS[index % BILLBOARD_GRADIENTS.length]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
            />
            {image_url ? (
                <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ scale: zoom }] }]}>
                    <Image source={{ uri: image_url }} style={styles.billboard_image} />
                </Animated.View>
            ) : null}
            <LinearGradient
                colors={["rgba(0,0,0,0.08)", "rgba(0,0,0,0.72)"]}
                locations={[0.22, 1]}
                style={StyleSheet.absoluteFill}
            />
            <View style={styles.billboard_tag}>
                <Text size={9} weight="bold" color={colors.white}>
                    SPONSORED
                </Text>
            </View>
            <View style={styles.billboard_text}>
                <Text size={11} color="rgba(255,255,255,0.85)" lines={1}>
                    {business?.name || "Community business"}
                    {category_name ? ` · ${category_name}` : ""}
                </Text>
                <Text size={17} weight="bold" color={colors.white} lines={1}>
                    {special?.title}
                </Text>
                {meta ? (
                    <Text size={11} color="rgba(255,255,255,0.88)" lines={1}>
                        {meta}
                    </Text>
                ) : null}
            </View>
        </Touchable>
    )
}

// Swipeable sponsored billboard carousel. Auto-advances while Home is on screen and the user isn't swiping.
const SponsoredBillboard = ({ billboards, onPress }) => {

    const is_focused = useIsFocused()
    const scroll_ref = useRef(null)
    const [width, setWidth] = useState(0)
    const [current, setCurrent] = useState(0)
    const [dragging, setDragging] = useState(false)
    const [reduce_motion, setReduceMotion] = useState(false)

    const count = billboards.length

    useEffect(() => {
        AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion)
        const subscription = AccessibilityInfo.addEventListener("reduceMotionChanged", setReduceMotion)
        return () => subscription?.remove()
    }, [])

    // Keep the index valid if the number of sponsors changes after a refetch.
    useEffect(() => {
        if (current >= count && count > 0) {
            setCurrent(0)
            scroll_ref.current?.scrollTo({ x: 0, animated: false })
        }
    }, [count, current])

    // Restart the timer whenever the page changes, so a swipe gets a full interval.
    useEffect(() => {
        if (count < 2 || !width || !is_focused || dragging) return
        const timer = setTimeout(() => {
            const next = (current + 1) % count
            scroll_ref.current?.scrollTo({ x: next * width, animated: !reduce_motion })
            setCurrent(next)
        }, BILLBOARD_INTERVAL)
        return () => clearTimeout(timer)
    }, [count, current, width, is_focused, dragging, reduce_motion])

    const onLayout = (event) => {
        const next_width = Math.round(event.nativeEvent.layout.width)
        if (next_width !== width) setWidth(next_width)
    }

    const onMomentumScrollEnd = (event) => {
        setDragging(false)
        if (!width) return
        const page = Math.round(event.nativeEvent.contentOffset.x / width)
        setCurrent(Math.max(0, Math.min(count - 1, page)))
    }

    if (!count) return null

    return (
        <View style={styles.billboard_wrap}>
            <View style={styles.billboard} onLayout={onLayout}>
                {width ? (
                    <ScrollView
                        ref={scroll_ref}
                        horizontal
                        pagingEnabled
                        nestedScrollEnabled
                        bounces={false}
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        onScrollBeginDrag={() => setDragging(true)}
                        onScrollEndDrag={() => setDragging(false)}
                        onMomentumScrollEnd={onMomentumScrollEnd}
                    >
                        {billboards.map((slot, index) => (
                            <BillboardSlide
                                key={slot._id ?? index}
                                slot={slot}
                                index={index}
                                width={width}
                                active={index === current && is_focused}
                                animate={!reduce_motion}
                                onPress={onPress}
                            />
                        ))}
                    </ScrollView>
                ) : null}
            </View>
            {count > 1 ? (
                <Row align="center" justify="center" gap={4}>
                    {billboards.map((item, index) => (
                        <View
                            key={item._id ?? index}
                            style={[styles.billboard_dot, index === current && styles.billboard_dot_active]}
                        />
                    ))}
                </Row>
            ) : null}
        </View>
    )
}

const COUNT_UP_DURATION = 800

// Animates from 0 up to `value` with an ease-out curve.
const CountUp = ({ value, ...props }) => {

    const [display, setDisplay] = useState(0)

    useEffect(() => {

        if (typeof value !== "number") return

        let frame = null
        let cancelled = false

        AccessibilityInfo.isReduceMotionEnabled().then((reduce_motion) => {

            if (cancelled) return

            if (reduce_motion || value === 0) {
                setDisplay(value)
                return
            }

            const start = Date.now()

            const tick = () => {
                const progress = Math.min(1, (Date.now() - start) / COUNT_UP_DURATION)
                const eased = 1 - Math.pow(1 - progress, 3)
                setDisplay(Math.round(value * eased))
                if (progress < 1) frame = requestAnimationFrame(tick)
            }

            setDisplay(0)
            frame = requestAnimationFrame(tick)
        })

        return () => {
            cancelled = true
            if (frame) cancelAnimationFrame(frame)
        }

    }, [value])

    return (
        <Text {...props}>
            {typeof value === "number" ? display : "–"}
        </Text>
    )
}

const plural = (count, one, many) => (count === 1 ? one : many)

const DashboardTile = ({ icon, label, count, caption, onPress }) => (
    <Row align="center" gap={10} onPress={onPress} style={styles.tile}>
        <Icon
            name={icon}
            size={40}
            space
            rounded="half"
            background={colors.lightest_primary}
            color={colors.primary}
        />
        <View style={styles.tile_text}>
            <Text size={14} weight="bold" lines={1}>
                {label}
            </Text>
            <Text size={12} color={colors.gray} lines={1}>
                <CountUp value={count} size={12} weight="bold" color={colors.primary} />
                {" "}{caption}
            </Text>
        </View>
    </Row>
)

const DashboardTiles = ({ counts, functions }) => {

    const tiles = [
        {
            key: "specials",
            icon: "tag",
            label: "Specials",
            count: counts.specials,
            caption: plural(counts.specials, "deal available", "deals available"),
            onPress: functions.onViewAllSpecials,
        },
        {
            key: "businesses",
            icon: "store",
            label: "Businesses",
            count: counts.businesses,
            caption: plural(counts.businesses, "business", "businesses"),
            onPress: functions.onViewAllBusinesses,
        },
        {
            key: "jobs",
            icon: "briefcase",
            label: "Jobs",
            count: counts.jobs,
            caption: plural(counts.jobs, "open role", "open roles"),
            onPress: functions.onViewAllJobs,
        },
        {
            key: "listings",
            icon: "shopping-bag",
            label: "Marketplace",
            count: counts.listings,
            caption: plural(counts.listings, "listing", "listings"),
            onPress: functions.onViewAllListings,
        },
    ]

    return (
        <View style={styles.tiles}>
            {[tiles.slice(0, 2), tiles.slice(2, 4)].map((row, index) => (
                <Row key={index} gap={12}>
                    {row.map(({ key, ...tile }) => (
                        <DashboardTile key={key} {...tile} />
                    ))}
                </Row>
            ))}
        </View>
    )
}

const CommunityCard = ({ onPress }) => (
    <View style={styles.community_card}>
        <LinearGradient
            colors={[colors.dark_primary, colors.primary, colors.light_primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
        />
        <View style={styles.community_circle_one} />
        <View style={styles.community_circle_two} />
        <View style={styles.community_circle_three} />

        <Row align="center" gap={14} style={styles.community_top}>
            <View style={styles.community_icon}>
                <Icon
                    name="users"
                    size={44}
                    space
                    rounded="half"
                    background={colors.white}
                    color={colors.primary}
                />
            </View>
            <View style={styles.community_text}>
                <Text size={12} weight="semibold" color={colors.lightest_primary}>
                    Referrals
                </Text>
                <Text size={18} weight="bold" color={colors.white} lines={2}>
                    Help our community grow
                </Text>
            </View>
        </Row>

        <Text size={13} color={colors.lightest_primary}>
            Invite friends and family to join {APP_NAME} and strengthen our community together.
        </Text>

        <Row align="center" justify="space-between" onPress={onPress} style={styles.community_action}>
            <Text size={14} weight="semibold" color={colors.primary}>
                Invite Friends
            </Text>
            <View style={styles.community_action_icon}>
                <Icon name="arrow-right" size={16} color={colors.white} />
            </View>
        </Row>
    </View>
)

const CATEGORY_PREVIEW_COUNT = 6

// Full-width tile that opens the Categories screen, with a preview of the category names.
const BrowseCategoriesTile = ({ categories, loading, onPress }) => {

    const names = categories
        .map((category) => category?.name)
        .filter(Boolean)
        .slice(0, CATEGORY_PREVIEW_COUNT)
        .join(", ")

    const caption = names || (loading ? "Loading categories…" : "Explore businesses by category")

    return (
        <Row align="center" gap={12} onPress={onPress} style={styles.browse_tile}>
            <Icon
                name="layout-grid"
                size={40}
                space
                rounded="half"
                background={colors.light_danger}
                color={colors.danger}
            />
            <View style={styles.tile_text}>
                <Text size={14} weight="bold" lines={1}>
                    Browse Categories
                </Text>
                <Text size={12} color={colors.gray} lines={1}>
                    {caption}
                </Text>
            </View>
            <Icon name="chevron-right" size={18} color={colors.gray} />
        </Row>
    )
}

const Home = () => {

    const user = useSelector(selectUser)
    const { values, functions } = useHomeController()

    return (
        <PrimaryLayout bottom_tab header scrollable>
            <View style={styles.container}>
                <GreetingCard user={user} />
                <SponsoredBillboard
                    billboards={values.billboards}
                    onPress={functions.onBillboardPress}
                />
                <DashboardTiles counts={values.counts} functions={functions} />
                <BrowseCategoriesTile
                    categories={values.categories}
                    loading={values.categories_loading}
                    onPress={functions.onViewAllCategories}
                />
                <CommunityCard onPress={functions.onGrowCommunity} />
            </View>
        </PrimaryLayout>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(16),
        paddingTop: heightPixel(8),
    },
    tiles: {
        gap: heightPixel(12),
    },
    tile: {
        flex: 1,
        flexBasis: 0,
        width: "auto",
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
        borderRadius: widthPixel(16),
        paddingHorizontal: widthPixel(12),
        paddingVertical: heightPixel(14),
    },
    tile_text: {
        flex: 1,
        gap: heightPixel(2),
    },
    browse_tile: {
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
        borderRadius: widthPixel(16),
        paddingHorizontal: widthPixel(12),
        paddingVertical: heightPixel(14),
    },
    billboard_wrap: {
        gap: heightPixel(7),
    },
    billboard: {
        height: heightPixel(122),
        borderRadius: widthPixel(14),
        overflow: "hidden",
        backgroundColor: colors.dark_primary,
    },
    billboard_slide: {
        height: "100%",
        overflow: "hidden",
    },
    billboard_image: {
        width: "100%",
        height: "100%",
    },
    billboard_tag: {
        position: "absolute",
        top: heightPixel(10),
        left: widthPixel(10),
        backgroundColor: "rgba(255,255,255,0.22)",
        borderRadius: widthPixel(5),
        paddingHorizontal: widthPixel(8),
        paddingVertical: heightPixel(3),
    },
    billboard_text: {
        position: "absolute",
        left: widthPixel(14),
        right: widthPixel(14),
        bottom: heightPixel(13),
        gap: heightPixel(2),
    },
    billboard_dot: {
        width: widthPixel(5),
        height: widthPixel(5),
        borderRadius: widthPixel(3),
        backgroundColor: colors.light_gray,
    },
    billboard_dot_active: {
        width: widthPixel(14),
        backgroundColor: colors.primary,
    },
    card: {
        position: "relative",
        paddingHorizontal: widthPixel(16),
        paddingVertical: heightPixel(18),
        borderRadius: heightPixel(20),
        overflow: "hidden",
        backgroundColor: colors.primary,
    },
    avatar: {
        flexShrink: 0,
    },
    circle_one: {
        position: "absolute",
        top: heightPixel(-24),
        right: widthPixel(-24),
        width: widthPixel(100),
        height: widthPixel(100),
        borderRadius: widthPixel(50),
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    circle_two: {
        position: "absolute",
        bottom: heightPixel(-32),
        left: widthPixel(-20),
        width: widthPixel(80),
        height: widthPixel(80),
        borderRadius: widthPixel(40),
        backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
    circle_three: {
        position: "absolute",
        top: heightPixel(20),
        right: widthPixel(60),
        width: widthPixel(36),
        height: widthPixel(36),
        borderRadius: widthPixel(18),
        backgroundColor: "rgba(255, 255, 255, 0.12)",
    },
    community_card: {
        position: "relative",
        gap: heightPixel(14),
        paddingHorizontal: widthPixel(16),
        paddingVertical: heightPixel(18),
        borderRadius: heightPixel(20),
        overflow: "hidden",
        backgroundColor: colors.primary,
    },
    community_circle_one: {
        position: "absolute",
        top: heightPixel(-28),
        right: widthPixel(-18),
        width: widthPixel(110),
        height: widthPixel(110),
        borderRadius: widthPixel(55),
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    community_circle_two: {
        position: "absolute",
        bottom: heightPixel(-36),
        left: widthPixel(-22),
        width: widthPixel(88),
        height: widthPixel(88),
        borderRadius: widthPixel(44),
        backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
    community_circle_three: {
        position: "absolute",
        top: heightPixel(52),
        right: widthPixel(72),
        width: widthPixel(28),
        height: widthPixel(28),
        borderRadius: widthPixel(14),
        backgroundColor: "rgba(255, 255, 255, 0.12)",
    },
    community_top: {
        width: "100%",
    },
    community_icon: {
        flexShrink: 0,
    },
    community_text: {
        flex: 1,
        gap: heightPixel(2),
    },
    community_action: {
        width: "100%",
        paddingLeft: widthPixel(16),
        paddingRight: widthPixel(8),
        paddingVertical: heightPixel(8),
        borderRadius: heightPixel(14),
        backgroundColor: colors.white,
    },
    community_action_icon: {
        width: heightPixel(32),
        height: heightPixel(32),
        borderRadius: heightPixel(16),
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        width: "100%",
    },
    text_block: {
        flex: 1,
        gap: heightPixel(4),
    },
    member_row: {
        width: "auto",
        marginTop: heightPixel(2),
    },
})
