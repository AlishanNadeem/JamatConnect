import { useIsFocused } from "@react-navigation/native"
import { memo, useEffect, useRef, useState } from "react"
import { AccessibilityInfo, Animated, Easing, ScrollView, StyleSheet, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import colors from "../../helpers/colors"
import { formatDate } from "../../helpers/date"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Image from "../Image"
import Row from "../Row"
import Text from "../Text"
import Touchable from "../Touchable"

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

export default memo(SponsoredBillboard)

const styles = StyleSheet.create({
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
})
