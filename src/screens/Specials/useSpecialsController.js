import { useCallback, useMemo } from "react"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import useSearch from "../../hooks/useSearch"
import { useGetActiveBillboardsQuery } from "../../redux/apis/Billboard"
import { useGetSpecialsQuery } from "../../redux/apis/Special"

const useSpecialsController = () => {
    const { search, debounced, onChange } = useSearch()

    const query_params = useMemo(() => {
        const query = {}
        if (debounced) query.search = debounced
        return query
    }, [debounced])

    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetSpecialsQuery(query_params)

    const {
        data: billboards_response,
        refetch: refetch_billboards,
    } = useGetActiveBillboardsQuery()

    const billboards = useMemo(
        () => (billboards_response?.data ?? []).filter((slot) => slot?.special),
        [billboards_response],
    )

    const onRefresh = useCallback(() => {
        refetch()
        refetch_billboards()
    }, [refetch, refetch_billboards])

    const onBillboardPress = useCallback((slot) => {
        const special_id = slot?.special?._id
        if (!special_id) return
        navigate(ROUTES.SPECIAL_DETAILS, { _id: String(special_id) })
    }, [])

    const onSpecialPress = useCallback((item) => {
        navigate(ROUTES.SPECIAL_DETAILS, { _id: String(item._id) })
    }, [])

    return {
        values: {
            data: data?.data ?? [],
            search,
            billboards,
            is_loading: isLoading,
            refreshing: isFetching,
            loading_more: false,
            empty: isError
                ? {
                    title: "Something Went Wrong",
                    description: "Pull to refresh and try again.",
                }
                : debounced
                    ? {
                        title: "No Specials Found",
                        description: "Try a different search.",
                    }
                    : {
                        title: "No Specials Yet",
                        description: "Deals from community businesses will show up here.",
                    },
        },
        functions: {
            onSearchChange: onChange,
            onRefresh,
            onSpecialPress,
            onBillboardPress,
        },
    }
}

export default useSpecialsController
