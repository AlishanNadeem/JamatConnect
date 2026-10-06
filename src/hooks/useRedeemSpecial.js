import { useCallback, useState } from "react"
import { useModal } from "../contexts/ModalContext"
import { navigate } from "../helpers/navigation"
import { ROUTES } from "../helpers/routes"
import { useRedeemSpecialMutation } from "../redux/apis/Special"

const useRedeemSpecial = () => {
    const { showConfirmModal, showInfoModal } = useModal()
    const [redeem] = useRedeemSpecialMutation()
    const [redeeming_id, setRedeemingId] = useState(null)

    const onRedeem = useCallback(async (special) => {
        if (!special?._id) return

        const confirmed = await showConfirmModal({
            title: "Redeem Special",
            message: "Code valid for 3 days. You can only redeem once.",
        })

        if (!confirmed) return

        setRedeemingId(String(special._id))

        try {
            await redeem(special._id).unwrap()
            navigate(ROUTES.SPECIAL_VOUCHER, { special_id: String(special._id) })
        } catch (error) {
            const status = error?.data?.data?.status
            if (status === "used" || status === "expired") {
                navigate(ROUTES.SPECIAL_VOUCHER, { special_id: String(special._id) })
                return
            }
            showInfoModal({
                title: "Unable to Redeem",
                message: error?.data?.message || "Something went wrong.",
            })
        } finally {
            setRedeemingId(null)
        }
    }, [redeem, showConfirmModal, showInfoModal])

    return {
        redeeming_id,
        onRedeem,
    }
}

export default useRedeemSpecial
