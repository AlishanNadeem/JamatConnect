import { StyleSheet, View } from "react-native"
import Button from "../../../components/Button"
import Input from "../../../components/Input"
import Text from "../../../components/Text"
import { heightPixel } from "../../../helpers/metrics"
import { global_styles } from "../../../helpers/styles"
import AuthLayout from "../../../layouts/AuthLayout"
import useSetPasswordController from "./useSetPasswordController"

const SetPassword = () => {

    const { values, functions } = useSetPasswordController()

    return (
        <AuthLayout
            title={"Password Recovery"}
            subtitle={"Set new password."}
        >
            <View style={styles.input_container}>
                <Input
                    placeholder="Enter new password"
                    required
                    label={"New Password"}
                    type="password"
                    value={values.formik.values.password}
                    onChangeText={values.formik.handleChange("password")}
                    onBlur={values.formik.handleBlur("password")}
                    error={values.formik.touched.password && values.formik.errors.password}
                />
                <Input
                    placeholder="Re-enter password"
                    required
                    label={"Confirm Password"}
                    type="password"
                    value={values.formik.values.confirm_password}
                    onChangeText={values.formik.handleChange("confirm_password")}
                    onBlur={values.formik.handleBlur("confirm_password")}
                    error={values.formik.touched.confirm_password && values.formik.errors.confirm_password}
                />
            </View>
            <Button
                onPress={values.formik.handleSubmit}
                loading={values.isLoading}
            >
                Update
            </Button>
            <View style={global_styles.spacer} />
            <Text weight="semibold" align="center" onPress={functions.onBackToLogin}>Back To Log In</Text>
        </AuthLayout>
    )
}

const styles = StyleSheet.create({
    input_container: {
        marginTop: heightPixel(32),
        gap: heightPixel(15),
        marginBottom: heightPixel(51),
    }
})

export default SetPassword