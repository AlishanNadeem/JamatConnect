import { useCallback, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import useSearch from "../../hooks/useSearch"
import useToggle from "../../hooks/useToggle"
import { useGetJobsQuery } from "../../redux/apis/Job"
import { selectEmploymentTypes, selectWorkplaceTypes } from "../../redux/selectors"

const EMPTY_FILTERS = {
    employment_type: "",
    workplace_type: "",
}

const useJobsController = () => {

    const { search, debounced, onChange } = useSearch()
    const { value: filters_visible, set: setFiltersVisible } = useToggle()
    const [filters, setFilters] = useState(EMPTY_FILTERS)
    const employment_type_options = useSelector(selectEmploymentTypes)
    const workplace_type_options = useSelector(selectWorkplaceTypes)

    const query_params = useMemo(() => {
        const query = {}
        if (debounced) query.search = debounced
        if (filters.employment_type) query.employment_type = filters.employment_type
        if (filters.workplace_type) query.workplace_type = filters.workplace_type
        return query
    }, [debounced, filters])

    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetJobsQuery(query_params)

    const has_active_filters = Boolean(filters.employment_type || filters.workplace_type)
    const has_filters = Boolean(debounced || has_active_filters)

    const onRefresh = useCallback(() => {
        refetch()
    }, [refetch])

    const onOpenFilters = useCallback(() => {
        setFiltersVisible(true)
    }, [])

    const onCloseFilters = useCallback(() => {
        setFiltersVisible(false)
    }, [])

    const onApplyFilters = useCallback((next_filters) => {
        setFilters({
            employment_type: next_filters?.employment_type ? String(next_filters.employment_type) : "",
            workplace_type: next_filters?.workplace_type ? String(next_filters.workplace_type) : "",
        })
    }, [])

    const onResetFilters = useCallback(() => {
        setFilters(EMPTY_FILTERS)
    }, [])

    const onJobPress = useCallback((item) => {
        navigate(ROUTES.JOB_DETAILS, { _id: String(item._id) })
    }, [])

    return {
        values: {
            data: data?.data ?? [],
            search,
            filters,
            filters_visible,
            has_active_filters,
            employment_type_options,
            workplace_type_options,
            is_loading: isLoading,
            refreshing: isFetching,
            loading_more: false,
            empty: isError
                ? {
                    title: "Something Went Wrong",
                    description: "Pull to refresh and try again.",
                }
                : has_filters
                    ? {
                        title: "No Results Found",
                        description: "Try a different search or filter.",
                    }
                    : {
                        title: "No Jobs Yet",
                        description: "Job listings will appear here.",
                    },
        },
        functions: {
            onRefresh,
            onSearchChange: onChange,
            onOpenFilters,
            onCloseFilters,
            onApplyFilters,
            onResetFilters,
            onJobPress,
        },
    }
}

export default useJobsController
