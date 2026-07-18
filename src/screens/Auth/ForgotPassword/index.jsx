import { StyleSheet, View } from "react-native"
import Button from "../../../components/Button"
import Input from "../../../components/Input"
import Text from "../../../components/Text"
import { heightPixel } from "../../../helpers/metrics"
import AuthLayout from "../../../layouts/AuthLayout"
import useForgotPasswordController from "./useForgotPasswordController"
import { global_styles } from "../../../helpers/styles"

const ForgotPassword = () => {

    const { values, functions } = useForgotPasswordController()

    return (
        <AuthLayout
            title={"Password Recovery"}
            subtitle={"Enter email address to get a verification code."}
        >
            <View style={styles.input_container}>
                <Input
                    placeholder="Enter email address"
                    required
                    label={"Email Address"}
                    type="email"
                    icon="mail"
                    value={values.formik.values.email}
                    onChangeText={values.formik.handleChange("email")}
                    error={values.formik.touched.email && values.formik.errors.email}
                />
            </View>
            <Button
                onPress={values.formik.handleSubmit}
                loading={values.isLoading}
            >
                Continue
            </Button>
            <View style={global_styles.spacer} />
            <Text weight="semibold" align="center" onPress={functions.onBackToLogin}>Back To Log In</Text>
        </AuthLayout>
    )
}

const styles = StyleSheet.create({
    input_container: {
        marginTop: heightPixel(32),
        marginBottom: heightPixel(25),
    }
})

export default ForgotPassword