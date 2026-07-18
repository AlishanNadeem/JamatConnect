import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import * as Yup from "yup"
import { IS_BETA } from "../../../config/env"
import { navigate, replace } from "../../../helpers/navigation"
import { ROUTES } from "../../../helpers/routes"
import useKeychain from "../../../hooks/useKeychain"
import { useLoginMutation } from "../../../redux/apis/Auth"
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

    const [submit, { isLoading }] = useLoginMutation()

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

    return {
        values: {
            formik,
            isLoading,
        },
        functions: {
            onSignup,
            onForgotPassword,
        },
    }
}

export default useLoginController