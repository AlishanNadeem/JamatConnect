import { StyleSheet, View } from "react-native"
import Button from "../../components/Button"
import Input from "../../components/Input"
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper"
import Text from "../../components/Text"
import colors from "../../helpers/colors"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useVerifyRedemptionController from "./useVerifyRedemptionController"

const VerifyRedemption = () => {
    const { values } = useVerifyRedemptionController()
    const { formik } = values

    return (
        <PrimaryLayout header>
            <KeyboardAvoidingWrapper>
                <View style={styles.container}>
                    <Text size={14} color={colors.dark_gray}>
                        Enter the member's one-time redeem code to mark it as used.
                    </Text>
                    <Input
                        required
                        label="Redeem Code"
                        placeholder="e.g. AB12CD34"
                        autoCapitalize="characters"
                        value={formik.values.code}
                        onChangeText={(text) => formik.setFieldValue("code", text.toUpperCase())}
                        onBlur={formik.handleBlur("code")}
                        error={formik.touched.code && formik.errors.code}
                    />
                    <Button loading={values.is_submitting} onPress={formik.handleSubmit}>
                        Mark as Used
                    </Button>
                </View>
            </KeyboardAvoidingWrapper>
        </PrimaryLayout>
    )
}

export default VerifyRedemption

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: heightPixel(16),
        paddingBottom: heightPixel(24),
    },
})
