import { REFERRAL_USERS } from "../../helpers/data"
import usePagination from "../../hooks/usePagination"

const useReferralUsersController = () => {

    const { data, refreshing, loading_more, resetPage, nextPage } = usePagination({
        source: REFERRAL_USERS,
        page_size: 10,
    })

    return {
        values: {
            data,
            refreshing,
            loading_more,
        },
        functions: {
            onRefresh: resetPage,
            onLoadMore: nextPage,
        },
    }
}

export default useReferralUsersController
