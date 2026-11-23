import { useRoute } from "@react-navigation/native"
import { useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { useModal } from "../../contexts/ModalContext"
import { formatDate } from "../../helpers/date"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import {
    useClaimBillboardMutation,
    useGetMyBillboardQuery,
} from "../../redux/apis/Billboard"
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

    const {
        data: billboard_response,
        refetch: refetch_billboard,
    } = useGetMyBillboardQuery(
        { business: business_id },
        { skip: !business_id },
    )

    const [toggleActive, { isLoading: is_toggling }] = useToggleSpecialActiveMutation()
    const [deleteSpecial, { isLoading: is_deleting }] = useDeleteSpecialMutation()
    const [claimBillboard, { isLoading: is_claiming }] = useClaimBillboardMutation()

    const specials = data?.data ?? []
    const billboard = billboard_response?.data ?? null

    const live_special = useMemo(() => {
        const now = Date.now()
        return specials.find((item) => (
            item.is_active
            && !item.is_expired
            && (!item.expires_at || new Date(item.expires_at).getTime() > now)
        )) || null
    }, [specials])

    const billboard_status_label = useMemo(() => {
        if (!billboard) return null
        if (billboard.status === "active") {
            return billboard.ends_at
                ? `Sponsored active · ends ${formatDate(billboard.ends_at)}`
                : "Sponsored active"
        }
        if (billboard.status === "waitlisted") {
            const pos = billboard.waitlist_position
            return pos
                ? `Waitlisted · position #${pos}`
                : "Waitlisted for Sponsored"
        }
        return null
    }, [billboard])

    const onRefresh = useCallback(() => {
        refetch()
        refetch_billboard()
    }, [refetch, refetch_billboard])

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

    const onClaimBillboard = useCallback(async () => {
        if (!business_id) return

        if (billboard) {
            showInfoModal({
                title: "Already Queued",
                message: billboard_status_label || "This business already has a Sponsored slot.",
            })
            return
        }

        if (!live_special) {
            showInfoModal({
                title: "No Live Special",
                message: "Post an active special first, then claim Sponsored.",
            })
            return
        }

        const confirmed = await showConfirmModal({
            title: "Get Sponsored",
            message: `Promote "${live_special.title}" on the Home Sponsored slot? If all 5 slots are taken, you will join the waitlist.`,
        })
        if (!confirmed) return

        try {
            const result = await claimBillboard({
                business: business_id,
                special: live_special._id,
            }).unwrap()

            showInfoModal({
                title: result?.data?.status === "active" ? "Sponsored Active" : "Waitlisted",
                message: result?.message || "Billboard request submitted.",
            })
        } catch (error) {
            showInfoModal({
                title: "Unable to Claim",
                message: error?.data?.message || "Please try again.",
            })
        }
    }, [
        business_id,
        billboard,
        billboard_status_label,
        live_special,
        showConfirmModal,
        showInfoModal,
        claimBillboard,
    ])

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
            data: specials,
            business_id,
            billboard,
            billboard_status_label,
            can_claim: !billboard && Boolean(live_special),
            is_owner: Boolean(current_user?._id),
            is_loading: isLoading,
            refreshing: isFetching,
            loading_more: false,
            is_busy: is_toggling || is_deleting || is_claiming,
            is_claiming,
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
            onClaimBillboard,
            onSpecialPress,
            onEdit,
            onToggleActive,
            onDelete,
        },
    }
}

export default useBusinessSpecialsController
