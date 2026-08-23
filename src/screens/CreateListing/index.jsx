import { useNavigation } from "@react-navigation/native"
import { useLayoutEffect } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import Button from "../../components/Button"
import Dropdown from "../../components/Dropdown"
import ImagePickerModal from "../../components/ImagePickerModal"
import ImageUploader from "../../components/ImageUploader"
import Input from "../../components/Input"
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper"
import HeaderTitle from "../../components/Navigation/HeaderTitle"
import colors from "../../helpers/colors"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useCreateListingController from "./useCreateListingController"

const CreateListing = () => {

    const navigation = useNavigation()
    const { values, functions } = useCreateListingController()
    const { formik, category_options, categories_loading } = values

    useLayoutEffect(() => {
        if (!values.is_edit) return
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title="Edit Listing" />,
        })
    }, [navigation, values.is_edit])

    if (values.listing_loading) {
        return (
            <PrimaryLayout header>
                <View style={styles.loader}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>
            </PrimaryLayout>
        )
    }

    return (
        <PrimaryLayout header>
            <KeyboardAvoidingWrapper>
                <View style={styles.container}>
                    <View style={styles.fields}>
                        <ImageUploader
                            title="Upload Listing Image"
                            subtitle="PNG, JPG, Or JPEG — Max 5MB"
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
                            value={formik.values.category?.value}
                            loading={categories_loading}
                            onChange={(option) => formik.setFieldValue("category", option)}
                            error={
                                formik.touched.category &&
                                (formik.errors.category?.value ||
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
                        {values.is_edit ? "Update" : "Submit"}
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
    loader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
})
