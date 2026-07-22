import { useCallback } from "react"
import { useGetReferredUsersQuery } from "../../redux/apis/Referral"

const useReferralUsersController = () => {

    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetReferredUsersQuery()

    const onRefresh = useCallback(() => {
        refetch()
    }, [refetch])

    return {
        values: {
            data: data?.data ?? [],
            is_loading: isLoading,
            refreshing: isFetching,
            loading_more: false,
            empty: isError
                ? {
                    title: "Something Went Wrong",
                    description: "Pull to refresh and try again.",
                }
                : {
                    title: "No Referrals Yet",
                    description: "Users who join through your link will appear here.",
                },
        },
        functions: {
            onRefresh,
            onLoadMore: () => {},
        },
    }
}

export default useReferralUsersController
