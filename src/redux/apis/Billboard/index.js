import { baseApi } from "../Base"

export const billboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getActiveBillboard: builder.query({
            query: () => ({
                url: "/billboard/active",
                method: "GET",
            }),
            providesTags: ["BillboardActive"],
        }),
        getActiveBillboards: builder.query({
            query: () => ({
                url: "/billboard/active-all",
                method: "GET",
            }),
            providesTags: ["BillboardActive"],
        }),
        getMyBillboard: builder.query({
            query: (params) => ({
                url: "/billboard/my",
                method: "GET",
                params,
            }),
            providesTags: ["MyBillboard"],
        }),
        claimBillboard: builder.mutation({
            query: (body) => ({
                url: "/billboard/claim",
                method: "POST",
                body,
            }),
            invalidatesTags: ["BillboardActive", "MyBillboard"],
        }),
    }),
})

export const {
    useGetActiveBillboardQuery,
    useGetActiveBillboardsQuery,
    useGetMyBillboardQuery,
    useClaimBillboardMutation,
} = billboardApi
