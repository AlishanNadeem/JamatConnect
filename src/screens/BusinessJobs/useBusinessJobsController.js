import { useRoute } from "@react-navigation/native"
import { useCallback, useMemo } from "react"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import useSearch from "../../hooks/useSearch"
import { useGetMyJobsQuery } from "../../redux/apis/Job"

const useBusinessJobsController = () => {

    const { params } = useRoute()
    const business_id = params?._id
    const { search, debounced, onChange } = useSearch()

    const query_params = useMemo(() => {
        const query = { business: business_id }
        if (debounced) query.search = debounced
        return query
    }, [business_id, debounced])

    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetMyJobsQuery(query_params, { skip: !business_id })

    const onRefresh = useCallback(() => {
        refetch()
    }, [refetch])

    const onJobPress = useCallback((item) => {
        if (!item?._id) return
        navigate(ROUTES.JOB_DETAILS, { _id: String(item._id) })
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
                        title: "No Results Found",
                        description: "Try a different search.",
                    }
                    : {
                        title: "No Jobs Yet",
                        description: "Jobs for this business will appear here.",
                    },
        },
        functions: {
            onRefresh,
            onSearchChange: onChange,
            onJobPress,
        },
    }
}

export default useBusinessJobsController
