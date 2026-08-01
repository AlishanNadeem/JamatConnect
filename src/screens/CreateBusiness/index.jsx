import { StyleSheet, View } from "react-native"
import Button from "../../components/Button"
import ImagePickerModal from "../../components/ImagePickerModal"
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper"
import Row from "../../components/Row"
import StepIndicator from "../../components/StepIndicator"
import colors from "../../helpers/colors"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import StepFour from "./StepFour"
import StepOne from "./StepOne"
import StepThree from "./StepThree"
import StepTwo from "./StepTwo"
import useCreateBusinessController, { FORM_STEPS } from "./useCreateBusinessController"

const STEP_COMPONENTS = [StepOne, StepTwo, StepThree, StepFour]

const CreateBusiness = () => {

    const { values, functions } = useCreateBusinessController()
    const StepComponent = STEP_COMPONENTS[values.current_step]

    return (
        <PrimaryLayout header>
            <View style={styles.wrapper}>
                <StepIndicator
                    current_step={values.current_step}
                    total_steps={values.total_steps}
                    step={values.step}
                    steps={FORM_STEPS}
                />
                <View style={styles.scroll_area}>
                    <KeyboardAvoidingWrapper>
                        <View style={styles.container}>
                            <StepComponent
                                formik={values.formik}
                                categories={values.categories}
                                categories_loading={values.categories_loading}
                                onOpenImagePicker={functions.onOpenImagePicker}
                                onUpdateHour={functions.onUpdateHour}
                            />
                        </View>
                    </KeyboardAvoidingWrapper>
                </View>
                <View style={styles.footer}>
                    <Row gap={12}>
                        {
                            !values.is_first_step ? (
                                <View style={styles.footer_button}>
                                    <Button
                                        type="secondary"
                                        onPress={functions.onBack}
                                    >
                                        Back
                                    </Button>
                                </View>
                            ) : null
                        }
                        <View style={styles.footer_button}>
                            <Button
                                onPress={values.is_last_step
                                    ? values.formik.handleSubmit
                                    : functions.onNext}
                                loading={values.is_loading}
                            >
                                {values.is_last_step ? "Submit" : "Continue"}
                            </Button>
                        </View>
                    </Row>
                </View>
            </View>
            <ImagePickerModal
                visible={values.image_modal}
                onClose={functions.toggleImageModal}
                onCamera={functions.openCamera}
                onGallery={functions.openGallery}
            />
        </PrimaryLayout>
    )
}

export default CreateBusiness

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    scroll_area: {
        flex: 1,
        minHeight: 0,
    },
    container: {
        paddingBottom: heightPixel(16),
    },
    footer: {
        paddingTop: heightPixel(12),
        paddingBottom: heightPixel(8),
        borderTopWidth: heightPixel(1),
        borderTopColor: colors.light_gray,
        backgroundColor: colors.background,
    },
    footer_button: {
        flex: 1,
    },
})
