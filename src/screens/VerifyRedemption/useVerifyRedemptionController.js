import { useFormik } from "formik"
import { useEffect } from "react"
import * as Yup from "yup"
import { useModal } from "../../contexts/ModalContext"
import { useUseRedemptionCodeMutation } from "../../redux/apis/Special"

const schema = Yup.object({
    code: Yup.string()
        .min(4, "Enter a valid code")
        .max(20, "Enter a valid code")
        .required("Code is required"),
})

const useVerifyRedemptionController = () => {
    const { showInfoModal } = useModal()
    const [verify, { isSuccess, isLoading, error, data }] = useUseRedemptionCodeMutation()

    const formik = useFormik({
        initialValues: { code: "" },
        validationSchema: schema,
        onSubmit: (values) => {
            verify(values.code.trim().toUpperCase())
        },
    })

    useEffect(() => {
        if (!isSuccess) return
        showInfoModal({
            title: "Code Verified",
            message: data?.message || "Redemption marked as used.",
        })
        formik.resetForm()
    }, [isSuccess, data, showInfoModal])

    useEffect(() => {
        if (!error) return
        showInfoModal({
            title: "Invalid Code",
            message: error?.data?.message || "Unable to verify this code.",
        })
    }, [error, showInfoModal])

    return {
        values: {
            formik,
            is_submitting: isLoading,
        },
    }
}

export default useVerifyRedemptionController
