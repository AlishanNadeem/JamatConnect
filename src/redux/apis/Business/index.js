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
                url: "/business/my-businesses",
                method: "GET",
                params,
            }),
            providesTags: ["MyBusinesses"],
        }),
    }),
})

export const {
    useCreateBusinessMutation,
    useGetMyBusinessesQuery,
} = businessApi
