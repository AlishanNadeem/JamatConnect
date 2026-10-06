import { useFormik } from "formik"
import { useEffect } from "react"
import { useRoute } from "@react-navigation/native"
import * as Yup from "yup"
import { useModal } from "../../contexts/ModalContext"
import { goBack } from "../../helpers/navigation"
import { useCreateSpecialMutation } from "../../redux/apis/Special"

const create_special_schema = Yup.object({
    title: Yup.string()
        .min(2, "Title must be at least 2 characters")
        .max(100, "Title must not exceed 100 characters")
        .required("Title is required"),
    discount: Yup.string()
        .min(1, "Discount is required")
        .max(100, "Discount must not exceed 100 characters")
        .required("Discount is required"),
    description: Yup.string()
        .min(10, "Description must be at least 10 characters")
        .max(1000, "Description must not exceed 1000 characters")
        .required("Description is required"),
})

const useCreateSpecialController = () => {
    const { params } = useRoute()
    const business_id = params?.business_id
    const { showInfoModal } = useModal()
    const [create, { isSuccess, isLoading, isError, error }] = useCreateSpecialMutation()

    const formik = useFormik({
        initialValues: {
            title: "",
            discount: "",
            description: "",
        },
        validationSchema: create_special_schema,
        onSubmit: (values) => {
            if (!business_id) {
                showInfoModal({
                    title: "Missing Business",
                    message: "Open Add Special from one of your businesses.",
                })
                return
            }

            create({
                business: business_id,
                title: values.title.trim(),
                discount: values.discount.trim(),
                description: values.description.trim(),
            })
        },
    })

    useEffect(() => {
        if (!isSuccess) return
        showInfoModal({
            title: "Special Live",
            message: "Your special is live and visible to the community.",
            onConfirm: goBack,
        })
    }, [isSuccess, showInfoModal])

    useEffect(() => {
        if (!isError) return
        showInfoModal({
            title: "Unable to Create",
            message: error?.data?.message || "Something went wrong. Please try again.",
        })
    }, [error, isError, showInfoModal])

    return {
        values: {
            formik,
            is_loading: isLoading,
            business_id,
        },
        functions: {},
    }
}

export default useCreateSpecialController
