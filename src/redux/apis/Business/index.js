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
        getBusinesses: builder.query({
            query: (params) => ({
                url: "/business/get",
                method: "GET",
                params,
            }),
            providesTags: ["MyBusinesses"],
        }),
    }),
})

export const {
    useCreateBusinessMutation,
    useGetBusinessesQuery,
} = businessApi
