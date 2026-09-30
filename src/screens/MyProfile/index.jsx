import { StyleSheet, View } from "react-native"
import ProfileHeader from "../../components/ProfileHeader"
import ProfileMenuItem from "../../components/ProfileMenuItem"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useMyProfileController from "./useMyProfileController"

const MenuCard = ({ children }) => (
    <View style={styles.card}>
        {children}
    </View>
)

const MenuDivider = () => <View style={styles.divider} />

const MyProfile = () => {

    const { functions } = useMyProfileController()

    return (
        <PrimaryLayout scrollable bottom_tab header>
            <View style={styles.container}>
                <ProfileHeader />

                <MenuCard>
                    <ProfileMenuItem
                        icon="store"
                        label="My Businesses"
                        onPress={functions.onMyBusiness}
                    />
                    <MenuDivider />
                    <ProfileMenuItem
                        icon="shopping-bag"
                        label="My Listings"
                        onPress={functions.onMyListings}
                    />
                    <MenuDivider />
                    <ProfileMenuItem
                        icon="gift"
                        label="Referrals"
                        onPress={functions.onReferrals}
                    />
                </MenuCard>

                <MenuCard>
                    <ProfileMenuItem
                        icon="lock-keyhole"
                        label="Change Password"
                        onPress={functions.onChangePassword}
                    />
                </MenuCard>

                <MenuCard>
                    <ProfileMenuItem
                        icon="info"
                        label="About Us"
                        onPress={functions.onAboutUs}
                    />
                    <MenuDivider />
                    <ProfileMenuItem
                        icon="mail"
                        label="Contact Us"
                        onPress={functions.onContactUs}
                    />
                    <MenuDivider />
                    <ProfileMenuItem
                        icon="shield"
                        label="Privacy Policy"
                        onPress={functions.onPrivacyPolicy}
                    />
                    <MenuDivider />
                    <ProfileMenuItem
                        icon="file-text"
                        label="Terms & Conditions"
                        onPress={functions.onTermsAndConditions}
                    />
                </MenuCard>

                <MenuCard>
                    <ProfileMenuItem
                        icon="log-out"
                        label="Log Out"
                        onPress={functions.onLogout}
                        color="danger"
                        arrow={false}
                    />
                </MenuCard>
            </View>
        </PrimaryLayout>
    )
}

export default MyProfile

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(20),
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
