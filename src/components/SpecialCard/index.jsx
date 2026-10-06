import { memo } from "react"
import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Badge from "../Badge"
import Button from "../Button"
import Icon from "../Icon"
import Row from "../Row"
import Text from "../Text"
import Touchable from "../Touchable"

const SpecialCard = ({
    data,
    onPress,
    onRedeem,
    onVerify,
    onRedeemedList,
    onToggleActive,
    redeeming = false,
    owner = false,
    show_business = true,
}) => {
    const {
        title,
        description,
        discount,
        business,
        is_active,
    } = data || {}

    const Container = onPress ? Touchable : View
    const container_props = onPress ? { onPress, style: styles.container } : { style: styles.container }

    return (
        <Container {...container_props}>
            <Row align="flex-start" gap={12}>
                <Icon
                    {...(business?.logo_url
                        ? {
                            source: { uri: business.logo_url },
                            resize: "cover",
                        }
                        : {
                            name: "megaphone",
                            color: colors.danger,
                        })}
                    size={48}
                    space
                    rounded="half"
                    background={business?.logo_url ? colors.background : colors.light_danger}
                />
                <View style={styles.content}>
                    <Row align="center" justify="space-between" gap={8} style={styles.title_row}>
                        <Text size={15} weight="bold" lines={1} style={styles.title}>
                            {title}
                        </Text>
                        {owner ? (
                            <Badge
                                type="dot"
                                label={is_active ? "Live" : "Inactive"}
                                mode={is_active ? "success" : "muted"}
                            />
                        ) : null}
                    </Row>

                    {show_business && business?.name ? (
                        <Text size={12} weight="semibold" color={colors.primary} lines={1}>
                            {business.name}
                        </Text>
                    ) : null}

                    {discount ? (
                        <View style={styles.discount_chip}>
                            <Text size={12} weight="bold" color={colors.danger}>
                                {discount}
                            </Text>
                        </View>
                    ) : null}

                    {description ? (
                        <Text size={12} color={colors.dark_gray} lines={2}>
                            {description}
                        </Text>
                    ) : null}
                </View>
            </Row>

            {owner ? (
                <Row align="center" gap={16} style={styles.actions}>
                    <Text size={13} weight="semibold" color={colors.primary} onPress={onVerify}>
                        Verify
                    </Text>
                    <Text size={13} weight="semibold" color={colors.primary} onPress={onRedeemedList}>
                        Redeemed
                    </Text>
                    {onToggleActive ? (
                        <Text size={13} weight="semibold" color={colors.dark_gray} onPress={onToggleActive}>
                            {is_active ? "Deactivate" : "Activate"}
                        </Text>
                    ) : null}
                </Row>
            ) : onRedeem ? (
                <Button onPress={onRedeem} loading={redeeming} style={styles.redeem_button}>
                    Redeem
                </Button>
            ) : null}
        </Container>
    )
}

export default memo(SpecialCard)

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(12),
        paddingHorizontal: widthPixel(14),
        paddingVertical: heightPixel(14),
        borderRadius: heightPixel(16),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
    content: {
        flex: 1,
        gap: heightPixel(4),
    },
    title_row: {
        width: "100%",
    },
    title: {
        flex: 1,
    },
    discount_chip: {
        alignSelf: "flex-start",
        marginTop: heightPixel(2),
        paddingHorizontal: widthPixel(8),
        paddingVertical: heightPixel(4),
        borderRadius: heightPixel(8),
        backgroundColor: colors.light_danger,
    },
    actions: {
        width: "100%",
        paddingTop: heightPixel(2),
    },
    redeem_button: {
        marginTop: heightPixel(2),
    },
})
