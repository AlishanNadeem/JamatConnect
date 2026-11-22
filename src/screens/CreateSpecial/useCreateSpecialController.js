import { useRoute } from "@react-navigation/native"
import { useFormik } from "formik"
import { useEffect, useMemo } from "react"
import * as Yup from "yup"
import { useModal } from "../../contexts/ModalContext"
import { goBack } from "../../helpers/navigation"
import {
    useCreateSpecialMutation,
    useGetSpecialByIdQuery,
    useUpdateSpecialMutation,
} from "../../redux/apis/Special"

const special_schema = Yup.object({
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

const empty_initial = {
    title: "",
    discount: "",
    description: "",
}

const useCreateSpecialController = () => {
    const { params } = useRoute()
    const special_id = params?._id
    const business_id = params?.business_id
    const is_edit = Boolean(special_id)

    const { showInfoModal } = useModal()

    const [create, { isSuccess: is_created, isLoading: is_creating, error: create_error }] = useCreateSpecialMutation()
    const [update, { isSuccess: is_updated, isLoading: is_updating, error: update_error }] = useUpdateSpecialMutation()

    const {
        data: special_response,
        isLoading: special_loading,
    } = useGetSpecialByIdQuery(special_id, { skip: !is_edit })

    const special = special_response?.data

    const initial = useMemo(() => {
        if (!special) return empty_initial
        return {
            title: special.title || "",
            discount: special.discount || "",
            description: special.description || "",
        }
    }, [special])

    const formik = useFormik({
        initialValues: initial,
        enableReinitialize: true,
        validationSchema: special_schema,
        onSubmit: async (values) => {
            const payload = {
                title: values.title.trim(),
                discount: values.discount.trim(),
                description: values.description.trim(),
            }

            if (is_edit) {
                update({ id: special_id, body: payload })
                return
            }

            create({
                ...payload,
                business: business_id,
            })
        },
    })

    useEffect(() => {
        if (!is_created && !is_updated) return
        showInfoModal({
            title: is_edit ? "Special Updated" : "Special Posted",
            message: is_edit
                ? "Your special has been updated."
                : "Your special is now live for 30 days.",
            onConfirm: () => goBack(),
        })
    }, [is_created, is_updated, is_edit, showInfoModal])

    useEffect(() => {
        const error = create_error || update_error
        if (!error) return
        showInfoModal({
            title: "Unable to Save",
            message: error?.data?.message || "Please try again.",
        })
    }, [create_error, update_error, showInfoModal])

    return {
        values: {
            formik,
            is_edit,
            special_loading,
            is_submitting: is_creating || is_updating,
            can_edit: !is_edit || Boolean(special?.editable),
        },
    }
}

export default useCreateSpecialController
