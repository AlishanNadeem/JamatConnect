import { useRoute } from "@react-navigation/native"
import { useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { useModal } from "../../contexts/ModalContext"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import { useApplyJobMutation, useGetJobByIdQuery } from "../../redux/apis/Job"
import { selectEmploymentTypes, selectWorkplaceTypes } from "../../redux/selectors"

const getOptionLabel = (options, value) =>
    options.find((option) => option.value === value)?.label ?? value

const useJobDetailsController = () => {

    const { params } = useRoute()
    const id = params?._id
    const employment_types = useSelector(selectEmploymentTypes)
    const workplace_types = useSelector(selectWorkplaceTypes)
    const { showInfoModal, showConfirmModal } = useModal()

    const { data, isLoading: is_loading, isError } = useGetJobByIdQuery(
        { id, show_similar_jobs: true },
        { skip: !id },
    )

    const [applyJob, { isSuccess: is_applied, isLoading: is_applying }] = useApplyJobMutation()

    const job = data?.data
    const similar_jobs = data?.similar_jobs ?? []
    const business = job?.business

    const employment_type_label = getOptionLabel(employment_types, job?.employment_type)
    const workplace_type_label = getOptionLabel(workplace_types, job?.workplace_type)
    const location_label = job?.location
        || business?.address?.formatted
        || [business?.address?.city, business?.address?.state].filter(Boolean).join(", ")
        || null

    useEffect(() => {

        if (!is_applied) return

        showInfoModal({
            title: "Application Sent",
            message: "You have successfully applied for this job.",
        })

    }, [is_applied])

    const onApply = useCallback(async () => {

        if (!id || job?.applied || is_applying) return

        const confirmed = await showConfirmModal({
            title: "Apply for Job",
            message: "Are you sure you want to apply for this job?",
        })

        if (!confirmed) return

        applyJob(id)

    }, [applyJob, id, is_applying, job?.applied])

    const onViewBusiness = useCallback(() => {
        if (!business?._id) return
        navigate(ROUTES.BUSINESS_DETAILS, { _id: business._id })
    }, [business?._id])

    const onSimilarJobPress = useCallback((item) => {
        if (!item?._id) return
        navigate(ROUTES.JOB_DETAILS, { _id: String(item._id) })
    }, [])

    return {
        values: {
            data: job,
            business,
            similar_jobs,
            is_applying,
            is_loading,
            is_error: isError || !id || (!job && !is_loading),
            employment_type_label,
            workplace_type_label,
            location_label,
        },
        functions: {
            onViewBusiness,
            onSimilarJobPress,
            onApply,
        },
    }
}

export default useJobDetailsController
