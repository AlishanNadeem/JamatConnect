import { useCallback } from "react"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import { useGetMyBusinessesQuery } from "../../redux/apis/Business"

const useMyBusinessesController = () => {

    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetMyBusinessesQuery()

    const onRefresh = useCallback(() => {
        refetch()
    }, [])

    const onAddBusiness = useCallback(() => {
        navigate(ROUTES.CREATE_BUSINESS)
    }, [])

    const onBusinessPress = useCallback((business) => {
        navigate(ROUTES.MY_BUSINESS_DETAILS, { _id: business._id })
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
                    description: "Add your first business to start reaching the community.",
                },
        },
        functions: {
            onRefresh,
            onAddBusiness,
            onBusinessPress,
        },
    }
}

export default useMyBusinessesController
