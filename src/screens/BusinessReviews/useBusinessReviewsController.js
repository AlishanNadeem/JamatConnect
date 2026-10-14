const useBusinessReviewsController = () => {
    return {
        values: {
            data: [],
            rating_average: "0.0",
            review_count: 0,
            empty: {
                title: "No Reviews Yet",
                description: "Reviews for this business will appear here.",
            },
        },
    }
}

export default useBusinessReviewsController
