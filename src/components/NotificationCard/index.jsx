import { memo } from "react"
import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Text from "../Text"

const NotificationCard = ({ data }) => {

    const {
        title = "Summer in Japan",
        description = "Experience the vibrant culture, stunning landscapes, and unforgettable adventures of Japan this summer.",
        date = "2026-03-22",
        time = "11:30 PM",
        read = false
    } = data

    return (
        <View style={[styles.container, read ? null : styles.unread]}>
            <View style={styles.content}>
                <Text size={18} weight="semibold">{title}</Text>
                <Text size={16} lines={2} color={colors.gray}>{description}</Text>
            </View>
            <Text size={12} color={colors.gray}>{date} - {time}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderRadius: heightPixel(15),
        borderWidth: heightPixel(1),
        borderColor: colors.transparent,
        paddingHorizontal: widthPixel(16),
        paddingVertical: heightPixel(16),
        backgroundColor: colors.input_background,
        gap: heightPixel(8)
    },
    content: {
        flex: 1,
        gap: heightPixel(8)
    },
    unread: {
        borderColor: colors.light_primary,
        backgroundColor: colors.primary_opacity
    }
})

export default memo(NotificationCard)