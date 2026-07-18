import { Platform, StyleSheet, View } from "react-native"
import Button from "../../../components/Button"
import Checkbox from "../../../components/Checkbox"
import Input from "../../../components/Input"
import Row from "../../../components/Row"
import Text from "../../../components/Text"
import colors from "../../../helpers/colors"
import { heightPixel } from "../../../helpers/metrics"
import AuthLayout from "../../../layouts/AuthLayout"
import useLoginController from "./useLoginController"

const Login = () => {

    const { values, functions } = useLoginController()

    return (
        <AuthLayout title={"Log In"} subtitle={"Please Log In To Your Account"}>
            <View style={styles.fields_container}>
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
                <Input
                    placeholder="Enter password"
                    required
                    label={"Password"}
                    type="password"
                    value={values.formik.values.password}
                    onChangeText={values.formik.handleChange("password")}
                    error={values.formik.touched.password && values.formik.errors.password}
                />

                <Row gap={5} justify="space-between">
                    <Checkbox
                        label={"Remember me"}
                        value={values.formik.values.remember_me}
                        onChange={() =>
                            values.formik.setFieldValue("remember_me", !values.formik.values.remember_me)
                        }
                    />
                    <Text
                        weight="semibold"
                        underline
                        color={colors.primary}
                        onPress={functions.onForgotPassword}
                    >
                        Forgot Password?
                    </Text>
                </Row>
            </View>

            <View style={styles.actions_container}>
                <Button onPress={values.formik.handleSubmit} loading={values.isLoading}>
                    Log In
                </Button>
            </View>
        </AuthLayout>
    )
}

const styles = StyleSheet.create({
    fields_container: {
        gap: heightPixel(15),
        marginTop: heightPixel(25),
        width: "100%"
    },
    actions_container: {
        marginTop: heightPixel(31),
    },
})

export default Login