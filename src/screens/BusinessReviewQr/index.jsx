import { ActivityIndicator, StyleSheet, View } from "react-native"
import QRCode from "react-native-qrcode-svg"
import Text from "../../components/Text"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useBusinessReviewQrController from "./useBusinessReviewQrController"

const BusinessReviewQr = () => {

    const { values } = useBusinessReviewQrController()

    if (values.is_loading) {
        return (
            <PrimaryLayout header>
                <View style={styles.loader}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>
            </PrimaryLayout>
        )
    }

    if (values.is_error || !values.review_url) {
        return (
            <PrimaryLayout header>
                <View style={styles.loader}>
                    <Text align="center" color={colors.dark_gray}>
                        Unable to load review QR. Please try again.
                    </Text>
                </View>
            </PrimaryLayout>
        )
    }

    return (
        <PrimaryLayout scrollable header>
            <View style={styles.content}>
                <View style={styles.card}>
                    <Text size={18} weight="bold" align="center">
                        {values.business_name}
                    </Text>
                    <Text size={14} color={colors.dark_gray} align="center">
                        Ask customers to scan this code in person to leave a review.
                    </Text>

                    <View style={styles.qr_wrap}>
                        <QRCode
                            value={values.review_url}
                            size={widthPixel(220)}
                            backgroundColor={colors.white}
                            color={colors.black}
                        />
                    </View>

                    <Text size={13} color={colors.gray} align="center">
                        For in-person scanning only. Sharing and saving are disabled.
                    </Text>
                </View>
            </View>
        </PrimaryLayout>
    )
}

export default BusinessReviewQr

const styles = StyleSheet.create({
    content: {
        gap: heightPixel(16),
        paddingTop: heightPixel(8),
    },
    card: {
        gap: heightPixel(16),
        alignItems: "center",
        paddingVertical: heightPixel(28),
        paddingHorizontal: widthPixel(20),
        borderRadius: heightPixel(20),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
    qr_wrap: {
        padding: widthPixel(16),
        borderRadius: heightPixel(16),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
    loader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: widthPixel(24),
    },
})
