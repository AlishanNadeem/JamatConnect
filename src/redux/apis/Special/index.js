import { baseApi } from "../Base"

export const specialApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createSpecial: builder.mutation({
            query: (body) => ({
                url: "/special/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Specials", "MySpecials", "BusinessSpecials", "SpecialDetails"],
        }),
        getSpecials: builder.query({
            query: (params) => ({
                url: "/special/get",
                method: "GET",
                params,
            }),
            providesTags: ["Specials"],
        }),
        getMySpecials: builder.query({
            query: (params) => ({
                url: "/special/my",
                method: "GET",
                params,
            }),
            providesTags: ["MySpecials"],
        }),
        getBusinessSpecials: builder.query({
            query: ({ id, ...params }) => ({
                url: `/special/business/${id}`,
                method: "GET",
                params,
            }),
            providesTags: ["BusinessSpecials"],
        }),
        getSpecialById: builder.query({
            query: (id) => ({
                url: `/special/get/${id}`,
                method: "GET",
            }),
            providesTags: ["SpecialDetails"],
        }),
        updateSpecial: builder.mutation({
            query: ({ id, body }) => ({
                url: `/special/update/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Specials", "MySpecials", "BusinessSpecials", "SpecialDetails"],
        }),
        deleteSpecial: builder.mutation({
            query: (id) => ({
                url: `/special/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Specials", "MySpecials", "BusinessSpecials", "SpecialDetails"],
        }),
        toggleSpecialActive: builder.mutation({
            query: (id) => ({
                url: `/special/toggle-active/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Specials", "MySpecials", "BusinessSpecials", "SpecialDetails"],
        }),
        redeemSpecial: builder.mutation({
            query: (id) => ({
                url: `/special/redeem/${id}`,
                method: "POST",
            }),
            invalidatesTags: ["SpecialDetails", "MyRedemptions"],
        }),
        getMyRedemptions: builder.query({
            query: (params) => ({
                url: "/special/my-redemptions",
                method: "GET",
                params,
            }),
            providesTags: ["MyRedemptions"],
        }),
        useRedemptionCode: builder.mutation({
            query: (code) => ({
                url: `/special/redemption/${code}/use`,
                method: "PATCH",
            }),
            invalidatesTags: ["MyRedemptions", "SpecialDetails"],
        }),
    }),
})

export const {
    useCreateSpecialMutation,
    useGetSpecialsQuery,
    useGetMySpecialsQuery,
    useGetBusinessSpecialsQuery,
    useGetSpecialByIdQuery,
    useUpdateSpecialMutation,
    useDeleteSpecialMutation,
    useToggleSpecialActiveMutation,
    useRedeemSpecialMutation,
    useGetMyRedemptionsQuery,
    useUseRedemptionCodeMutation,
} = specialApi
