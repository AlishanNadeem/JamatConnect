import { useFormik } from "formik"
import { useCallback, useEffect } from "react"
import * as Yup from "yup"
import { IS_BETA } from "../../../config/env"
import { navigate, replace } from "../../../helpers/navigation"
import { ROUTES } from "../../../helpers/routes"
import { useForgetPasswordMutation } from "../../../redux/apis/Auth"

const forget_password_schema = Yup.object().shape({
    email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email address is required"),
})

const initial = {
    email: "",
}

const useForgotPasswordController = () => {

    const [submit, { data, isLoading, isSuccess }] = useForgetPasswordMutation()

    const formik = useFormik({
        initialValues: initial,
        validationSchema: forget_password_schema,
        onSubmit: async (values) => {
            if (IS_BETA) {
                submit(values)
            } else {
                onSuccess({ email: values.email })
            }
        }
    })

    useEffect(() => {
        if (isSuccess) {
            onSuccess(data?.data)
        }
    }, [isSuccess, data])

    const onSuccess = useCallback((payload) => {
        navigate(ROUTES.VERIFY_CODE, payload)
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

export default useForgotPasswordController
