import { useFormik } from "formik"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import * as Yup from "yup"
import { useModal } from "../../contexts/ModalContext"
import { convertToFormData } from "../../helpers/general"
import { goBack } from "../../helpers/navigation"
import useImagePicker from "../../hooks/useImagePicker"
import useToggle from "../../hooks/useToggle"
import { useEditProfileMutation } from "../../redux/apis/User"
import { selectUser } from "../../redux/selectors"

export const edit_profile_schema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters")
        .required("Name is required"),
    country_code: Yup.string()
        .required("Country code is required"),
    dialing_code: Yup.string()
        .required("Dialing code is required"),
    phone: Yup.string()
        .matches(/^[0-9+\-\s()]*$/, "Invalid phone number format")
        .min(10, "Phone number must be at least 10 digits")
        .required("Phone number is required"),
    date_of_birth: Yup.date()
        .nullable(),
    emergency_notes: Yup.string()
        .max(500, "Emergency note must not exceed 500 characters"),
})

const useEditProfileController = () => {

    const user = useSelector(selectUser)
    const { showInfoModal } = useModal()

    const { value: image_modal, toggle: toggleImageModal } = useToggle()

    const [submit, { isSuccess, isLoading }] = useEditProfileMutation()

    const initial = {
        name: user?.name,
        email: user?.email,
        dialing_code: user?.dialing_code,
        country_code: user?.country_code,
        phone: user?.phone,
        image: user?.image_url,
        emergency_notes: user?.emergency_notes || "",
        date_of_birth: user?.date_of_birth || "",
    }

    const formik = useFormik({
        initialValues: initial,
        validationSchema: edit_profile_schema,
        enableReinitialize: true,
        onSubmit: async (values) => {

            let payload = { ...values }

            if (typeof payload?.image != "object") {
                delete payload.image
            }

            payload = convertToFormData(payload)
            submit(payload)

        },
    })

    const { openCamera, openGallery } = useImagePicker({
        onImageSelected: (selected) => formik.setFieldValue("image", selected)
    })

    useEffect(() => {
        if (isSuccess) {
            showInfoModal({
                title: "Thank You!",
                message: "Your profile has been updated successfully",
                onConfirm: goBack
            })
        }
    }, [isSuccess])

    return {
        values: {
            formik,
            isLoading,
            image_modal,
        },
        functions: {
            toggleImageModal,
            openCamera,
            openGallery,
        }
    }
}

export default useEditProfileController