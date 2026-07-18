import { NOTIFICATIONS } from "../../helpers/data"
import usePagination from "../../hooks/usePagination"

const useNotificationController = () => {

    const { data, refreshing, loading_more, resetPage, nextPage } = usePagination({ source: NOTIFICATIONS, page_size: 10 })

    return {
        values: {
            data,
            loading_more,
            refreshing
        },
        functions: {
            onRefresh: resetPage,
            onLoadMore: nextPage,
        }
    }
}

export default useNotificationController