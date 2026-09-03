import { memo } from "react"
import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Row from "../Row"
import Text from "../Text"

const MODES = {
    default: {
        background: colors.white,
        color: colors.primary,
    },
    primary: {
        background: colors.dark_primary,
        color: colors.white,
    },
    light_primary: {
        background: colors.lightest_primary,
        color: colors.primary,
    },
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
    info: {
        background: colors.light_info,
        color: colors.info,
    },
    muted: {
        background: colors.light_gray,
        color: colors.dark_gray,
    },
}

const Badge = ({
    label,
    type,
    mode = "default",
    style,
    onPress,
}) => {

    if (!label) return null

    const theme = MODES[mode] ?? MODES.default
    const show_dot = type === "dot"

    return (
        <Row
            align="center"
            gap={6}
            onPress={onPress}
            style={[styles.container, { backgroundColor: theme.background }, style]}
        >
            {show_dot ? (
                <View style={[styles.dot, { backgroundColor: theme.color }]} />
            ) : null}
            <Text size={11} weight="semibold" color={theme.color}>
                {label}
            </Text>
        </Row>
    )
}

export default memo(Badge)

const styles = StyleSheet.create({
    container: {
        width: "auto",
        alignSelf: "flex-start",
        paddingHorizontal: widthPixel(18),
        paddingVertical: heightPixel(6),
        borderRadius: heightPixel(6),
    },
    dot: {
        width: widthPixel(7),
        height: widthPixel(7),
        borderRadius: heightPixel(4),
    },
})
