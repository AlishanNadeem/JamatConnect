import { memo } from "react"
import { StyleSheet, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import colors from "../../helpers/colors"
import { formatDate } from "../../helpers/date"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Icon from "../Icon"
import Image from "../Image"
import Row from "../Row"
import Text from "../Text"
import Touchable from "../Touchable"

const SpecialCard = ({ data, onPress }) => {
    const {
        title,
        discount,
        description,
        business,
        expires_at,
        is_active,
        is_expired,
    } = data || {}

    const unavailable = !is_active || is_expired
    const status_label = is_expired ? "Expired" : !is_active ? "Inactive" : null
    const media_url = business?.logo_url || business?.image_url
    const ends_label = expires_at ? `Ends ${formatDate(expires_at)}` : null

    return (
        <Touchable onPress={onPress} style={[styles.container, unavailable && styles.container_muted]}>
            <LinearGradient
                colors={unavailable ? [colors.dark_gray, colors.gray] : [colors.dark_primary, colors.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.banner}
            >
                <View style={styles.banner_orb} />
                <Text size={11} weight="semibold" color={colors.lightest_primary}>
                    SPECIAL OFFER
                </Text>
                <View style={styles.discount_chip}>
                    <Text size={16} weight="bold" color={colors.white} lines={1}>
                        {discount || "Deal"}
                    </Text>
                </View>
                {status_label ? (
                    <View style={styles.status_pill}>
                        <Text size={10} weight="bold" color={colors.white}>
                            {status_label.toUpperCase()}
                        </Text>
                    </View>
                ) : null}
            </LinearGradient>

            <View style={styles.body}>
                <Row align="center" gap={10}>
                    <View style={styles.logo_wrap}>
                        {media_url ? (
                            <Image source={{ uri: media_url }} style={styles.logo} resize="cover" />
                        ) : (
                            <View style={styles.logo_fallback}>
                                <Icon name="store" size={18} color={colors.primary} />
                            </View>
                        )}
                    </View>
                    <View style={styles.business_text}>
                        <Text size={13} weight="semibold" color={colors.primary} lines={1}>
                            {business?.name || "Community business"}
                        </Text>
                        {business?.category?.name ? (
                            <Text size={11} color={colors.gray} lines={1}>
                                {business.category.name}
                            </Text>
                        ) : null}
                    </View>
                </Row>

                <Text size={16} weight="bold" lines={2} style={styles.title}>
                    {title}
                </Text>

                {description ? (
                    <Text size={12} color={colors.dark_gray} lines={2}>
                        {description}
                    </Text>
                ) : null}

                <View style={styles.footer}>
                    <View style={styles.footer_left}>
                        <Icon name="calendar-clock" size={14} color={colors.primary} />
                        <Text size={11} weight="semibold" color={colors.primary} lines={1} style={styles.footer_date}>
                            {ends_label || "Limited time"}
                        </Text>
                    </View>
                    <View style={styles.footer_action}>
                        <Text size={12} weight="semibold" color={colors.primary}>
                            View
                        </Text>
                        <Icon name="chevron-right" size={16} color={colors.primary} />
                    </View>
                </View>
            </View>
        </Touchable>
    )
}

export default memo(SpecialCard)

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: widthPixel(16),
        borderWidth: 1,
        borderColor: colors.light_gray,
        overflow: "hidden",
        position: "relative",
    },
    container_muted: {
        opacity: 0.78,
    },
    banner: {
        paddingHorizontal: widthPixel(14),
        paddingTop: heightPixel(12),
        paddingBottom: heightPixel(14),
        gap: heightPixel(2),
        overflow: "hidden",
    },
    banner_orb: {
        position: "absolute",
        width: widthPixel(90),
        height: widthPixel(90),
        borderRadius: widthPixel(45),
        backgroundColor: "rgba(255,255,255,0.12)",
        top: -heightPixel(30),
        right: -widthPixel(10),
    },
    discount_chip: {
        alignSelf: "flex-start",
        marginTop: heightPixel(4),
        backgroundColor: colors.danger,
        borderRadius: widthPixel(8),
        paddingHorizontal: widthPixel(10),
        paddingVertical: heightPixel(5),
    },
    status_pill: {
        position: "absolute",
        top: heightPixel(10),
        right: widthPixel(12),
        backgroundColor: "rgba(0,0,0,0.28)",
        borderRadius: widthPixel(999),
        paddingHorizontal: widthPixel(8),
        paddingVertical: heightPixel(3),
    },
    body: {
        paddingHorizontal: widthPixel(14),
        paddingTop: heightPixel(12),
        paddingBottom: heightPixel(12),
        gap: heightPixel(8),
    },
    logo_wrap: {
        width: widthPixel(36),
        height: widthPixel(36),
        borderRadius: widthPixel(10),
        overflow: "hidden",
        backgroundColor: colors.lightest_primary,
    },
    logo: {
        width: "100%",
        height: "100%",
    },
    logo_fallback: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    business_text: {
        flex: 1,
        gap: heightPixel(1),
    },
    title: {
        lineHeight: heightPixel(22),
    },
    footer: {
        marginTop: heightPixel(2),
        paddingTop: heightPixel(10),
        borderTopWidth: 1,
        borderTopColor: colors.light_gray,
        borderStyle: "dashed",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: widthPixel(8),
    },
    footer_left: {
        flex: 1,
        minWidth: 0,
        flexDirection: "row",
        alignItems: "center",
        gap: widthPixel(5),
    },
    footer_date: {
        flexShrink: 1,
    },
    footer_action: {
        flexShrink: 0,
        flexDirection: "row",
        alignItems: "center",
        gap: widthPixel(2),
    },
})
