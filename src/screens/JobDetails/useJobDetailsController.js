import { useRoute } from "@react-navigation/native"
import { useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { useModal } from "../../contexts/ModalContext"
import { getLocationLabel, getOptionLabel } from "../../helpers/general"
import { goBack, navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import {
    useApplyJobMutation,
    useCloseJobMutation,
    useDeleteJobMutation,
    useGetJobApplicationsQuery,
    useGetJobByIdQuery,
} from "../../redux/apis/Job"
import { selectEmploymentTypes, selectUser, selectWorkplaceTypes } from "../../redux/selectors"

const mapApplicant = (application) => ({
    _id: application._id,
    name: application.applicant?.name || "Applicant",
    email: application.applicant?.email,
    image_url: application.applicant?.image_url,
    date: application.createdAt,
})

const useJobDetailsController = () => {

    const { params } = useRoute()
    const id = params?._id
    const current_user = useSelector(selectUser)
    const employment_types = useSelector(selectEmploymentTypes)
    const workplace_types = useSelector(selectWorkplaceTypes)
    const { showInfoModal, showConfirmModal } = useModal()

    const { data, isLoading: is_loading, isError } = useGetJobByIdQuery(
        { id, show_similar_jobs: true },
        { skip: !id },
    )

    const [applyJob, { isSuccess: is_applied, isLoading: is_applying }] = useApplyJobMutation()
    const [closeJob, { isSuccess: is_closed, isLoading: is_closing, data: close_data }] = useCloseJobMutation()
    const [deleteJob, { isSuccess: is_deleted, isLoading: is_deleting }] = useDeleteJobMutation()

    const job = data?.data
    const business = job?.business
    const business_owner_id = business?.user?._id ?? business?.user
    const is_mine = Boolean(current_user?._id && business_owner_id)
        && String(business_owner_id) === String(current_user._id)

    const { data: applications_data } = useGetJobApplicationsQuery(id, {
        skip: !id || !is_mine,
    })

    const applicants = (applications_data?.data ?? []).map(mapApplicant)
    const similar_jobs = is_mine ? [] : (data?.similar_jobs ?? [])

    useEffect(() => {
        if (!is_applied) return
        showInfoModal({
            title: "Application Sent",
            message: "You have successfully applied for this job.",
        })
    }, [is_applied])

    useEffect(() => {
        if (!is_deleted) return
        showInfoModal({
            title: "Job Deleted",
            message: "Your job posting has been deleted successfully.",
            onConfirm: () => goBack(),
        })
    }, [is_deleted])

    useEffect(() => {
        if (!is_closed) return
        const closed = close_data?.data?.closed
        showInfoModal({
            title: closed ? "Job Closed" : "Job Reopened",
            message: closed
                ? "This job has been marked as closed."
                : "This job has been reopened and is accepting applications again.",
        })
    }, [is_closed, close_data])

    const onApply = useCallback(async () => {
        if (!id || job?.applied || job?.closed || is_applying || is_mine) return

        const confirmed = await showConfirmModal({
            title: "Apply for Job",
            message: "Are you sure you want to apply for this job?",
        })

        if (confirmed) applyJob(id)
    }, [applyJob, id, is_applying, is_mine, job?.applied, job?.closed, showConfirmModal])

    const onToggleClosed = useCallback(async () => {
        if (!id || is_closing) return

        const confirmed = await showConfirmModal({
            title: job?.closed ? "Reopen Job" : "Close Job",
            message: job?.closed
                ? "Are you sure you want to reopen this job?"
                : "Are you sure you want to mark this job as closed? Applicants will no longer be able to apply.",
        })

        if (confirmed) closeJob(id)
    }, [closeJob, id, is_closing, job?.closed, showConfirmModal])

    const onDelete = useCallback(async () => {
        if (!id || is_deleting) return

        const confirmed = await showConfirmModal({
            title: "Delete Job",
            message: "Are you sure you want to delete this job? This will also remove all applications.",
        })

        if (confirmed) deleteJob(id)
    }, [deleteJob, id, is_deleting, showConfirmModal])

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
            is_mine,
            applicants,
            is_applying,
            is_closing,
            is_deleting,
            is_loading,
            is_error: isError || !id || (!job && !is_loading),
            employment_type_label: getOptionLabel(employment_types, job?.employment_type),
            workplace_type_label: getOptionLabel(workplace_types, job?.workplace_type),
            location_label: getLocationLabel({ location: job?.location, address: business?.address }),
            apply_label: job?.applied ? "Applied" : job?.closed ? "Closed" : "Apply for job",
        },
        functions: {
            onViewBusiness,
            onSimilarJobPress,
            onApply,
            onToggleClosed,
            onDelete,
        },
    }
}

export default useJobDetailsController
