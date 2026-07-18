import { StyleSheet, View } from "react-native"
import Button from "../../../components/Button"
import Input from "../../../components/Input"
import Text from "../../../components/Text"
import colors from "../../../helpers/colors"
import { heightPixel } from "../../../helpers/metrics"
import { global_styles } from "../../../helpers/styles"
import AuthLayout from "../../../layouts/AuthLayout"
import useVerifyCodeController from "./useVerifyCodeController"

const VerifyCode = () => {

    const { values, functions } = useVerifyCodeController()

    return (
        <AuthLayout
            title={"Password Recovery"}
            subtitle={"Please check your email for verification code. Your code is 6 digit in length."}
        >
            <View style={styles.input_container}>
                <Input
                    placeholder="Enter verification code"
                    required
                    label={"Verification Code"}
                    type="number"
                    value={values.formik.values.code}
                    onChangeText={values.formik.handleChange("code")}
                    onBlur={values.formik.handleBlur("code")}
                    error={values.formik.touched.code && values.formik.errors.code}
                />
                {
                    values.timer > 0 ? (
                        <Text color={colors.gray} align="right" weight="semibold">
                            Resend code in {values.timer}s
                        </Text>
                    ) : (
                        <Text
                            align="right"
                            weight="bold"
                            onPress={functions.handleResend}
                        >
                            {values?.isForgetPasswordLoading ? "Resending…" : "Resend verification code"}
                        </Text>
                    )
                }
            </View>
            <Button
                onPress={values.formik.handleSubmit}
                loading={values.formik.isSubmitting}
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
        gap: heightPixel(12),
        marginBottom: heightPixel(25),
    }
})

export default VerifyCode