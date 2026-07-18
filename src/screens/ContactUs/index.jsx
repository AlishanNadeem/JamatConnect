import { StyleSheet, View } from "react-native"
import Button from "../../components/Button"
import Input from "../../components/Input"
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper"
import Text from "../../components/Text"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useContactUsController from "./useContactUsController"

const ContactUs = () => {

    const { values } = useContactUsController()

    return (
        <PrimaryLayout background header>
            <KeyboardAvoidingWrapper>
                <View style={styles.container}>
                    <Text size={18}>
                        Please let us know how we can improve your experience
                    </Text>

                    <View style={styles.fields}>
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            required
                            value={values.formik.values.name}
                            onChangeText={values.formik.handleChange("name")}
                            error={values.formik.touched.name && values.formik.errors.name}
                        />
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            required
                            value={values.formik.values.email}
                            onChangeText={values.formik.handleChange("email")}
                            error={values.formik.touched.email && values.formik.errors.email}
                        />
                        <Input
                            label="Subject"
                            placeholder="Enter subject"
                            required
                            value={values.formik.values.subject}
                            onChangeText={values.formik.handleChange("subject")}
                            error={values.formik.touched.subject && values.formik.errors.subject}
                        />
                        <Input
                            label="Message"
                            placeholder="Write your message"
                            type="textarea"
                            required
                            value={values.formik.values.message}
                            onChangeText={values.formik.handleChange("message")}
                            error={values.formik.touched.message && values.formik.errors.message}
                        />
                    </View>

                    <Button
                        onPress={values.formik.handleSubmit}
                        loading={values.isLoading}
                        type="danger"
                    >
                        Submit
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
        gap: heightPixel(15),
    },
})

export default ContactUs