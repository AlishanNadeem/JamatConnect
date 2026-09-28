import { ActivityIndicator, StyleSheet, View } from "react-native"
import Empty from "../../components/Empty"
import Icon from "../../components/Icon"
import Image from "../../components/Image"
import ReviewCard, { Stars } from "../../components/ReviewCard"
import Row from "../../components/Row"
import Text from "../../components/Text"
import colors from "../../helpers/colors"
import { GLOBAL_HORIZONTAL_PADDING, heightPixel, widthPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useBusinessDetailsController from "./useBusinessDetailsController"

const BusinessDetails = () => {

    const { values, functions } = useBusinessDetailsController()

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

    return (
        <PrimaryLayout scrollable header padding_horizontal={false}>
            <View style={styles.cover}>
                <Image source={{ uri: values.image_url }} style={styles.cover_image} />
                <View style={styles.save_button}>
                    <Icon
                        name="bookmark"
                        size={40}
                        space
                        rounded="full"
                        background={colors.white}
                        color={values.saved ? colors.primary : colors.gray}
                        onPress={functions.onToggleSave}
                    />
                </View>
            </View>

            <View style={styles.card}>
                <View style={styles.identity}>
                    <View style={styles.logo_frame}>
                        <Icon
                            rounded="full"
                            source={{ uri: values.logo_url }}
                            size={72}
                            resize="cover"
                            background={colors.background}
                        />
                    </View>

                    <Row align="center" gap={6} style={styles.name_row}>
                        <Text size={22} weight="bold" lines={2} style={styles.name}>
                            {values.name}
                        </Text>
                        {values.verified ? (
                            <Icon name="badge-check" size={20} color={colors.primary} />
                        ) : null}
                    </Row>

                    {values.category?.name ? (
                        <View style={styles.category_chip}>
                            <Text size={12} weight="semibold" color={colors.primary}>
                                {values.category.name}
                            </Text>
                        </View>
                    ) : null}

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

                    <Row align="center" gap={6} style={styles.rating_row}>
                        <Text size={14} weight="bold">
                            {values.rating_average}
                        </Text>
                        <Stars rating={Math.round(Number(values.rating_average))} size={13} />
                        <Text size={12} color={colors.gray}>
                            ({values.review_count})
                        </Text>
                    </Row>
                </View>

                {values.description ? (
                    <View style={styles.block}>
                        <Text size={13} weight="bold">
                            About
                        </Text>
                        <Text size={14} color={colors.dark_gray} style={styles.about_text}>
                            {values.description}
                        </Text>
                    </View>
                ) : null}

                {values.contact_items.length ? (
                    <View style={styles.block}>
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
                                        size={40}
                                        space
                                        rounded="half"
                                        background={colors.lightest_primary}
                                        color={colors.primary}
                                    />
                                    <View style={styles.contact_content}>
                                        <Text size={12} color={colors.gray}>
                                            {item.title}
                                        </Text>
                                        <Text size={14} weight="semibold" lines={2}>
                                            {item.label}
                                        </Text>
                                    </View>
                                    {item.url ? (
                                        <Icon name="chevron-right" size={16} color={colors.gray} />
                                    ) : null}
                                </Row>
                            ))}
                        </View>
                    </View>
                ) : null}

                {values.hours.length ? (
                    <View style={styles.block}>
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
                    <View style={styles.block}>
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

export default BusinessDetails

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: heightPixel(80),
    },
    cover: {
        position: "relative",
        height: heightPixel(180),
        backgroundColor: colors.background,
    },
    cover_image: {
        width: "100%",
        height: "100%",
    },
    save_button: {
        position: "absolute",
        top: heightPixel(12),
        right: widthPixel(16),
    },
    card: {
        marginTop: heightPixel(-36),
        marginHorizontal: GLOBAL_HORIZONTAL_PADDING,
        marginBottom: heightPixel(24),
        gap: heightPixel(20),
        paddingHorizontal: widthPixel(18),
        paddingBottom: heightPixel(20),
        borderRadius: heightPixel(20),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
    identity: {
        alignItems: "center",
        gap: heightPixel(8),
    },
    logo_frame: {
        marginTop: heightPixel(-36),
        padding: heightPixel(4),
        borderRadius: heightPixel(40),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
    name_row: {
        width: "auto",
        maxWidth: "100%",
        justifyContent: "center",
    },
    name: {
        flexShrink: 1,
        textAlign: "center",
    },
    category_chip: {
        paddingHorizontal: widthPixel(12),
        paddingVertical: heightPixel(5),
        borderRadius: heightPixel(20),
        backgroundColor: colors.lightest_primary,
    },
    open_status: {
        width: "100%",
        marginTop: heightPixel(4),
        paddingHorizontal: widthPixel(12),
        paddingVertical: heightPixel(12),
        borderRadius: heightPixel(14),
    },
    open_status_text: {
        flex: 1,
        gap: heightPixel(2),
        alignItems: "flex-start",
    },
    rating_row: {
        width: "auto",
        marginTop: heightPixel(4),
    },
    block: {
        gap: heightPixel(12),
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
        borderRadius: heightPixel(14),
        backgroundColor: colors.background,
    },
    contact_content: {
        flex: 1,
        gap: heightPixel(2),
    },
    hours_list: {
        gap: heightPixel(6),
    },
    hour_row: {
        paddingHorizontal: widthPixel(12),
        paddingVertical: heightPixel(10),
        borderRadius: heightPixel(12),
    },
    hour_row_today: {
        backgroundColor: colors.lightest_primary,
    },
    reviews_list: {
        gap: heightPixel(10),
    },
})
