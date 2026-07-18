import { useRoute } from "@react-navigation/native"
import { useFormik } from "formik"
import { useCallback, useEffect } from "react"
import * as Yup from "yup"
import { IS_BETA } from "../../../config/env"
import { useModal } from "../../../contexts/ModalContext"
import { replace, reset } from "../../../helpers/navigation"
import { ROUTES } from "../../../helpers/routes"
import { useSetPasswordMutation } from "../../../redux/apis/Auth"

const set_password_schema = Yup.object().shape({
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
    password: "",
    confirm_password: "",
}

const useSetPasswordController = () => {

    const { params } = useRoute()
    const { showInfoModal } = useModal()

    const [submit, { isSuccess, isLoading }] = useSetPasswordMutation()

    const formik = useFormik({
        initialValues: initial,
        validationSchema: set_password_schema,
        onSubmit: async (values) => {
            if (IS_BETA) {
                submit({ ...values, ...params })
            } else {
                onSuccess()
            }
        }
    })

    useEffect(() => {
        if (isSuccess) {
            onSuccess()
        }
    }, [isSuccess])

    const onSuccess = useCallback(() => {
        showInfoModal({
            title: "Success!",
            message: "Password updated successfully. Please Log in to continue!",
            onConfirm: () => reset(ROUTES.LOGIN)
        })
    }, [])

    const onBackToLogin = useCallback(() => {
        replace(ROUTES.LOGIN)
    }, [])

    return {
        values: {
            formik,
            isLoading
        },
        functions: {
            onBackToLogin
        },
    }
}

export default useSetPasswordController
