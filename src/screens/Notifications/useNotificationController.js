import { useCallback, useState } from "react"
import {
    useGetNotificationsQuery,
    useMarkNotificationAsReadMutation,
} from "../../redux/apis/Notification"

const useNotificationController = () => {

    const [refreshing, setRefreshing] = useState(false)

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useGetNotificationsQuery()

    const [markAsRead] = useMarkNotificationAsReadMutation()

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        try {
            await refetch()
        } finally {
            setRefreshing(false)
        }
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
            refreshing,
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
