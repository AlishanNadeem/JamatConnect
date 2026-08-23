import { useCallback, useMemo, useState } from "react"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import useSearch from "../../hooks/useSearch"
import useToggle from "../../hooks/useToggle"
import { useGetListingsQuery } from "../../redux/apis/Marketplace"
import { useGetProductCategoriesQuery } from "../../redux/apis/ProductCategory"

const EMPTY_FILTERS = {
    category: "",
    min_price: "",
    max_price: "",
}

const useMarketplaceController = () => {

    const { search, debounced, onChange } = useSearch()
    const { value: filters_visible, set: setFiltersVisible } = useToggle()
    const [filters, setFilters] = useState(EMPTY_FILTERS)

    const {
        data: categories_response,
        isLoading: categories_loading,
    } = useGetProductCategoriesQuery()

    const category_options = categories_response?.data ?? []

    const query_params = useMemo(() => {
        const query = {}
        if (debounced) query.search = debounced
        if (filters.category) query.category = filters.category

        const parsed_min = Number(filters.min_price)
        if (filters.min_price !== "" && !Number.isNaN(parsed_min)) {
            query.min_price = parsed_min
        }

        const parsed_max = Number(filters.max_price)
        if (filters.max_price !== "" && !Number.isNaN(parsed_max)) {
            query.max_price = parsed_max
        }

        return query
    }, [debounced, filters])

    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetListingsQuery(query_params)

    const has_active_filters = Boolean(
        filters.category ||
        filters.min_price ||
        filters.max_price,
    )

    const has_filters = Boolean(debounced || has_active_filters)

    const onRefresh = useCallback(() => {
        refetch()
    }, [refetch])

    const onOpenFilters = useCallback(() => {
        setFiltersVisible(true)
    }, [setFiltersVisible])

    const onCloseFilters = useCallback(() => {
        setFiltersVisible(false)
    }, [setFiltersVisible])

    const onApplyFilters = useCallback((next_filters) => {
        setFilters({
            category: next_filters?.category ? String(next_filters.category) : "",
            min_price: next_filters?.min_price ?? "",
            max_price: next_filters?.max_price ?? "",
        })
    }, [])

    const onResetFilters = useCallback(() => {
        setFilters(EMPTY_FILTERS)
    }, [])

    const onListingPress = useCallback((item) => {
        navigate(ROUTES.MARKETPLACE_DETAILS, { _id: item._id })
    }, [])

    return {
        values: {
            data: data?.data ?? [],
            search,
            filters,
            filters_visible,
            has_active_filters,
            category_options,
            categories_loading,
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
                        title: "No Listings Yet",
                        description: "Marketplace items will appear here.",
                    },
        },
        functions: {
            onRefresh,
            onSearchChange: onChange,
            onOpenFilters,
            onCloseFilters,
            onApplyFilters,
            onResetFilters,
            onListingPress,
        },
    }
}

export default useMarketplaceController
