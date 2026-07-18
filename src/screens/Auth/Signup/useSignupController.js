import { useFormik } from "formik"
import { useCallback, useEffect } from "react"
import * as Yup from "yup"
import { IS_BETA } from "../../../config/env"
import { useModal } from "../../../contexts/ModalContext"
import { convertToFormData } from "../../../helpers/general"
import { replace, reset } from "../../../helpers/navigation"
import { ROUTES } from "../../../helpers/routes"
import useImagePicker from "../../../hooks/useImagePicker"
import useToggle from "../../../hooks/useToggle"
import { useSignupMutation } from "../../../redux/apis/Auth"

const signup_schema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must not exceed 50 characters")
        .required("Name is required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .required("Password is required"),
    confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Confirm password is required"),
})

const initial = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
}

const useSignupController = () => {

    const { showInfoModal } = useModal()
    const { value: image_modal, toggle: toggleImageModal } = useToggle(false)

    const [submit, { isLoading, isSuccess }] = useSignupMutation()

    const formik = useFormik({
        initialValues: initial,
        validationSchema: signup_schema,
        onSubmit: async (values) => {
            if (IS_BETA) {
                submit(convertToFormData(values))
            } else {
                onSuccess()
            }
        },
    })

    const { openCamera, openGallery, clearImage } = useImagePicker({
        onImageSelected: (selected) => formik.setFieldValue("image", selected)
    })

    useEffect(() => {
        if (isSuccess) {
            onSuccess()
        }
    }, [isSuccess])

    const onSuccess = useCallback(() => {
        showInfoModal({
            title: "Thank You!",
            message: "Your account has been created successfully.",
            button_text: "Continue",
            onConfirm: () => reset(ROUTES.LOGIN)
        })
    }, [])

    const onLogin = useCallback(() => {
        replace(ROUTES.LOGIN)
    }, [])

    const onRemoveImage = useCallback(() => {
        clearImage()
    }, [])

    return {
        values: {
            formik,
            isLoading,
            image_modal,
        },
        functions: {
            onLogin,
            toggleImageModal,
            openCamera,
            openGallery,
            onRemoveImage
        },
    }
}

export default useSignupController
