import { memo } from "react"
import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { formatDate } from "../../helpers/date"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Icon from "../Icon"
import Image from "../Image"
import Text from "../Text"
import Touchable from "../Touchable"

// Compact deal row: logo with a discount strip, business, offer, then category and end date.
const SpecialCard = ({ data, onPress }) => {
    const {
        title,
        discount,
        business,
        expires_at,
        is_active,
        is_expired,
    } = data || {}

    const unavailable = !is_active || is_expired
    const status_label = is_expired ? "Expired" : !is_active ? "Inactive" : null
    const media_url = business?.logo_url || business?.image_url
    const ends = formatDate(expires_at, { format: "D MMM" })

    const meta = [
        business?.category?.name,
        status_label || (ends ? `Ends ${ends}` : null),
    ].filter(Boolean).join(" · ")

    return (
        <Touchable onPress={onPress} style={[styles.container, unavailable && styles.container_muted]}>
            <View style={styles.media}>
                {media_url ? (
                    <Image source={{ uri: media_url }} style={styles.logo} resize="cover" />
                ) : (
                    <Icon name="store" size={22} color={colors.primary} />
                )}
                {discount ? (
                    <View style={[styles.discount, unavailable && styles.discount_muted]}>
                        <Text size={9} weight="bold" color={colors.white} lines={1} align="center">
                            {discount.toUpperCase()}
                        </Text>
                    </View>
                ) : null}
            </View>

            <View style={styles.body}>
                <Text size={13} weight="semibold" lines={1}>
                    {business?.name || "Community business"}
                </Text>
                <Text size={12} lines={1}>
                    {title}
                </Text>
                {meta ? (
                    <Text size={11} color={status_label ? colors.danger : colors.gray} lines={1} style={styles.meta}>
                        {meta}
                    </Text>
                ) : null}
            </View>

            <Icon name="chevron-right" size={16} color={colors.primary} />
        </Touchable>
    )
}

export default memo(SpecialCard)

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: widthPixel(11),
        backgroundColor: colors.white,
        borderRadius: widthPixel(12),
        borderWidth: 1,
        borderColor: colors.light_gray,
        padding: widthPixel(9),
    },
    container_muted: {
        opacity: 0.78,
    },
    media: {
        width: widthPixel(58),
        height: widthPixel(58),
        borderRadius: widthPixel(9),
        overflow: "hidden",
        backgroundColor: colors.lightest_primary,
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    logo: {
        width: "100%",
        height: "100%",
    },
    discount: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.danger,
        paddingVertical: heightPixel(2),
        paddingHorizontal: widthPixel(2),
    },
    discount_muted: {
        backgroundColor: colors.dark_gray,
    },
    body: {
        flex: 1,
        minWidth: 0,
        gap: heightPixel(1),
    },
    meta: {
        marginTop: heightPixel(2),
    },
})
