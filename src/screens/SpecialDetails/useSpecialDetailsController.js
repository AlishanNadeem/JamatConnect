import { useRoute } from "@react-navigation/native"
import { useCallback, useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import { useModal } from "../../contexts/ModalContext"
import { formatDate } from "../../helpers/date"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import {
    useGetSpecialByIdQuery,
    useRedeemSpecialMutation,
} from "../../redux/apis/Special"
import { selectUser } from "../../redux/selectors"

const useSpecialDetailsController = () => {
    const { params } = useRoute()
    const id = params?._id
    const current_user = useSelector(selectUser)
    const { showInfoModal, showConfirmModal } = useModal()

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useGetSpecialByIdQuery(id, { skip: !id })

    const [redeem, { data: redeem_data, isSuccess: is_redeemed, isLoading: is_redeeming, error: redeem_error }] = useRedeemSpecialMutation()

    const special = data?.data
    const business = special?.business
    const my_redemption = special?.my_redemption

    const is_mine = Boolean(
        current_user?._id
        && business?.user
        && String(business.user) === String(current_user._id)
    )

    const is_available = Boolean(special?.is_active) && !special?.is_expired

    const expires_label = useMemo(() => {
        if (!special?.expires_at) return null
        return `Ends ${formatDate(special.expires_at)}`
    }, [special?.expires_at])

    useEffect(() => {
        if (!is_redeemed || !redeem_data?.data) return

        navigate(ROUTES.REDEEM_SUCCESS, {
            code: redeem_data.data.code,
            special_title: special?.title,
            business_name: business?.name,
            discount: special?.discount,
            expires_at: redeem_data.data.expires_at || special?.expires_at,
        })
    }, [is_redeemed, redeem_data, special, business])

    useEffect(() => {
        if (!redeem_error) return
        const message = redeem_error?.data?.message || "Unable to redeem this special."
        showInfoModal({
            title: "Redeem Failed",
            message,
        })
    }, [redeem_error, showInfoModal])

    const onViewBusiness = useCallback(() => {
        if (!business?._id) return
        navigate(ROUTES.BUSINESS_DETAILS, { _id: String(business._id) })
    }, [business])

    const onRedeem = useCallback(async () => {
        if (!id || is_mine || !is_available) return

        if (my_redemption?.code) {
            navigate(ROUTES.REDEEM_SUCCESS, {
                code: my_redemption.code,
                special_title: special?.title,
                business_name: business?.name,
                discount: special?.discount,
                expires_at: my_redemption.expires_at || special?.expires_at,
                status: my_redemption.status,
            })
            return
        }

        const confirmed = await showConfirmModal({
            title: "Redeem Special",
            message: "Generate a one-time code to show at the business?",
        })

        if (confirmed) redeem(id)
    }, [
        id,
        is_mine,
        is_available,
        my_redemption,
        special,
        business,
        showConfirmModal,
        redeem,
    ])

    return {
        values: {
            data: special,
            business,
            my_redemption,
            is_mine,
            is_available,
            expires_label,
            is_loading: isLoading,
            is_error: isError || !id,
            is_redeeming,
        },
        functions: {
            onViewBusiness,
            onRedeem,
            onRefresh: refetch,
        },
    }
}

export default useSpecialDetailsController
