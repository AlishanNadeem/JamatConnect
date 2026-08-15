import { StyleSheet, View } from "react-native"
import Button from "../../components/Button"
import Dropdown from "../../components/Dropdown"
import ImagePickerModal from "../../components/ImagePickerModal"
import ImageUploader from "../../components/ImageUploader"
import Input from "../../components/Input"
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useCreateListingController from "./useCreateListingController"

const CreateListing = () => {

    const { values, functions } = useCreateListingController()
    const { formik, categories, categories_loading } = values

    const category_options = categories.map((category) => ({
        label: category.name,
        value: category.id ?? category._id,
    }))

    return (
        <PrimaryLayout header>
            <KeyboardAvoidingWrapper>
                <View style={styles.container}>
                    <View style={styles.fields}>
                        <ImageUploader
                            label="Image"
                            required
                            onPress={functions.toggleImageModal}
                            image={formik.values.image}
                            onRemove={() => formik.setFieldValue("image", null)}
                            error={formik.touched.image && formik.errors.image}
                        />
                        <Input
                            required
                            label="Name"
                            placeholder="Enter name"
                            value={formik.values.name}
                            onChangeText={formik.handleChange("name")}
                            onBlur={formik.handleBlur("name")}
                            error={formik.touched.name && formik.errors.name}
                        />
                        <Dropdown
                            label="Category"
                            required
                            placeholder="Select category"
                            title="Select Category"
                            options={category_options}
                            value={formik.values.category?.id}
                            loading={categories_loading}
                            onChange={(option) => {
                                formik.setFieldValue("category", {
                                    id: option.value,
                                    name: option.label,
                                })
                            }}
                            onBlur={() => formik.setFieldTouched("category", true)}
                            error={
                                formik.touched.category &&
                                (formik.errors.category?.id ||
                                    (typeof formik.errors.category === "string"
                                        ? formik.errors.category
                                        : undefined))
                            }
                        />
                        <Input
                            required
                            type="number"
                            label="Price"
                            placeholder="Enter price"
                            value={formik.values.price}
                            onChangeText={formik.handleChange("price")}
                            onBlur={formik.handleBlur("price")}
                            error={formik.touched.price && formik.errors.price}
                        />
                        <Input
                            required
                            type="textarea"
                            label="Description"
                            placeholder="Describe your listing"
                            value={formik.values.description}
                            onChangeText={formik.handleChange("description")}
                            onBlur={formik.handleBlur("description")}
                            error={formik.touched.description && formik.errors.description}
                        />
                    </View>
                    <Button onPress={formik.handleSubmit} loading={values.is_loading}>
                        Submit
                    </Button>
                </View>
            </KeyboardAvoidingWrapper>
            <ImagePickerModal
                visible={values.image_modal}
                onClose={functions.toggleImageModal}
                onCamera={functions.openCamera}
                onGallery={functions.openGallery}
            />
        </PrimaryLayout>
    )
}

export default CreateListing

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: heightPixel(40),
    },
    fields: {
        gap: heightPixel(16),
    },
})
