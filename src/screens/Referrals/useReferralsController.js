import { useCallback } from "react"
import { Share } from "react-native"
import { APP_NAME } from "../../config/env"

const REFERRAL_LINK = "https://jamatconnect.com/invite/lewis-hilton"

const useReferralsController = () => {

    const onShare = useCallback(async () => {
        await Share.share({
            message: `Join me on ${APP_NAME}: ${REFERRAL_LINK}`,
            url: REFERRAL_LINK,
        })
    }, [])

    return {
        values: {
            total_referrals: 0,
        },
        functions: {
            onShare,
        },
    }
}

export default useReferralsController
