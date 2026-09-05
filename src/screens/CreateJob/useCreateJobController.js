import { useRoute } from "@react-navigation/native"
import { useFormik } from "formik"
import { useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import * as Yup from "yup"
import { useModal } from "../../contexts/ModalContext"
import { getOptionLabel } from "../../helpers/general"
import { goBack } from "../../helpers/navigation"
import {
    useCreateJobMutation,
    useGetJobByIdQuery,
    useUpdateJobMutation,
} from "../../redux/apis/Job"
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

const empty_initial = {
    title: "",
    description: "",
    employment_type: null,
    workplace_type: null,
    location: "",
}

const toOption = (options, value) => {
    if (!value) return null
    const label = getOptionLabel(options, value)
    return { value, label: label || value }
}

const useCreateJobController = () => {

    const { params } = useRoute()
    const job_id = params?._id
    const business_id = params?.business_id
    const is_edit = Boolean(job_id)

    const { showInfoModal } = useModal()
    const employment_type_options = useSelector(selectEmploymentTypes)
    const workplace_type_options = useSelector(selectWorkplaceTypes)

    const [create, { isSuccess: is_created, isLoading: is_creating }] = useCreateJobMutation()
    const [update, { isSuccess: is_updated, isLoading: is_updating }] = useUpdateJobMutation()

    const {
        data: job_response,
        isLoading: job_loading,
    } = useGetJobByIdQuery(job_id, { skip: !is_edit })

    const job = job_response?.data

    const initial = useMemo(() => {

        if (!job) return empty_initial

        return {
            title: job.title || "",
            description: job.description || "",
            employment_type: toOption(employment_type_options, job.employment_type),
            workplace_type: toOption(workplace_type_options, job.workplace_type),
            location: job.location || "",
        }

    }, [job, employment_type_options, workplace_type_options])

    const formik = useFormik({
        initialValues: initial,
        enableReinitialize: true,
        validationSchema: create_job_schema,
        onSubmit: async (values) => {

            const payload = {
                title: values.title.trim(),
                description: values.description.trim(),
                employment_type: values.employment_type?.value,
                workplace_type: values.workplace_type?.value,
                location: values.location.trim(),
            }

            if (is_edit) {
                update({ id: job_id, body: payload })
                return
            }

            if (!business_id) {
                showInfoModal({
                    title: "Missing Business",
                    message: "Open Post a Job from one of your businesses.",
                })
                return
            }

            create({
                business: business_id,
                ...payload,
            })
        },
    })

    useEffect(() => {

        if (!is_created && !is_updated) return

        showInfoModal({
            title: is_edit ? "Job Updated" : "Job Posted",
            message: is_edit
                ? "Your job has been updated successfully."
                : "Your job has been posted successfully.",
            onConfirm: goBack,
        })

    }, [is_created, is_edit, is_updated])

    return {
        values: {
            formik,
            is_edit,
            is_loading: is_creating || is_updating,
            job_loading: is_edit && job_loading,
            employment_type_options,
            workplace_type_options,
            business_id,
        },
        functions: {},
    }
}

export default useCreateJobController
