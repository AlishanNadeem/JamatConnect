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
    }),
})

export const {
    useCreateBusinessMutation,
    useGetMyBusinessesQuery,
    useGetBusinessesQuery,
    useGetBusinessByIdQuery,
} = businessApi
