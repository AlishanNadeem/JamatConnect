import { useCallback } from "react"
import { Share } from "react-native"
import { APP_NAME } from "../../config/env"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import { useGetReferredUsersQuery } from "../../redux/apis/Referral"

const REFERRAL_LINK = "https://jamatconnect.com/invite/lewis-hilton"

const useReferralsController = () => {

    const { data, isLoading } = useGetReferredUsersQuery()

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
            total_referrals: data?.pagination?.total ?? 0,
            is_loading: isLoading,
        },
        functions: {
            onShare,
            onViewReferrals,
        },
    }
}

export default useReferralsController
