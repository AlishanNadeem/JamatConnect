import { StyleSheet, View } from "react-native"
import Button from "../../components/Button"
import Input from "../../components/Input"
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useChangePasswordController from "./useChangePasswordController"

const ChangePassword = () => {

    const { values } = useChangePasswordController()

    return (
        <PrimaryLayout background header>
            <KeyboardAvoidingWrapper>
                <View style={styles.container}>

                    <View style={styles.fields}>
                        <Input
                            label="Current Password"
                            placeholder="Enter current password"
                            type="password"
                            required
                            value={values.formik.values.old_password}
                            onChangeText={values.formik.handleChange("old_password")}
                            error={
                                values.formik.touched.old_password &&
                                values.formik.errors.old_password
                            }
                        />

                        <Input
                            label="New Password"
                            placeholder="Enter new password"
                            type="password"
                            required
                            value={values.formik.values.new_password}
                            onChangeText={values.formik.handleChange("new_password")}
                            error={
                                values.formik.touched.new_password &&
                                values.formik.errors.new_password
                            }
                        />

                        <Input
                            label="Confirm Password"
                            placeholder="Confirm new password"
                            type="password"
                            required
                            value={values.formik.values.confirm_password}
                            onChangeText={values.formik.handleChange("confirm_password")}
                            error={
                                values.formik.touched.confirm_password &&
                                values.formik.errors.confirm_password
                            }
                        />
                    </View>

                    <Button
                        onPress={values.formik.handleSubmit}
                        loading={values.isLoading}
                        type="danger"
                    >
                        Update
                    </Button>
                </View>
            </KeyboardAvoidingWrapper>
        </PrimaryLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: heightPixel(40),
    },
    fields: {
        gap: heightPixel(16),
    },
})

export default ChangePassword