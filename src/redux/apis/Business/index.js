import { baseApi } from "../Base"

export const businessApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBusiness: builder.mutation({
            query: (body) => ({
                url: "/business/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["MyBusinesses"],
        }),
        getMyBusinesses: builder.query({
            query: (params) => ({
                url: "/business/my",
                method: "GET",
                params,
            }),
            providesTags: ["MyBusinesses"],
        }),
        getBusinesses: builder.query({
            query: (params) => ({
                url: "/business/get",
                method: "GET",
                params,
            }),
            providesTags: ["Businesses"],
        }),
        getBusinessById: builder.query({
            query: (arg) => {

                const id = typeof arg === "object" && arg !== null ? arg.id : arg

                const params = typeof arg === "object" && arg !== null
                    ? {
                        ...(arg.jobs !== undefined && { jobs: arg.jobs }),
                        ...(arg.reviews !== undefined && { reviews: arg.reviews }),
                    }
                    : undefined

                return {
                    url: `/business/get/${id}`,
                    method: "GET",
                    params,
                }

            },
            providesTags: ["Businesses"],
        }),
        getBusinessReviews: builder.query({
            query: (arg) => {
                const id = typeof arg === "object" && arg !== null ? arg.id : arg
                const params = typeof arg === "object" && arg !== null
                    ? {
                        ...(arg.page !== undefined && { page: arg.page }),
                        ...(arg.page_size !== undefined && { page_size: arg.page_size }),
                    }
                    : undefined

                return {
                    url: `/business/reviews/${id}`,
                    method: "GET",
                    params,
                }
            },
            providesTags: ["BusinessReviews"],
        }),
        getBusinessReviewQr: builder.query({
            query: (id) => ({
                url: `/business/review-qr/${id}`,
                method: "GET",
            }),
        }),
        getReviewContext: builder.query({
            query: (token) => ({
                url: `/business/review-context/${token}`,
                method: "GET",
            }),
            providesTags: ["ReviewContext"],
        }),
        upsertBusinessReview: builder.mutation({
            query: ({ token, body }) => ({
                url: `/business/review/${token}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Businesses", "BusinessReviews", "MyBusinesses", "ReviewContext"],
        }),
        updateBusiness: builder.mutation({
            query: ({ id, body }) => ({
                url: `/business/update/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["MyBusinesses", "Businesses"],
        }),
        toggleBusinessActive: builder.mutation({
            query: (id) => ({
                url: `/business/toggle-active/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["MyBusinesses", "Businesses"],
        }),
        recordBusinessView: builder.mutation({
            query: (id) => ({
                url: `/business/view/${id}`,
                method: "POST",
            }),
        }),
    }),
})

export const {
    useCreateBusinessMutation,
    useUpdateBusinessMutation,
    useToggleBusinessActiveMutation,
    useRecordBusinessViewMutation,
    useGetMyBusinessesQuery,
    useGetBusinessesQuery,
    useGetBusinessByIdQuery,
    useGetBusinessReviewsQuery,
    useGetBusinessReviewQrQuery,
    useGetReviewContextQuery,
    useUpsertBusinessReviewMutation,
} = businessApi
