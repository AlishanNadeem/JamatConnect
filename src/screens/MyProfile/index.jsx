import { StyleSheet, View } from "react-native"
import Button from "../../components/Button"
import DateTimeInput from "../../components/DateTimeInput"
import Icon from "../../components/Icon"
import Input from "../../components/Input"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useMyProfileController from "./useMyProfileController"
import PhoneInput from "../../components/PhoneInput"

const MyProfile = () => {

    const { values, functions } = useMyProfileController()

    return (
        <PrimaryLayout scrollable bottom_tab header background>
            <View style={styles.container}>
                <View style={styles.icon_wrapper}>
                    <Icon rounded={"full"} source={{ uri: values.user.image_url }} size={88} resize="cover" />
                </View>
                <Input
                    label={"Name"}
                    placeholder={"Enter Name"}
                    value={values.user.name}
                    disabled
                />
                <PhoneInput
                    label="Phone Number"
                    value={values.user.phone}
                    default_country={{ code: values.user.country_code, calling_code: values.user.dialing_code }}
                    disabled
                />
                <Input
                    label={"Email"}
                    placeholder={"Enter Email"}
                    value={values.user.email}
                    disabled
                />
                {
                    values.user?.date_of_birth &&
                    <DateTimeInput
                        label="Date of Birth"
                        placeholder={"Enter date of birth"}
                        value={values.user?.date_of_birth}
                        disabled
                    />
                }
                {
                    values.user?.emergency_notes &&
                    <Input
                        type="textarea"
                        label={"Emergency Notes"}
                        placeholder="Enter here"
                        value={values.user.emergency_notes}
                        disabled
                    />
                }
                <Button onPress={functions.onEditProfile}>Edit Profile</Button>
                <Button type="secondary" onPress={functions.onChangePassword}>Change Password</Button>
                <Button type="danger" onPress={functions.onLogout}>Log Out</Button>
            </View>
        </PrimaryLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(20)
    },
    icon_wrapper: {
        marginBottom: heightPixel(20),
        alignItems: "center"
    }
})

export default MyProfile