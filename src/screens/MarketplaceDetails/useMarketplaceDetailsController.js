import { useRoute } from "@react-navigation/native"
import { useCallback, useEffect } from "react"
import { Linking } from "react-native"
import { useSelector } from "react-redux"
import { useModal } from "../../contexts/ModalContext"
import { formatPhone } from "../../helpers/general"
import { goBack, navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import { useDeleteListingMutation, useGetListingByIdQuery, useRenewListingMutation, useToggleListingActiveMutation } from "../../redux/apis/Marketplace"
import { selectUser } from "../../redux/selectors"

const useMarketplaceDetailsController = () => {

    const { params } = useRoute()
    const id = params?._id
    const current_user = useSelector(selectUser)
    const { showConfirmModal, showInfoModal } = useModal()

    const { data, isLoading: is_loading, isError, } = useGetListingByIdQuery(id, { skip: !id })
    const [deleteListing, { isSuccess: is_deleted, isLoading: is_deleting }] = useDeleteListingMutation()
    const [toggleActive, { data: toggle_data, isSuccess: is_toggled, isLoading: is_toggling }] = useToggleListingActiveMutation()
    const [renewListing, { isSuccess: is_renewed, isLoading: is_renewing }] = useRenewListingMutation()

    const item = data?.data
    const is_mine = Boolean(current_user?._id && item?.user?._id) && String(item?.user?._id) === String(current_user._id)

    const phone_label = formatPhone(item?.user?.dialing_code, item?.user?.phone)
    const phone_url = phone_label ? `tel:${phone_label.replace(/[^\d+]/g, "")}` : null
    const email_url = item?.user?.email ? `mailto:${item.user.email}` : null

    useEffect(() => {
        if (is_deleted) {
            showInfoModal({
                title: "Listing Deleted",
                message: "Your listing has been deleted successfully.",
                onConfirm: () => goBack(),
            })
        }
    }, [is_deleted])

    useEffect(() => {
        if (is_toggled) {
            showInfoModal({
                title: "Listing Updated",
                message: toggle_data?.data?.active
                    ? "Your listing has been activated successfully."
                    : "Your listing has been deactivated successfully.",
            })
        }
    }, [is_toggled, toggle_data])

    useEffect(() => {
        if (is_renewed) {
            showInfoModal({
                title: "Listing Renewed",
                message: "Your listing has been renewed successfully.",
            })
        }
    }, [is_renewed])

    const onDelete = useCallback(async () => {

        if (!id) return

        const confirmed = await showConfirmModal({
            title: "Delete Listing",
            message: "Are you sure you want to delete this listing?",
        })

        if (confirmed) deleteListing(id)

    }, [id])

    const onToggleActive = useCallback(async () => {

        if (!id) return

        const confirmed = await showConfirmModal({
            title: item?.active ? "Deactivate Listing" : "Activate Listing",
            message: `Are you sure you want to ${item?.active ? "deactivate" : "activate"} this listing?`,
        })

        if (confirmed) toggleActive(id)

    }, [id, item])

    const onRenew = useCallback(async () => {

        if (!id) return

        const confirmed = await showConfirmModal({
            title: "Renew Listing",
            message: "Are you sure you want to renew this listing?",
        })

        if (confirmed) renewListing(id)

    }, [id])

    const onOpenLink = useCallback((url) => {
        if (!url) return
        Linking.openURL(url)
    }, [])

    const onEdit = useCallback(() => {
        if (!id) return
        navigate(ROUTES.CREATE_LISTING, { _id: id })
    }, [id])

    return {
        values: {
            data: item,
            is_mine,
            is_deleting,
            is_toggling,
            is_renewing,
            is_loading,
            is_error: isError || !id || (!item && !is_loading),
            phone_label,
            phone_url,
            email_url,
        },
        functions: {
            onOpenLink,
            onEdit,
            onRenew,
            onDelete,
            onToggleActive,
        },
    }
}

export default useMarketplaceDetailsController
