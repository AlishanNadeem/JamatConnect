import { useRoute } from "@react-navigation/native"
import { StyleSheet, View } from "react-native"
import QRCode from "react-native-qrcode-svg"
import Button from "../../components/Button"
import Text from "../../components/Text"
import colors from "../../helpers/colors"
import { formatDate } from "../../helpers/date"
import { goBack } from "../../helpers/navigation"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"

const RedeemSuccess = () => {
    const { params } = useRoute()
    const code = params?.code
    const special_title = params?.special_title
    const business_name = params?.business_name
    const discount = params?.discount
    const expires_at = params?.expires_at
    const status = params?.status

    return (
        <PrimaryLayout scrollable header>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text size={13} weight="semibold" color={colors.primary} align="center">
                        Your redeem code
                    </Text>
                    <Text size={22} weight="bold" align="center">
                        {special_title || "Special"}
                    </Text>
                    {business_name ? (
                        <Text size={14} color={colors.dark_gray} align="center">
                            Show this at {business_name}
                            {discount ? ` for ${discount}` : ""}.
                        </Text>
                    ) : null}

                    <View style={styles.code_box}>
                        <Text size={28} weight="bold" align="center" color={colors.primary}>
                            {code || "—"}
                        </Text>
                    </View>

                    {code ? (
                        <View style={styles.qr_wrap}>
                            <QRCode value={String(code)} size={widthPixel(180)} color={colors.black} backgroundColor={colors.white} />
                        </View>
                    ) : null}

                    {expires_at ? (
                        <Text size={12} color={colors.gray} align="center">
                            Valid until {formatDate(expires_at)}
                        </Text>
                    ) : null}

                    {status === "used" ? (
                        <Text size={12} color={colors.danger} align="center">
                            This code has already been used.
                        </Text>
                    ) : null}
                </View>

                <Button type="secondary" onPress={goBack}>
                    Done
                </Button>
            </View>
        </PrimaryLayout>
    )
}

export default RedeemSuccess

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(16),
        paddingBottom: heightPixel(24),
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: widthPixel(16),
        borderWidth: 1,
        borderColor: colors.light_gray,
        padding: widthPixel(20),
        gap: heightPixel(12),
        alignItems: "center",
    },
    code_box: {
        width: "100%",
        borderRadius: widthPixel(12),
        backgroundColor: colors.lightest_primary,
        paddingVertical: heightPixel(16),
        paddingHorizontal: widthPixel(12),
    },
    qr_wrap: {
        padding: widthPixel(16),
        backgroundColor: colors.white,
        borderRadius: widthPixel(12),
        borderWidth: 1,
        borderColor: colors.light_gray,
    },
})
