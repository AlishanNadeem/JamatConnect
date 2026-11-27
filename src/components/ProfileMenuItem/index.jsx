import { memo } from "react"
import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Icon from "../Icon"
import Row from "../Row"
import Text from "../Text"

const THEME = {
    default: {
        background: colors.lightest_primary,
        color: colors.primary,
        text_color: colors.black,
    },
    danger: {
        background: colors.light_danger,
        color: colors.danger,
        text_color: colors.danger,
    },
}

const ProfileMenuItem = ({ icon, label, badge, onPress, arrow = true, color = "default" }) => {

    const theme = THEME[color] ?? THEME.default

    return (
        <Row align="center" gap={12} onPress={onPress} style={styles.container}>
            <Icon
                background={theme.background}
                space
                name={icon}
                size={40}
                rounded="half"
                color={theme.color}
            />
            <View style={styles.label}>
                <Text
                    size={16}
                    weight="semibold"
                    color={theme.text_color}
                    lines={1}
                    style={styles.label_text}
                >
                    {label}
                </Text>
                {badge ? (
                    <View style={styles.badge}>
                        <Text size={10} weight="bold" color={colors.white}>
                            {badge}
                        </Text>
                    </View>
                ) : null}
            </View>
            {arrow ? (
                <Icon name="chevron-right" size={20} color={colors.gray} />
            ) : null}
        </Row>
    )
}

export default memo(ProfileMenuItem)

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: widthPixel(16),
        paddingVertical: heightPixel(16),
    },
    label: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: widthPixel(8),
    },
    label_text: {
        flexShrink: 1,
    },
    badge: {
        backgroundColor: colors.danger,
        borderRadius: heightPixel(4),
        paddingHorizontal: widthPixel(6),
        paddingVertical: heightPixel(2),
    },
})
