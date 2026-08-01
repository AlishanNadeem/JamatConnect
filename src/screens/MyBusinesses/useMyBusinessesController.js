import { useCallback } from "react"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import { useGetBusinessesQuery } from "../../redux/apis/Business"

const useMyBusinessesController = () => {

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

    const onAddBusiness = useCallback(() => {
        navigate(ROUTES.CREATE_BUSINESS)
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
        },
    }
}

export default useMyBusinessesController
