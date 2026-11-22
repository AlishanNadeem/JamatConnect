import { useCallback, useMemo } from "react"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import useSearch from "../../hooks/useSearch"
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

    const onRefresh = useCallback(() => {
        refetch()
    }, [refetch])

    const onSpecialPress = useCallback((item) => {
        navigate(ROUTES.SPECIAL_DETAILS, { _id: String(item._id) })
    }, [])

    return {
        values: {
            data: data?.data ?? [],
            search,
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
        },
    }
}

export default useSpecialsController
