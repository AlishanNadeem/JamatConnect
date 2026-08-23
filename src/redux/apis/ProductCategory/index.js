import { baseApi } from "../Base"

export const productCategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProductCategories: builder.query({
            query: (params) => ({
                url: "/product-category/lov",
                method: "GET",
                params,
            }),
            providesTags: ["ProductCategories"],
        }),
    }),
})

export const {
    useGetProductCategoriesQuery,
} = productCategoryApi
