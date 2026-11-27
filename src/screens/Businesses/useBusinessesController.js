import { useRoute } from "@react-navigation/native"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import useSearch from "../../hooks/useSearch"
import { useGetBusinessesQuery } from "../../redux/apis/Business"
import { useGetBusinessCategoriesQuery } from "../../redux/apis/BusinessCategory"
import { useToggleSavedBusinessMutation } from "../../redux/apis/User"
import { selectSavedBusinessIds } from "../../redux/selectors"
import { toggleSavedBusiness } from "../../redux/slices/general.slice"

const EMPTY_FILTERS = {
    category: "",
}

const useBusinessesController = () => {

    const { params } = useRoute()
    const { search, debounced, onChange } = useSearch()
    const [filters, setFilters] = useState(EMPTY_FILTERS)

    const dispatch = useDispatch()
    const saved_business_ids = useSelector(selectSavedBusinessIds)
    const [toggleSaved] = useToggleSavedBusinessMutation()

    const { data: categories_response, isLoading: categories_loading } = useGetBusinessCategoriesQuery()

    const category_options = useMemo(() =>
        (categories_response?.data ?? []).map((category) => ({
            label: category.name,
            value: String(category._id),
        })),
        [categories_response])

    const query_params = useMemo(() => {
        const query = {}
        if (debounced) query.search = debounced
        if (filters.category) query.category = filters.category
        return query
    }, [debounced, filters])

    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetBusinessesQuery(query_params)

    useEffect(() => {
        if (params?.category_id == null) return
        setFilters((current) => ({
            ...current,
            category: String(params.category_id),
        }))
    }, [params?.category_id])

    const has_filters = Boolean(debounced || filters.category)

    const onRefresh = useCallback(() => {
        refetch()
    }, [refetch])

    // Category pills under the search bar; "" means All.
    const onSelectCategory = useCallback((value) => {
        setFilters((current) => ({
            ...current,
            category: value ? String(value) : "",
        }))
    }, [])

    const onBusinessPress = useCallback((business) => {
        navigate(ROUTES.BUSINESS_DETAILS, { _id: business._id })
    }, [])

    const onToggleSave = useCallback((business) => {
        const id = String(business._id)
        dispatch(toggleSavedBusiness(id))
        toggleSaved(id).unwrap().catch(() => {
            dispatch(toggleSavedBusiness(id))
        })
    }, [dispatch, toggleSaved])

    return {
        values: {
            data: data?.data ?? [],
            search,
            filters,
            category_options,
            categories_loading,
            saved_business_ids,
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
                        title: "No Businesses Yet",
                        description: "Business listings will appear here.",
                    },
        },
        functions: {
            onRefresh,
            onSearchChange: onChange,
            onSelectCategory,
            onBusinessPress,
            onToggleSave,
        },
    }
}

export default useBusinessesController
