import { useNavigation } from "@react-navigation/native"
import { useLayoutEffect } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import Button from "../../components/Button"
import Dropdown from "../../components/Dropdown"
import Input from "../../components/Input"
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper"
import HeaderTitle from "../../components/Navigation/HeaderTitle"
import colors from "../../helpers/colors"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useCreateJobController from "./useCreateJobController"

const dropdownError = (touched, error) => {
    if (!touched) return undefined
    if (typeof error === "string") return error
    return error?.value
}

const CreateJob = () => {

    const navigation = useNavigation()
    const { values } = useCreateJobController()
    const { formik } = values

    useLayoutEffect(() => {

        if (!values.is_edit) return

        navigation.setOptions({
            headerTitle: () => <HeaderTitle title="Edit Job" />,
        })

    }, [navigation, values.is_edit])

    if (values.job_loading) {
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
                        <Input
                            required
                            label="Job Title"
                            placeholder="e.g. Plumber"
                            value={formik.values.title}
                            onChangeText={formik.handleChange("title")}
                            onBlur={formik.handleBlur("title")}
                            error={formik.touched.title && formik.errors.title}
                        />
                        <Dropdown
                            label="Employment Type"
                            required
                            placeholder="Select employment type"
                            title="Employment Type"
                            options={values.employment_type_options}
                            value={formik.values.employment_type?.value}
                            onChange={(option) => formik.setFieldValue("employment_type", option)}
                            error={dropdownError(
                                formik.touched.employment_type,
                                formik.errors.employment_type,
                            )}
                        />
                        <Dropdown
                            label="Workplace Type"
                            required
                            placeholder="Select workplace type"
                            title="Workplace Type"
                            options={values.workplace_type_options}
                            value={formik.values.workplace_type?.value}
                            onChange={(option) => formik.setFieldValue("workplace_type", option)}
                            error={dropdownError(
                                formik.touched.workplace_type,
                                formik.errors.workplace_type,
                            )}
                        />
                        <Input
                            required
                            label="Location"
                            placeholder="City, area, or Remote"
                            value={formik.values.location}
                            onChangeText={formik.handleChange("location")}
                            onBlur={formik.handleBlur("location")}
                            error={formik.touched.location && formik.errors.location}
                        />
                        <Input
                            required
                            type="textarea"
                            label="Description"
                            placeholder="Describe the role, requirements, and benefits"
                            value={formik.values.description}
                            onChangeText={formik.handleChange("description")}
                            onBlur={formik.handleBlur("description")}
                            error={formik.touched.description && formik.errors.description}
                        />
                    </View>
                    <Button onPress={formik.handleSubmit} loading={values.is_loading}>
                        {values.is_edit ? "Update Job" : "Post Job"}
                    </Button>
                </View>
            </KeyboardAvoidingWrapper>
        </PrimaryLayout>
    )
}

export default CreateJob

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        gap: heightPixel(40),
    },
    fields: {
        gap: heightPixel(16),
    },
})
