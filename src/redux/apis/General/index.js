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
    }),
})

export const {
    useGetDataQuery,
    useGetVersionQuery,
} = generalApi