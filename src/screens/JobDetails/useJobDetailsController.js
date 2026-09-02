import { useRoute } from "@react-navigation/native"
import { useCallback } from "react"
import { Linking } from "react-native"
import { useSelector } from "react-redux"
import { useModal } from "../../contexts/ModalContext"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import { useGetJobByIdQuery } from "../../redux/apis/Job"
import { selectEmploymentTypes, selectWorkplaceTypes } from "../../redux/selectors"

const getOptionLabel = (options, value) =>
    options.find((option) => option.value === value)?.label ?? value

const useJobDetailsController = () => {

    const { params } = useRoute()
    const id = params?._id
    const employment_types = useSelector(selectEmploymentTypes)
    const workplace_types = useSelector(selectWorkplaceTypes)
    const { showInfoModal } = useModal()

    const { data, isLoading: is_loading, isError } = useGetJobByIdQuery(
        { id, show_similar_jobs: true },
        { skip: !id },
    )

    const job = data?.data
    const similar_jobs = data?.similar_jobs ?? []
    const business = job?.business

    const employment_type_label = getOptionLabel(employment_types, job?.employment_type)
    const workplace_type_label = getOptionLabel(workplace_types, job?.workplace_type)
    const location_label = job?.location
        || business?.address?.formatted
        || [business?.address?.city, business?.address?.state].filter(Boolean).join(", ")
        || null

    const apply_url = business?.email
        ? `mailto:${business.email}?subject=${encodeURIComponent(`Application for ${job?.title || "Job"}`)}`
        : business?.phone
            ? `tel:${`${business.dialing_code ?? ""}${business.phone}`.replace(/[^\d+]/g, "")}`
            : null

    const onApply = useCallback(() => {
        if (apply_url) {
            Linking.openURL(apply_url)
            return
        }

        showInfoModal({
            title: "Unable to Apply",
            message: "This business has not provided contact details yet.",
        })
    }, [apply_url, showInfoModal])

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
