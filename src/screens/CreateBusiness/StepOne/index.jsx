import { StyleSheet, View } from "react-native"
import Dropdown from "../../../components/Dropdown"
import Error from "../../../components/Error"
import Icon from "../../../components/Icon"
import ImageUploader from "../../../components/ImageUploader"
import Input from "../../../components/Input"
import Label from "../../../components/Label"
import colors from "../../../helpers/colors"
import { heightPixel } from "../../../helpers/metrics"

const StepOne = ({
    formik,
    categories,
    categories_loading,
    onOpenImagePicker,
}) => {
    const category_options = categories.map((category) => ({
        label: category.name,
        value: category.id ?? category._id,
    }))

    return (
        <View style={styles.container}>
            <View style={styles.fields}>
                <View style={styles.logo_block}>
                    <Label label="Logo" required style={styles.logo_label} />
                    <View style={styles.logo_wrapper}>
                        <Icon
                            rounded="full"
                            source={formik.values.logo}
                            size={81}
                            resize="cover"
                        />
                        <View style={styles.logo_edit}>
                            <Icon
                                name="circle-plus"
                                size={26}
                                space
                                background={colors.white}
                                rounded="full"
                                onPress={() => onOpenImagePicker("logo")}
                            />
                        </View>
                    </View>
                    <Error error={formik.touched.logo && formik.errors.logo} />
                </View>
                <ImageUploader
                    label="Cover Image"
                    required
                    onPress={() => onOpenImagePicker("image")}
                    image={formik.values.image}
                    onRemove={() => formik.setFieldValue("image", null)}
                    error={formik.touched.image && formik.errors.image}
                />
                <Input
                    required
                    label="Business Name"
                    placeholder="Enter business name"
                    value={formik.values.name}
                    onChangeText={formik.handleChange("name")}
                    onBlur={formik.handleBlur("name")}
                    error={formik.touched.name && formik.errors.name}
                />
                <Input
                    required
                    type="textarea"
                    label="Description"
                    placeholder="Describe your business"
                    value={formik.values.description}
                    onChangeText={formik.handleChange("description")}
                    onBlur={formik.handleBlur("description")}
                    error={formik.touched.description && formik.errors.description}
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
            </View>
        </View>
    )
}

export default StepOne

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(24),
    },
    fields: {
        gap: heightPixel(16),
    },
    logo_block: {
        alignItems: "flex-start",
        gap: heightPixel(10),
    },
    logo_label: {
        marginBottom: 0,
    },
    logo_wrapper: {
        position: "relative",
    },
    logo_edit: {
        position: "absolute",
        top: 0,
        right: 0,
    },
})
