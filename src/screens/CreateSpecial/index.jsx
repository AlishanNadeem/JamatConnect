import { StyleSheet, View } from "react-native"
import Button from "../../components/Button"
import Input from "../../components/Input"
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useCreateSpecialController from "./useCreateSpecialController"

const CreateSpecial = () => {
    const { values } = useCreateSpecialController()
    const { formik } = values

    return (
        <PrimaryLayout header>
            <KeyboardAvoidingWrapper>
                <View style={styles.container}>
                    <View style={styles.fields}>
                        <Input
                            required
                            label="Title"
                            placeholder="e.g. Weekend Lunch Deal"
                            value={formik.values.title}
                            onChangeText={formik.handleChange("title")}
                            onBlur={formik.handleBlur("title")}
                            error={formik.touched.title && formik.errors.title}
                        />
                        <Input
                            required
                            label="Discount"
                            placeholder="e.g. 20% off or Buy 1 Get 1"
                            value={formik.values.discount}
                            onChangeText={formik.handleChange("discount")}
                            onBlur={formik.handleBlur("discount")}
                            error={formik.touched.discount && formik.errors.discount}
                        />
                        <Input
                            required
                            type="textarea"
                            label="Description"
                            placeholder="Describe the offer and any conditions"
                            value={formik.values.description}
                            onChangeText={formik.handleChange("description")}
                            onBlur={formik.handleBlur("description")}
                            error={formik.touched.description && formik.errors.description}
                        />
                    </View>
                    <Button onPress={formik.handleSubmit} loading={values.is_loading}>
                        Publish Special
                    </Button>
                </View>
            </KeyboardAvoidingWrapper>
        </PrimaryLayout>
    )
}

export default CreateSpecial

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: heightPixel(40),
    },
    fields: {
        gap: heightPixel(16),
    },
})
