import { useFormik } from "formik"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import * as Yup from "yup"
import { useModal } from "../../contexts/ModalContext"
import { useCreateFeedbackMutation } from "../../redux/apis/Feedback"
import { selectUser } from "../../redux/selectors"

const contact_schema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Full name is required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    subject: Yup.string()
        .min(5, "Subject must be at least 5 characters")
        .required("Subject is required"),
    message: Yup.string()
        .min(20, "Message must be at least 20 characters")
        .required("Message is required"),
})

const useContactUsController = () => {

    const user = useSelector(selectUser)
    const { showInfoModal } = useModal()

    const [submit, { isLoading, isSuccess }] = useCreateFeedbackMutation()

    const initial = {
        name: user?.name || "",
        email: user?.email || "",
        subject: "",
        message: "",
    }

    const formik = useFormik({
        initialValues: initial,
        validationSchema: contact_schema,
        onSubmit: async (values) => submit(values)
    })

    useEffect(() => {
        if (isSuccess) {
            showInfoModal({ message: "Your message has been submitted successfully", onConfirm: () => formik.resetForm() })
        }
    }, [isSuccess])

    return {
        values: {
            formik,
            isLoading,
        },
    }
}

export default useContactUsController