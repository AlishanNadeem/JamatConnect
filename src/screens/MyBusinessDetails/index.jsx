import { ActivityIndicator, StyleSheet, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import Badge from "../../components/Badge"
import Empty from "../../components/Empty"
import Icon from "../../components/Icon"
import Image from "../../components/Image"
import ReviewCard, { Stars } from "../../components/ReviewCard"
import Row from "../../components/Row"
import Text from "../../components/Text"
import Touchable from "../../components/Touchable"
import colors from "../../helpers/colors"
import { GLOBAL_HORIZONTAL_PADDING, heightPixel, widthPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useMyBusinessDetailsController from "./useMyBusinessDetailsController"

const STATUS_BANNER = {
    success: {
        background: colors.light_success,
        color: colors.success,
    },
    warning: {
        background: colors.light_warning,
        color: colors.warning,
    },
    danger: {
        background: colors.light_danger,
        color: colors.danger,
    },
}

const StatCard = ({ icon, background, color, value, label }) => (
    <View style={styles.stat_card}>
        <Icon
            name={icon}
            size={36}
            space
            rounded="half"
            background={background}
            color={color}
        />
        <View style={styles.stat_text}>
            <Text size={22} weight="bold" color={colors.primary}>
                {value}
            </Text>
            <Text size={12} color={colors.gray}>
                {label}
            </Text>
        </View>
    </View>
)

const ActionTile = ({ icon, background, color, title, subtitle, onPress }) => (
    <Touchable style={styles.action_tile} onPress={onPress}>
        <Icon
            name={icon}
            size={44}
            space
            rounded="half"
            background={background}
            color={color}
        />
        <Text size={14} weight="semibold">
            {title}
        </Text>
        <Text size={11} color={colors.gray}>
            {subtitle}
        </Text>
    </Touchable>
)

const MyBusinessDetails = () => {

    const { values, functions } = useMyBusinessDetailsController()

    if (values.is_loading) {
        return (
            <PrimaryLayout header>
                <View style={styles.loader}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>
            </PrimaryLayout>
        )
    }

    if (values.is_error) {
        return (
            <PrimaryLayout header>
                <Empty
                    title="Something Went Wrong"
                    description="Unable to load this business. Please try again."
                />
            </PrimaryLayout>
        )
    }

    const banner = STATUS_BANNER[values.status_theme.mode] ?? STATUS_BANNER.warning

    return (
        <PrimaryLayout scrollable header padding_horizontal={false}>
            <View style={styles.hero}>
                <Image source={{ uri: values.image_url }} style={styles.cover_image} />
                <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.55)"]}
                    style={styles.cover_overlay}
                />
                <Row align="center" gap={8} style={styles.hero_badges}>
                    <Badge
                        type="dot"
                        label={values.active ? "Active" : "Inactive"}
                        mode={values.active ? "success" : "muted"}
                    />
                    {
                        values.status ? (
                            <Badge
                                type="dot"
                                label={values.status_theme.label}
                                mode={values.status_theme.mode}
                            />
                        ) : null
                    }
                </Row>
            </View>

            <View style={styles.body}>
                <View style={styles.header_card}>
                    <Row align="center" gap={14}>
                        <View style={styles.logo_frame}>
                            <Icon
                                rounded="full"
                                source={{ uri: values.logo_url }}
                                size={64}
                                resize="cover"
                                background={colors.background}
                            />
                        </View>
                        <View style={styles.header_text}>
                            <Row align="center" gap={8} style={styles.name_row}>
                                <Text size={20} weight="bold" lines={2} style={styles.name}>
                                    {values.name}
                                </Text>
                                {values.verified ? (
                                    <Icon name="badge-check" size={18} color={colors.primary} />
                                ) : null}
                            </Row>
                            {
                                values.category?.name ? (
                                    <Text size={13} color={colors.primary} weight="semibold">
                                        {values.category.name}
                                    </Text>
                                ) : null
                            }
                            <Row align="center" gap={6} style={styles.rating_row}>
                                <Text size={13} weight="bold">
                                    {values.rating_average}
                                </Text>
                                <Stars rating={Math.round(Number(values.rating_average))} size={12} />
                                <Text size={12} color={colors.gray}>
                                    ({values.review_count} reviews)
                                </Text>
                            </Row>
                        </View>
                    </Row>

                    {values.today_status ? (
                        <Row
                            align="center"
                            gap={12}
                            style={[
                                styles.open_status,
                                { backgroundColor: values.today_status.background },
                            ]}
                        >
                            <Icon
                                name={values.today_status.icon}
                                size={36}
                                space
                                rounded="half"
                                background={colors.white}
                                color={values.today_status.color}
                            />
                            <View style={styles.open_status_text}>
                                <Text size={14} weight="bold" color={values.today_status.color}>
                                    {values.today_status.label}
                                </Text>
                                {values.today_status.subtitle ? (
                                    <Text size={12} color={colors.dark_gray}>
                                        {values.today_status.subtitle}
                                    </Text>
                                ) : null}
                            </View>
                        </Row>
                    ) : null}
                </View>

                <View style={styles.stats_row}>
                    {values.stats.map((stat) => (
                        <StatCard
                            key={stat.key}
                            icon={stat.icon}
                            background={stat.background}
                            color={stat.color}
                            value={stat.value}
                            label={stat.label}
                        />
                    ))}
                </View>

                <View style={[styles.status_banner, { backgroundColor: banner.background }]}>
                    <Row align="center" gap={10}>
                        <Icon
                            name={values.status === "approved" ? "circle-check" : values.status === "rejected" ? "circle-x" : "clock"}
                            size={22}
                            color={banner.color}
                        />
                        <View style={styles.status_banner_text}>
                            <Text size={14} weight="bold" color={banner.color}>
                                {values.status_theme.label}
                                {values.active ? "" : " · Inactive"}
                            </Text>
                            <Text size={12} color={colors.dark_gray}>
                                {values.status_theme.message}
                            </Text>
                        </View>
                    </Row>
                </View>

                <View style={styles.section}>
                    <Text size={15} weight="bold">
                        Manage Business
                    </Text>
                    <View style={styles.actions_grid}>
                        {values.manage_actions.map((action) => (
                            <ActionTile
                                key={action.key}
                                icon={action.icon}
                                background={action.background}
                                color={action.color}
                                title={action.title}
                                subtitle={action.subtitle}
                                onPress={functions.action_handlers[action.onPress]}
                            />
                        ))}
                    </View>
                </View>

                {values.description ? (
                    <View style={styles.section_card}>
                        <Text size={13} weight="bold">
                            About
                        </Text>
                        <Text size={14} color={colors.dark_gray} style={styles.about_text}>
                            {values.description}
                        </Text>
                    </View>
                ) : null}

                {
                    values.contact_items.length ? (
                        <View style={styles.section_card}>
                            <Text size={13} weight="bold">
                                Contact
                            </Text>
                            <View style={styles.contact_list}>
                                {values.contact_items.map((item) => (
                                    <Row
                                        key={item.icon}
                                        align="center"
                                        gap={12}
                                        onPress={item.url ? () => functions.onOpenLink(item.url) : undefined}
                                        style={styles.contact_row}
                                    >
                                        <Icon
                                            name={item.icon}
                                            size={36}
                                            space
                                            rounded="half"
                                            background={colors.lightest_primary}
                                            color={colors.primary}
                                        />
                                        <View style={styles.contact_content}>
                                            <Text size={11} color={colors.gray}>
                                                {item.title}
                                            </Text>
                                            <Text size={13} weight="semibold" lines={2}>
                                                {item.label}
                                            </Text>
                                        </View>
                                    </Row>
                                ))}
                            </View>
                        </View>
                    ) : null
                }

                {values.hours.length ? (
                    <View style={styles.section_card}>
                        <Text size={13} weight="bold">
                            Hours
                        </Text>
                        <View style={styles.hours_list}>
                            {values.hours.map((hour) => {
                                const is_today = hour.day === values.today

                                return (
                                    <Row
                                        key={hour.day}
                                        align="center"
                                        justify="space-between"
                                        style={[styles.hour_row, is_today && styles.hour_row_today]}
                                    >
                                        <Text
                                            size={13}
                                            weight="semibold"
                                            capitalize
                                            color={is_today ? colors.primary : colors.black}
                                        >
                                            {hour.day}
                                        </Text>
                                        <Text
                                            size={13}
                                            weight={is_today ? "semibold" : "regular"}
                                            color={hour.closed ? colors.danger : colors.dark_gray}
                                        >
                                            {hour.closed ? "Closed" : `${hour.open} - ${hour.close}`}
                                        </Text>
                                    </Row>
                                )
                            })}
                        </View>
                    </View>
                ) : null}

                {values.review_count ? (
                    <View style={styles.section_card}>
                        <Row align="center" justify="space-between">
                            <Text size={13} weight="bold">
                                Reviews
                            </Text>
                            {values.review_count > values.preview_reviews.length ? (
                                <Text
                                    size={13}
                                    weight="semibold"
                                    color={colors.primary}
                                    onPress={functions.onViewAllReviews}
                                >
                                    View All
                                </Text>
                            ) : null}
                        </Row>
                        <View style={styles.reviews_list}>
                            {values.preview_reviews.map((review) => (
                                <ReviewCard key={review.id} data={review} background={colors.background} />
                            ))}
                        </View>
                    </View>
                ) : null}
            </View>
        </PrimaryLayout>
    )
}

export default MyBusinessDetails

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: heightPixel(80),
    },
    hero: {
        position: "relative",
        height: heightPixel(200),
        backgroundColor: colors.dark_primary,
    },
    cover_image: {
        width: "100%",
        height: "100%",
    },
    cover_overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    hero_badges: {
        position: "absolute",
        top: heightPixel(14),
        right: widthPixel(16),
        width: "auto",
    },
    body: {
        marginTop: heightPixel(-28),
        paddingHorizontal: GLOBAL_HORIZONTAL_PADDING,
        paddingBottom: heightPixel(28),
        gap: heightPixel(14),
    },
    header_card: {
        gap: heightPixel(14),
        padding: widthPixel(16),
        borderRadius: heightPixel(20),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
    logo_frame: {
        padding: heightPixel(3),
        borderRadius: heightPixel(40),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
    header_text: {
        flex: 1,
        gap: heightPixel(4),
    },
    name_row: {
        width: "auto",
        maxWidth: "100%",
    },
    name: {
        flexShrink: 1,
    },
    rating_row: {
        width: "auto",
        marginTop: heightPixel(2),
    },
    open_status: {
        width: "100%",
        paddingHorizontal: widthPixel(12),
        paddingVertical: heightPixel(12),
        borderRadius: heightPixel(14),
    },
    open_status_text: {
        flex: 1,
        gap: heightPixel(2),
    },
    stats_row: {
        flexDirection: "row",
        gap: widthPixel(10),
    },
    stat_card: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: widthPixel(12),
        paddingHorizontal: widthPixel(14),
        paddingVertical: heightPixel(14),
        borderRadius: heightPixel(16),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
    stat_text: {
        gap: heightPixel(2),
    },
    status_banner: {
        paddingHorizontal: widthPixel(14),
        paddingVertical: heightPixel(14),
        borderRadius: heightPixel(16),
    },
    status_banner_text: {
        flex: 1,
        gap: heightPixel(2),
    },
    section: {
        gap: heightPixel(12),
    },
    actions_grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: widthPixel(10),
    },
    action_tile: {
        width: "48%",
        flexGrow: 1,
        gap: heightPixel(6),
        padding: widthPixel(14),
        borderRadius: heightPixel(16),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
    section_card: {
        gap: heightPixel(12),
        padding: widthPixel(16),
        borderRadius: heightPixel(18),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
    about_text: {
        lineHeight: heightPixel(22),
    },
    contact_list: {
        gap: heightPixel(8),
    },
    contact_row: {
        width: "100%",
        padding: widthPixel(10),
        borderRadius: heightPixel(12),
        backgroundColor: colors.background,
    },
    contact_content: {
        flex: 1,
        gap: heightPixel(2),
    },
    hours_list: {
        gap: heightPixel(4),
    },
    hour_row: {
        paddingHorizontal: widthPixel(10),
        paddingVertical: heightPixel(10),
        borderRadius: heightPixel(10),
    },
    hour_row_today: {
        backgroundColor: colors.lightest_primary,
    },
    reviews_list: {
        gap: heightPixel(10),
    },
})
