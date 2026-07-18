import { useCallback } from "react"
import { Share } from "react-native"
import { APP_NAME } from "../../config/env"
import { REFERRAL_USERS } from "../../helpers/data"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"

const REFERRAL_LINK = "https://jamatconnect.com/invite/lewis-hilton"

const useReferralsController = () => {

    const onShare = useCallback(async () => {
        await Share.share({
            message: `Join me on ${APP_NAME}: ${REFERRAL_LINK}`,
            url: REFERRAL_LINK,
        })
    }, [])

    const onViewReferrals = useCallback(() => {
        navigate(ROUTES.REFERRAL_USERS)
    }, [])

    return {
        values: {
            total_referrals: REFERRAL_USERS.length,
        },
        functions: {
            onShare,
            onViewReferrals,
        },
    }
}

export default useReferralsController
