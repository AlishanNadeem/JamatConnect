import { baseApi } from "../Base"

export const businessCategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBusinessCategories: builder.query({
            query: (params) => ({
                url: "/business-category/get",
                method: "GET",
                params,
            }),
            providesTags: ["BusinessCategories"],
        }),
    }),
})

export const {
    useGetBusinessCategoriesQuery,
} = businessCategoryApi
