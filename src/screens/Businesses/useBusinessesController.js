import { useCallback } from "react"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import { useGetBusinessesQuery } from "../../redux/apis/Business"

const useBusinessesController = () => {

    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetBusinessesQuery()

    const onRefresh = useCallback(() => {
        refetch()
    }, [])

    const onBusinessPress = useCallback((business) => {
        navigate(ROUTES.BUSINESS_DETAILS, { business })
    }, [])

    return {
        values: {
            data: data?.data ?? [],
            is_loading: isLoading,
            refreshing: isFetching,
            loading_more: false,
            empty: isError
                ? {
                    title: "Something Went Wrong",
                    description: "Pull to refresh and try again.",
                }
                : {
                    title: "No Businesses Yet",
                    description: "Business listings will appear here.",
                },
        },
        functions: {
            onRefresh,
            onBusinessPress,
        },
    }
}

export default useBusinessesController
