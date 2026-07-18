import { StyleSheet, View } from "react-native"
import Button from "../../components/Button"
import DateTimeInput from "../../components/DateTimeInput"
import Icon from "../../components/Icon"
import ImagePickerModal from "../../components/ImagePickerModal"
import Input from "../../components/Input"
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper"
import PhoneInput from "../../components/PhoneInput"
import colors from "../../helpers/colors"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useEditProfileController from "./useEditProfileController"

const EditProfile = () => {

    const { values, functions } = useEditProfileController()

    return (
        <PrimaryLayout header>
            <KeyboardAvoidingWrapper>
                <View style={styles.container}>
                    <View style={styles.fields}>
                        <View style={styles.icon_wrapper}>
                            <View>
                                <Icon rounded={"full"} source={typeof values?.formik?.values?.image == "object" ? values?.formik?.values?.image : { uri: values?.formik?.values?.image }} size={81} resize="cover" />
                                <View style={styles.avatar_edit}>
                                    <Icon
                                        name="circle-plus"
                                        size={26}
                                        space
                                        background={colors.white}
                                        rounded="full"
                                        onPress={functions.toggleImageModal}
                                    />
                                </View>
                            </View>
                        </View>
                        <Input
                            required
                            label="Name"
                            placeholder="Enter Name"
                            value={values.formik.values.name}
                            onChangeText={values.formik.handleChange("name")}
                            onBlur={values.formik.handleBlur("name")}
                            error={values.formik.touched.name && values.formik.errors.name}
                        />
                        <PhoneInput
                            label="Phone Number"
                            required
                            value={values.formik.values.phone}
                            onChangeText={values.formik.handleChange("phone")}
                            onChangeCountry={(value) => {
                                values.formik.setFieldValue("country_code", value?.code)
                                values.formik.setFieldValue("dialing_code", value?.calling_code)
                            }}
                            onBlur={values.formik.handleBlur("phone")}
                            error={values.formik.touched.phone && values.formik.errors.phone}
                            default_country={{ code: values.formik.values.country_code, calling_code: values.formik.values.dialing_code }}
                        />
                        <DateTimeInput
                            label="Date of Birth"
                            placeholder={"Enter date of birth"}
                            value={values.formik.values.date_of_birth}
                            onChangeText={(value) => {
                                console.log("Value", value)
                                values.formik.setFieldValue("date_of_birth", value)
                            }}
                            error={values.formik.touched.date_of_birth && values.formik.errors.date_of_birth}
                        />
                        <Input
                            required
                            type="textarea"
                            label="Emergency Notes"
                            placeholder="Enter here"
                            value={values.formik.values.emergency_notes}
                            onChangeText={values.formik.handleChange("emergency_notes")}
                            onBlur={values.formik.handleBlur("emergency_notes")}
                            error={values.formik.touched.emergency_notes && values.formik.errors.emergency_notes}
                        />
                    </View>
                    <Button onPress={values.formik.handleSubmit} loading={values.isLoading} type="danger">Update</Button>
                </View>
            </KeyboardAvoidingWrapper >
            <ImagePickerModal
                visible={values.image_modal}
                onClose={functions.toggleImageModal}
                onCamera={functions.openCamera}
                onGallery={functions.openGallery}
            />
        </PrimaryLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: heightPixel(40)
    },
    fields: {
        gap: heightPixel(16)
    },
    icon_wrapper: {
        alignItems: "center"
    },
    avatar_edit: {
        position: "absolute",
        top: 0,
        right: 0,
    },
})

export default EditProfile