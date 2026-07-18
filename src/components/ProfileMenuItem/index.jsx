import { memo } from "react"
import { StyleSheet } from "react-native"
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
        background: colors.pinkish_red,
        color: colors.danger,
        text_color: colors.danger,
    },
}

const ProfileMenuItem = ({ icon, label, onPress, arrow = true, color = "default" }) => {

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
            <Text
                size={16}
                weight="semibold"
                color={theme.text_color}
                style={styles.label}
            >
                {label}
            </Text>
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
    },
})
