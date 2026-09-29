import { useCallback } from "react"
import { Platform, Share } from "react-native"
import { useSelector } from "react-redux"
import { APP_NAME } from "../../config/env"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import { useGetReferredUsersQuery } from "../../redux/apis/Referral"
import { selectUser } from "../../redux/selectors"

const INVITE_MESSAGE = `Come join on ${APP_NAME} — find trusted businesses, jobs, and deals in our community.`

const useReferralsController = () => {

    const user = useSelector(selectUser)
    const referral_link = user?.referral_link

    const { data, isLoading } = useGetReferredUsersQuery()

    const onShare = useCallback(async () => {

        if (!referral_link) return

        await Share.share(
            Platform.select({
                ios: {
                    message: INVITE_MESSAGE,
                    url: referral_link,
                },
                default: {
                    message: `${INVITE_MESSAGE}\n\n${referral_link}`,
                    title: `Join on ${APP_NAME}`,
                },
            })
        )

    }, [referral_link])

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
