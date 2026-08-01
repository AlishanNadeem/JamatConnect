import { memo } from "react"
import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Row from "../Row"
import Text from "../Text"

const Badge = ({
    label,
    type = "primary",
    background = colors.white,
    color = colors.black,
    style,
}) => {

    if (!label) return null

    const show_dot = type === "dot"

    return (
        <Row
            align="center"
            gap={6}
            style={[styles.container, { backgroundColor: background }, style]}
        >
            {show_dot ? (
                <View style={[styles.dot, { backgroundColor: color }]} />
            ) : null}
            <Text size={11} weight="semibold" color={color}>
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
        paddingHorizontal: widthPixel(12),
        paddingVertical: heightPixel(6),
        borderRadius: heightPixel(20),
    },
    dot: {
        width: widthPixel(7),
        height: widthPixel(7),
        borderRadius: heightPixel(4),
    },
})
