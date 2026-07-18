import { useFormik } from "formik"
import { useCallback } from "react"
import { useDispatch } from "react-redux"
import * as Yup from "yup"
import { IS_BETA } from "../../../config/env"
import { navigate, replace } from "../../../helpers/navigation"
import { ROUTES } from "../../../helpers/routes"
import useKeychain from "../../../hooks/useKeychain"
import { useSocialLogin } from "../../../hooks/useSocialLogin"
import { useLoginMutation, useSocialLoginMutation } from "../../../redux/apis/Auth"
import { setCredentials } from "../../../redux/slices/auth.slice"

const login_schema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
})

const useLoginController = () => {

    const dispatch = useDispatch()
    const { credentials, saveCredentials, clearCredentials } = useKeychain()
    const { signInWithGoogle } = useSocialLogin()

    const [submit, { isLoading }] = useLoginMutation()
    const [submitSocialLogin, { isLoading: isSocialLoginLoading }] = useSocialLoginMutation()

    const initial = {
        email: credentials?.email ?? "",
        password: credentials?.password ?? "",
        remember_me: !!credentials,
    }

    const formik = useFormik({
        initialValues: initial,
        validationSchema: login_schema,
        enableReinitialize: true,
        onSubmit: async (values) => {

            if (values.remember_me) {
                await saveCredentials(values.email, values.password)
            } else {
                await clearCredentials()
            }

            if (IS_BETA) {
                submit(values)
            } else {
                dispatch(setCredentials())
            }

        },
    })

    const onSignup = () => replace(ROUTES.SIGNUP)
    const onForgotPassword = () => navigate(ROUTES.FORGET_PASSWORD)

    const onGoogle = useCallback(async () => {

        const response = await signInWithGoogle()

        if (response?.success && response.token) {
            submitSocialLogin({
                type: response.provider,
                access_token: response.token
            })
        }

    }, [])

    const onApple = useCallback(async () => {
        onGoogle()
    }, [])

    return {
        values: {
            formik,
            isLoading: isLoading || isSocialLoginLoading,
        },
        functions: {
            onSignup,
            onForgotPassword,
            onGoogle,
            onApple
        },
    }
}

export default useLoginController