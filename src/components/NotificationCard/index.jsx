import { memo } from "react"
import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { formatDate } from "../../helpers/date"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Icon from "../Icon"
import Row from "../Row"
import Text from "../Text"
import Touchable from "../Touchable"

const TYPE_CONFIG = {
    referral_joined: { icon: "user-plus", background: colors.lightest_primary, color: colors.primary },
    job_application: { icon: "briefcase", background: colors.light_info, color: colors.info },
    marketplace_expired: { icon: "clock", background: colors.light_warning, color: colors.warning },
    marketplace_expiry_reminder: { icon: "alarm-clock", background: colors.light_warning, color: colors.warning },
    business_approved: { icon: "badge-check", background: colors.light_success, color: colors.success },
    business_rejected: { icon: "circle-x", background: colors.light_danger, color: colors.danger },
    daily_gesture: { icon: "sparkles", background: colors.lightest_primary, color: colors.primary },
    general: { icon: "bell", background: colors.lightest_primary, color: colors.primary },
}

const getTimestamp = (data) => {
    if (data?.createdAt) return data.createdAt
    if (data?.date && data?.time) return `${data.date} ${data.time}`
    return data?.date || null
}

const NotificationCard = ({ data, onPress }) => {
    
    const title = data?.title || "Notification"
    const body = data?.body || data?.description || ""
    const is_read = data?.is_read ?? data?.read ?? true
    const type = data?.type || "general"
    const timestamp = getTimestamp(data)
    const config = TYPE_CONFIG[type] || TYPE_CONFIG.general

    const time_label = formatDate(timestamp, { show_time_ago: true, fallback: data?.time || "" })

    const Container = onPress ? Touchable : View

    return (
        <Container onPress={onPress} style={[styles.container, !is_read && styles.unread]}>
            <Icon
                name={config.icon}
                size={44}
                space
                rounded="half"
                background={config.background}
                color={config.color}
            />

            <View style={styles.content}>
                <Row align="start" justify="space-between" gap={10}>
                    <Text size={15} weight="semibold" style={styles.title}>
                        {title}
                    </Text>
                    <Row align="center" gap={6} style={styles.meta}>
                        {!is_read ? <View style={styles.unread_dot} /> : null}
                        {!!time_label && (
                            <Text size={11} color={colors.gray}>
                                {time_label}
                            </Text>
                        )}
                    </Row>
                </Row>

                {!!body && (
                    <Text size={13} color={colors.dark_gray} lines={2}>
                        {body}
                    </Text>
                )}
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: widthPixel(12),
        borderRadius: heightPixel(16),
        paddingHorizontal: widthPixel(14),
        paddingVertical: heightPixel(14),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
        overflow: "hidden",
    },
    unread: {
        backgroundColor: colors.lightest_primary,
        borderColor: colors.light_primary,
    },
    unread_dot: {
        width: heightPixel(7),
        height: heightPixel(7),
        borderRadius: heightPixel(4),
        backgroundColor: colors.primary,
    },
    content: {
        flex: 1,
        gap: heightPixel(4),
    },
    title: {
        flex: 1,
    },
    meta: {
        width: "auto",
        marginTop: heightPixel(2),
    },
})

export default memo(NotificationCard)
