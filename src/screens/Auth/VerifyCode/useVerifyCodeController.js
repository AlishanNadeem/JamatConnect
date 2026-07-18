import { useRoute } from "@react-navigation/native"
import { useFormik } from "formik"
import { useCallback, useEffect, useRef, useState } from "react"
import * as Yup from "yup"
import { IS_BETA } from "../../../config/env"
import { replace, reset } from "../../../helpers/navigation"
import { ROUTES } from "../../../helpers/routes"
import { useForgetPasswordMutation, useVerifyCodeMutation } from "../../../redux/apis/Auth"

const verify_code_schema = Yup.object().shape({
    code: Yup.string()
        .length(6, "Code must be exactly 6 digits")
        .matches(/^\d{6}$/, "Code must contain only digits")
        .required("Code is required"),
})

const initial = {
    code: ""
}

const TIMER = 60

const useVerifyCodeController = () => {

    const { params } = useRoute()

    const [timer, setTimer] = useState(TIMER)
    const interval_ref = useRef(null)

    const [submit, { data, isLoading, isSuccess }] = useVerifyCodeMutation()
    const [forgetPassword, { isLoading: isForgetPasswordLoading, isSuccess: isForgetPasswordSuccess }] = useForgetPasswordMutation()

    const formik = useFormik({
        initialValues: initial,
        validationSchema: verify_code_schema,
        onSubmit: async (values) => {
            if (IS_BETA) {
                submit({ otp: values?.code, email: params?.email })
            } else {
                onSuccess({ email: params?.email, token: "dev" })
            }
        }
    })

    useEffect(() => {
        startTimer()
        return () => clearInterval(interval_ref.current)
    }, [])

    useEffect(() => {
        if (isSuccess) {
            onSuccess(data?.data)
        }
    }, [isSuccess, data])

    useEffect(() => {
        if (isForgetPasswordSuccess) {
            onResendSuccess()
        }
    }, [isForgetPasswordSuccess])

    const startTimer = useCallback(() => {
        setTimer(TIMER)
        clearInterval(interval_ref.current)
        interval_ref.current = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval_ref.current)
                    return 0
                }
                return prev - 1
            })
        }, 1000)
    }, [])

    const onSuccess = useCallback((payload) => {
        replace(ROUTES.SET_PASSWORD, payload)
    }, [])

    const onResendSuccess = useCallback(() => {
        startTimer()
    }, [])

    const handleResend = useCallback(() => {
        if (IS_BETA) {
            forgetPassword({ email: params?.email })
        } else {
            onResendSuccess()
        }
    }, [params])

    const onBackToLogin = useCallback(() => {
        reset(ROUTES.LOGIN)
    }, [])

    return {
        values: {
            formik,
            timer,
            isLoading,
            isForgetPasswordLoading
        },
        functions: {
            handleResend,
            onBackToLogin
        },
    }
}

export default useVerifyCodeController
