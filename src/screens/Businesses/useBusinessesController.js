import { useRoute } from "@react-navigation/native"
import { useCallback, useEffect, useMemo, useState } from "react"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import useSearch from "../../hooks/useSearch"
import { useGetBusinessesQuery } from "../../redux/apis/Business"
import { useGetBusinessCategoriesQuery } from "../../redux/apis/BusinessCategory"

const useBusinessesController = () => {

    const { params } = useRoute()
    const { search, debounced, onChange } = useSearch()
    const [selected_category, setSelectedCategory] = useState("")

    const { data: categories_response, isLoading: categories_loading } = useGetBusinessCategoriesQuery()

    const categories = categories_response?.data ?? []

    const category_options = useMemo(() =>
        categories.map((category) => ({
            label: category.name,
            value: String(category._id),
        })),
        [categories])

    const query_params = useMemo(() => {
        const query = {}
        if (debounced) query.search = debounced
        if (selected_category) query.category = selected_category
        return query
    }, [debounced, selected_category])

    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetBusinessesQuery(query_params)

    useEffect(() => {
        if (params?.category == null) return
        setSelectedCategory(String(params.category))
    }, [params?.category_id])

    const onRefresh = useCallback(() => {
        refetch()
    }, [refetch])

    const onCategoryChange = useCallback((option) => {
        setSelectedCategory(option?.value ? String(option.value) : "")
    }, [])

    const onBusinessPress = useCallback((business) => {
        navigate(ROUTES.BUSINESS_DETAILS, { business })
    }, [])

    const has_filters = Boolean(debounced || selected_category)

    return {
        values: {
            data: data?.data ?? [],
            search,
            selected_category,
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
                        description: "Try a different search or category.",
                    }
                    : {
                        title: "No Businesses Yet",
                        description: "Business listings will appear here.",
                    },
        },
        functions: {
            onRefresh,
            onSearchChange: onChange,
            onCategoryChange,
            onBusinessPress,
        },
    }
}

export default useBusinessesController
