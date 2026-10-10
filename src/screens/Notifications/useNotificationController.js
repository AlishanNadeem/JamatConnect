import { useCallback } from "react"
import {
    useGetNotificationsQuery,
    useMarkNotificationAsReadMutation,
} from "../../redux/apis/Notification"

const useNotificationController = () => {

    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetNotificationsQuery()

    const [markAsRead] = useMarkNotificationAsReadMutation()

    const onRefresh = useCallback(() => {
        refetch()
    }, [refetch])

    const onPressNotification = useCallback(async (item) => {
        if (!item?._id || item?.is_read) return

        try {
            await markAsRead(item._id).unwrap()
        } catch { }
    }, [markAsRead])

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
                    title: "You're all caught up",
                    description: "New updates about referrals, jobs, and listings will show up here.",
                },
        },
        functions: {
            onRefresh,
            onLoadMore: () => {},
            onPressNotification,
        },
    }
}

export default useNotificationController
