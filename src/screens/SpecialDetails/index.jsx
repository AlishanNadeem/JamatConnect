import { ActivityIndicator, StyleSheet, View } from "react-native"
import Badge from "../../components/Badge"
import Button from "../../components/Button"
import Empty from "../../components/Empty"
import Icon from "../../components/Icon"
import Row from "../../components/Row"
import Text from "../../components/Text"
import Touchable from "../../components/Touchable"
import colors from "../../helpers/colors"
import { formatDate } from "../../helpers/date"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useSpecialDetailsController from "./useSpecialDetailsController"

const SpecialDetails = () => {
    const { values, functions } = useSpecialDetailsController()

    if (values.is_loading) {
        return (
            <PrimaryLayout header>
                <View style={styles.loader}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>
            </PrimaryLayout>
        )
    }

    if (values.is_error || !values.data) {
        return (
            <PrimaryLayout header>
                <Empty
                    title="Special Not Found"
                    description="This deal is no longer available."
                />
            </PrimaryLayout>
        )
    }

    const special = values.data
    const has_redemption = Boolean(values.my_redemption?.code)

    return (
        <PrimaryLayout scrollable header>
            <View style={styles.content}>
                <View style={styles.card}>
                    {values.business ? (
                        <Touchable onPress={functions.onViewBusiness} style={styles.company_row}>
                            <Icon
                                rounded="half"
                                source={{ uri: values.business.logo_url }}
                                size={56}
                                resize="cover"
                                background={colors.background}
                            />
                            <View style={styles.company_text}>
                                <Text size={15} weight="semibold" color={colors.primary} lines={1}>
                                    {values.business.name}
                                </Text>
                                {values.business.category?.name ? (
                                    <Text size={12} color={colors.gray} lines={1}>
                                        {values.business.category.name}
                                    </Text>
                                ) : null}
                            </View>
                        </Touchable>
                    ) : null}

                    <View style={styles.discount_chip}>
                        <Text size={14} weight="bold" color={colors.white}>
                            {special.discount}
                        </Text>
                    </View>

                    <Text size={24} weight="bold">
                        {special.title}
                    </Text>

                    <Row align="center" gap={8} style={styles.meta}>
                        {values.expires_label ? (
                            <Badge label={values.expires_label} mode="light_primary" />
                        ) : null}
                        {!values.is_available ? (
                            <Badge label="Unavailable" mode="danger" />
                        ) : null}
                        {has_redemption ? (
                            <Badge label="Redeemed" mode="muted" />
                        ) : null}
                    </Row>

                    {special.createdAt ? (
                        <Text size={12} color={colors.gray}>
                            Posted {formatDate(special.createdAt, { show_time_ago: true })}
                        </Text>
                    ) : null}

                    <Text size={14} color={colors.dark_gray} style={styles.description}>
                        {special.description}
                    </Text>

                    {!values.is_mine ? (
                        <View style={styles.button_wrap}>
                            <Button
                                loading={values.is_redeeming}
                                disabled={!values.is_available && !has_redemption}
                                onPress={functions.onRedeem}
                            >
                                {has_redemption ? "View Redeem Code" : "Redeem Special"}
                            </Button>
                        </View>
                    ) : (
                        <Text size={12} color={colors.gray} align="center">
                            This is your business special. Members can redeem it from the Specials tab.
                        </Text>
                    )}
                </View>
            </View>
        </PrimaryLayout>
    )
}

export default SpecialDetails

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: heightPixel(80),
    },
    content: {
        gap: heightPixel(16),
        paddingBottom: heightPixel(24),
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: widthPixel(16),
        borderWidth: 1,
        borderColor: colors.light_gray,
        padding: widthPixel(16),
        gap: heightPixel(12),
    },
    company_row: {
        flexDirection: "row",
        alignItems: "center",
        gap: widthPixel(12),
    },
    company_text: {
        flex: 1,
        gap: heightPixel(2),
    },
    discount_chip: {
        alignSelf: "flex-start",
        backgroundColor: colors.danger,
        borderRadius: widthPixel(8),
        paddingHorizontal: widthPixel(10),
        paddingVertical: heightPixel(6),
    },
    meta: {
        flexWrap: "wrap",
    },
    description: {
        lineHeight: heightPixel(22),
    },
    button_wrap: {
        marginTop: heightPixel(8),
    },
})
