import { useCallback } from "react"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import { useGetMyListingsQuery } from "../../redux/apis/Marketplace"

const useMyListingsController = () => {

    const { data, isLoading, isFetching, isError, refetch } = useGetMyListingsQuery()

    const onRefresh = useCallback(() => {
        refetch()
    }, [])

    const onAddListing = useCallback(() => {
        navigate(ROUTES.CREATE_LISTING)
    }, [])

    const onListingPress = useCallback((item) => {
        navigate(ROUTES.MARKETPLACE_DETAILS, { _id: item._id })
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
                    title: "No Listings Yet",
                    description: "Add your first listing to start selling in the community.",
                },
        },
        functions: {
            onRefresh,
            onAddListing,
            onListingPress,
        },
    }
}

export default useMyListingsController
