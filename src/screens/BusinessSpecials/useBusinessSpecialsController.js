import { useRoute } from "@react-navigation/native"
import { useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { useModal } from "../../contexts/ModalContext"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import {
    useDeleteSpecialMutation,
    useGetMySpecialsQuery,
    useToggleSpecialActiveMutation,
} from "../../redux/apis/Special"
import { selectUser } from "../../redux/selectors"

const useBusinessSpecialsController = () => {
    const { params } = useRoute()
    const business_id = params?._id
    const current_user = useSelector(selectUser)
    const { showConfirmModal, showInfoModal } = useModal()

    const query_params = useMemo(() => ({
        business: business_id,
    }), [business_id])

    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetMySpecialsQuery(query_params, { skip: !business_id })

    const [toggleActive, { isLoading: is_toggling }] = useToggleSpecialActiveMutation()
    const [deleteSpecial, { isLoading: is_deleting }] = useDeleteSpecialMutation()

    const onRefresh = useCallback(() => {
        refetch()
    }, [refetch])

    const onCreate = useCallback(() => {
        navigate(ROUTES.CREATE_SPECIAL, { business_id })
    }, [business_id])

    const onVerifyCode = useCallback(() => {
        navigate(ROUTES.VERIFY_REDEMPTION, { business_id })
    }, [business_id])

    const onSpecialPress = useCallback((item) => {
        navigate(ROUTES.SPECIAL_DETAILS, { _id: String(item._id) })
    }, [])

    const onEdit = useCallback((item) => {
        navigate(ROUTES.CREATE_SPECIAL, { _id: String(item._id), business_id })
    }, [business_id])

    const onToggleActive = useCallback(async (item) => {
        const confirmed = await showConfirmModal({
            title: item.is_active ? "Deactivate Special" : "Activate Special",
            message: item.is_active
                ? "This special will be hidden from the Specials feed."
                : "This special will become visible again if it has not expired.",
        })
        if (!confirmed) return

        try {
            await toggleActive(item._id).unwrap()
        } catch (error) {
            showInfoModal({
                title: "Unable to Update",
                message: error?.data?.message || "Please try again.",
            })
        }
    }, [showConfirmModal, showInfoModal, toggleActive])

    const onDelete = useCallback(async (item) => {
        const confirmed = await showConfirmModal({
            title: "Delete Special",
            message: "Are you sure you want to delete this special?",
        })
        if (!confirmed) return

        try {
            await deleteSpecial(item._id).unwrap()
            showInfoModal({
                title: "Special Deleted",
                message: "The special has been removed.",
            })
        } catch (error) {
            showInfoModal({
                title: "Unable to Delete",
                message: error?.data?.message || "Please try again.",
            })
        }
    }, [deleteSpecial, showConfirmModal, showInfoModal])

    return {
        values: {
            data: data?.data ?? [],
            business_id,
            is_owner: Boolean(current_user?._id),
            is_loading: isLoading,
            refreshing: isFetching,
            loading_more: false,
            is_busy: is_toggling || is_deleting,
            empty: isError
                ? {
                    title: "Something Went Wrong",
                    description: "Pull to refresh and try again.",
                }
                : {
                    title: "No Specials Yet",
                    description: "Post your first special for the community.",
                },
        },
        functions: {
            onRefresh,
            onCreate,
            onVerifyCode,
            onSpecialPress,
            onEdit,
            onToggleActive,
            onDelete,
        },
    }
}

export default useBusinessSpecialsController
