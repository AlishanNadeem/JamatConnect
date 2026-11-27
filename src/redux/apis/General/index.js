import { baseApi } from "../Base"

export const generalApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getData: builder.query({
            query: (params) => ({
                url: "/general/get-data",
                method: "GET",
                params
            }),
        }),
        getVersion: builder.query({
            query: (params) => ({
                url: "/general/version",
                method: "GET"
            }),
        }),
        getHomeCounts: builder.query({
            query: () => ({
                url: "/general/home-counts",
                method: "GET"
            }),
            providesTags: ["HomeCounts"],
        }),
    }),
})

export const {
    useGetDataQuery,
    useGetVersionQuery,
    useGetHomeCountsQuery,
} = generalApi