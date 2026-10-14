import { useRoute } from "@react-navigation/native"
import { useGetBusinessReviewsQuery } from "../../redux/apis/Business"

const useBusinessReviewsController = () => {

    const { params } = useRoute()
    const id = params?._id

    const {
        data,
        isLoading,
        isError,
        isFetching,
        refetch,
    } = useGetBusinessReviewsQuery(
        { id, page: 1, page_size: 50 },
        { skip: !id },
    )

    const reviews = data?.data ?? []
    const review_count = data?.meta?.review_count ?? reviews.length
    const rating_average = Number(data?.meta?.average_rating || 0).toFixed(1)

    return {
        values: {
            data: reviews,
            rating_average,
            review_count,
            is_loading: isLoading,
            is_error: isError || !id,
            refreshing: isFetching && !isLoading,
            empty: {
                title: "No Reviews Yet",
                description: "Reviews for this business will appear here after customers scan the review QR.",
            },
        },
        functions: {
            refetch,
        },
    }
}

export default useBusinessReviewsController
