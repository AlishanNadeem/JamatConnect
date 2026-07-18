import { useFormik } from "formik"
import { useEffect } from "react"
import * as Yup from "yup"
import { useModal } from "../../contexts/ModalContext"
import { goBack } from "../../helpers/navigation"
import { useChangePasswordMutation } from "../../redux/apis/User"

const change_password_schema = Yup.object().shape({
    old_password: Yup.string()
        .required("Current password is required"),

    new_password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),

    confirm_password: Yup.string()
        .oneOf([Yup.ref("new_password")], "Passwords must match")
        .required("Confirm password is required"),
})

const initial = {
    old_password: "",
    new_password: "",
    confirm_password: "",
}

const useChangePasswordController = () => {

    const { showInfoModal } = useModal()

    const [submit, { isLoading, isSuccess }] = useChangePasswordMutation()

    const formik = useFormik({
        initialValues: initial,
        validationSchema: change_password_schema,
        onSubmit: async (values) => submit(values),
    })

    useEffect(() => {
        if (isSuccess) {
            showInfoModal({ title: "Thank You!", message: "Password has been updated successfully", onConfirm: goBack })
        }
    }, [isSuccess])

    return {
        values: {
            formik,
            isLoading,
        },
    }
}

export default useChangePasswordController