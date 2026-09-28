import { BUSINESS_REVIEWS } from "../../helpers/data"

const useBusinessReviewsController = () => {

    const reviews = BUSINESS_REVIEWS
    const rating_average = reviews.length
        ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
        : "0.0"

    return {
        values: {
            data: reviews,
            rating_average,
            review_count: reviews.length,
            empty: {
                title: "No Reviews Yet",
                description: "Reviews for this business will appear here.",
            },
        },
    }
}

export default useBusinessReviewsController
