import { baseApi } from "../Base"

export const specialApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createSpecial: builder.mutation({
            query: (body) => ({
                url: "/special/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Specials", "FeaturedSpecials"],
        }),
        getFeaturedSpecials: builder.query({
            query: (params) => ({
                url: "/special/featured",
                method: "GET",
                params,
            }),
            providesTags: ["FeaturedSpecials"],
        }),
        getSpecials: builder.query({
            query: (params) => ({
                url: "/special/get",
                method: "GET",
                params,
            }),
            providesTags: ["Specials"],
        }),
        getSpecialById: builder.query({
            query: (id) => ({
                url: `/special/get/${id}`,
                method: "GET",
            }),
            providesTags: ["Specials"],
        }),
        getMyVoucher: builder.query({
            query: (id) => ({
                url: `/special/voucher/${id}`,
                method: "GET",
            }),
            providesTags: ["Vouchers"],
        }),
        getRedeemedList: builder.query({
            query: ({ id, ...params }) => ({
                url: `/special/redeemed/${id}`,
                method: "GET",
                params,
            }),
            providesTags: ["RedeemedList"],
        }),
        redeemSpecial: builder.mutation({
            query: (id) => ({
                url: `/special/redeem/${id}`,
                method: "POST",
            }),
            invalidatesTags: ["Vouchers", "Specials"],
        }),
        verifySpecialCode: builder.mutation({
            query: (body) => ({
                url: "/special/verify",
                method: "POST",
                body,
            }),
        }),
        confirmSpecialRedemption: builder.mutation({
            query: (body) => ({
                url: "/special/confirm",
                method: "POST",
                body,
            }),
            invalidatesTags: ["RedeemedList", "Vouchers", "Specials"],
        }),
        toggleSpecialActive: builder.mutation({
            query: (id) => ({
                url: `/special/toggle-active/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Specials", "FeaturedSpecials"],
        }),
    }),
})

export const {
    useCreateSpecialMutation,
    useGetFeaturedSpecialsQuery,
    useGetSpecialsQuery,
    useGetSpecialByIdQuery,
    useGetMyVoucherQuery,
    useGetRedeemedListQuery,
    useRedeemSpecialMutation,
    useVerifySpecialCodeMutation,
    useConfirmSpecialRedemptionMutation,
    useToggleSpecialActiveMutation,
} = specialApi
