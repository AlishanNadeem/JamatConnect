import { StyleSheet, View } from "react-native"
import ProfileHeader from "../../components/ProfileHeader"
import ProfileMenuItem from "../../components/ProfileMenuItem"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useMyProfileController from "./useMyProfileController"

const MyProfile = () => {

    const { functions } = useMyProfileController()

    return (
        <PrimaryLayout scrollable bottom_tab header>
            <View style={styles.container}>
                <ProfileHeader />
                <View style={styles.card}>
                    <ProfileMenuItem
                        icon="gift"
                        label="Referrals"
                        onPress={functions.onReferrals}
                    />
                    <View style={styles.divider} />
                    <ProfileMenuItem
                        icon="info"
                        label="About Us"
                        onPress={functions.onAboutUs}
                    />
                </View>
                <View style={styles.card}>
                    <ProfileMenuItem
                        icon="log-out"
                        label="Log Out"
                        onPress={functions.onLogout}
                        color="danger"
                        arrow={false}
                    />
                </View>
            </View>
        </PrimaryLayout>
    )
}

export default MyProfile

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(12),
    },
    card: {
        borderRadius: heightPixel(16),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
        overflow: "hidden",
    },
    divider: {
        height: heightPixel(1),
        backgroundColor: colors.light_gray,
        marginHorizontal: widthPixel(16),
    },
})
