import { StyleSheet, View } from "react-native"
import Button from "../../../components/Button"
import ImagePickerModal from "../../../components/ImagePickerModal"
import ImageUploader from "../../../components/ImageUploader"
import Input from "../../../components/Input"
import Row from "../../../components/Row"
import Text from "../../../components/Text"
import colors from "../../../helpers/colors"
import { heightPixel } from "../../../helpers/metrics"
import AuthLayout from "../../../layouts/AuthLayout"
import useSignupController from "./useSignupController"

const Signup = () => {

    const { values, functions } = useSignupController()

    return (
        <AuthLayout
            title={"Sign Up"}
            subtitle={"Please Sign Up To Your Account"}
        >
            <View style={styles.input_container}>
                <Input
                    placeholder="Enter your name"
                    required
                    label={"Name"}
                    value={values.formik.values.name}
                    onChangeText={values.formik.handleChange("name")}
                    onBlur={values.formik.handleBlur("name")}
                    error={values.formik.touched.name && values.formik.errors.name}
                />
                <Input
                    placeholder="Enter your email address"
                    required
                    label={"Email"}
                    type="email"
                    value={values.formik.values.email}
                    onChangeText={values.formik.handleChange("email")}
                    onBlur={values.formik.handleBlur("email")}
                    error={values.formik.touched.email && values.formik.errors.email}
                />
                <Input
                    placeholder="Enter new password"
                    required
                    label={"Password"}
                    type="password"
                    value={values.formik.values.password}
                    onChangeText={values.formik.handleChange("password")}
                    onBlur={values.formik.handleBlur("password")}
                    error={values.formik.touched.password && values.formik.errors.password}
                />
                <Input
                    placeholder="Confirm new password"
                    required
                    label={"Confirm Password"}
                    type="password"
                    value={values.formik.values.confirm_password}
                    onChangeText={values.formik.handleChange("confirm_password")}
                    onBlur={values.formik.handleBlur("confirm_password")}
                    error={values.formik.touched.confirm_password && values.formik.errors.confirm_password}
                />
                <ImageUploader label={"Upload Profile"} required onPress={functions.toggleImageModal} image={values.formik.values.image} onRemove={functions.onRemoveImage} />
            </View>
            <Button
                onPress={values.formik.handleSubmit}
                loading={values.isLoading}
            >
                Sign Up
            </Button>
            <View style={styles.spacer} />
            <Row gap={5} justify="center" style={styles.login_row}>
                <Text weight="semibold" size={16}>
                    Already have an account?
                </Text>
                <Text
                    weight="semibold"
                    size={16}
                    color={colors.light_primary}
                    onPress={functions.onLogin}
                >
                    Log In
                </Text>
            </Row>
            <ImagePickerModal
                visible={values.image_modal}
                onClose={functions.toggleImageModal}
                onCamera={functions.openCamera}
                onGallery={functions.openGallery}
            />
        </AuthLayout>
    )
}

const styles = StyleSheet.create({
    input_container: {
        marginTop: heightPixel(32),
        gap: heightPixel(12),
        marginBottom: heightPixel(30),
        width: "100%"
    },
    spacer: {
        flex: 1,
        minHeight: heightPixel(10),
    },
    login_row: {
        paddingVertical: heightPixel(23),
    },
})

export default Signup