import { useRoute } from "@react-navigation/native"
import { useFormik } from "formik"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import * as Yup from "yup"
import { useModal } from "../../contexts/ModalContext"
import { goBack } from "../../helpers/navigation"
import { useCreateJobMutation } from "../../redux/apis/Job"
import { selectEmploymentTypes, selectWorkplaceTypes } from "../../redux/selectors"

const option_schema = Yup.object({
    value: Yup.string().required("Required"),
    label: Yup.string(),
}).nullable()

const create_job_schema = Yup.object({
    title: Yup.string()
        .min(2, "Title must be at least 2 characters")
        .max(120, "Title must not exceed 120 characters")
        .required("Title is required"),
    description: Yup.string()
        .min(20, "Description must be at least 20 characters")
        .required("Description is required"),
    employment_type: option_schema.required("Employment type is required"),
    workplace_type: option_schema.required("Workplace type is required"),
    location: Yup.string()
        .min(2, "Location must be at least 2 characters")
        .required("Location is required"),
})

const initial_values = {
    title: "",
    description: "",
    employment_type: null,
    workplace_type: null,
    location: "",
}

const useCreateJobController = () => {

    const { params } = useRoute()
    const business_id = params?.business_id
    const { showInfoModal } = useModal()
    const employment_type_options = useSelector(selectEmploymentTypes)
    const workplace_type_options = useSelector(selectWorkplaceTypes)
    const [create, { isSuccess: is_created, isLoading: is_creating }] = useCreateJobMutation()

    const formik = useFormik({
        initialValues: initial_values,
        validationSchema: create_job_schema,
        onSubmit: async (values) => {
            if (!business_id) {
                showInfoModal({
                    title: "Missing Business",
                    message: "Open Post a Job from one of your businesses.",
                })
                return
            }

            create({
                business: business_id,
                title: values.title.trim(),
                description: values.description.trim(),
                employment_type: values.employment_type?.value,
                workplace_type: values.workplace_type?.value,
                location: values.location.trim(),
            })
        },
    })

    useEffect(() => {
        if (!is_created) return
        showInfoModal({
            title: "Job Posted",
            message: "Your job has been posted successfully.",
            onConfirm: goBack,
        })
    }, [is_created])

    return {
        values: {
            formik,
            is_loading: is_creating,
            employment_type_options,
            workplace_type_options,
            business_id,
        },
        functions: {},
    }
}

export default useCreateJobController
