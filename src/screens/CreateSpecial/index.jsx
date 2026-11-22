import { useNavigation } from "@react-navigation/native"
import { useLayoutEffect } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import Button from "../../components/Button"
import Input from "../../components/Input"
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper"
import HeaderTitle from "../../components/Navigation/HeaderTitle"
import Text from "../../components/Text"
import colors from "../../helpers/colors"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useCreateSpecialController from "./useCreateSpecialController"

const CreateSpecial = () => {
    const navigation = useNavigation()
    const { values } = useCreateSpecialController()
    const { formik } = values

    useLayoutEffect(() => {
        if (!values.is_edit) return
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title="Edit Special" has_back_button />,
        })
    }, [navigation, values.is_edit])

    if (values.special_loading) {
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
                    {values.is_edit && !values.can_edit ? (
                        <Text size={13} color={colors.danger}>
                            The 24-hour edit window has ended. You can still deactivate this special from Manage Specials.
                        </Text>
                    ) : null}
                    <View style={styles.fields}>
                        <Input
                            required
                            label="Title"
                            placeholder="e.g. 30% off full service"
                            value={formik.values.title}
                            onChangeText={formik.handleChange("title")}
                            onBlur={formik.handleBlur("title")}
                            error={formik.touched.title && formik.errors.title}
                            editable={values.can_edit}
                        />
                        <Input
                            required
                            label="Discount"
                            placeholder="e.g. 30% OFF"
                            value={formik.values.discount}
                            onChangeText={formik.handleChange("discount")}
                            onBlur={formik.handleBlur("discount")}
                            error={formik.touched.discount && formik.errors.discount}
                            editable={values.can_edit}
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
                            editable={values.can_edit}
                        />
                    </View>
                    <Button
                        loading={values.is_submitting}
                        disabled={!values.can_edit}
                        onPress={formik.handleSubmit}
                    >
                        {values.is_edit ? "Save Changes" : "Post Special"}
                    </Button>
                </View>
            </KeyboardAvoidingWrapper>
        </PrimaryLayout>
    )
}

export default CreateSpecial

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: heightPixel(80),
    },
    container: {
        flex: 1,
        gap: heightPixel(16),
        paddingBottom: heightPixel(24),
    },
    fields: {
        gap: heightPixel(12),
    },
})
