import { useCallback } from "react"
import { navigate } from "../../helpers/navigation"
import { NAVIGATORS, ROUTES } from "../../helpers/routes"
import { useGetBusinessCategoriesQuery } from "../../redux/apis/BusinessCategory"

const useCategoriesController = () => {

    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetBusinessCategoriesQuery()

    const onRefresh = useCallback(() => {
        refetch()
    }, [])

    const onCategoryPress = useCallback((category) => {
        navigate(NAVIGATORS.BOTTOM, {
            screen: ROUTES.BUSINESSES,
            params: {
                category_id: category?.id ?? category?._id,
            },
        })
    }, [])

    return {
        values: {
            data: data?.data ?? [],
            is_loading: isLoading,
            refreshing: isFetching,
            empty: isError
                ? {
                    title: "Something Went Wrong",
                    description: "Pull to refresh and try again.",
                }
                : {
                    title: "No Categories Yet",
                    description: "Business categories will appear here.",
                },
        },
        functions: {
            onRefresh,
            onCategoryPress,
        },
    }
}

export default useCategoriesController
