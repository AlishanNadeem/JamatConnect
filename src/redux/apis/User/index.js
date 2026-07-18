import { baseApi } from "../Base"

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        completeProfile: builder.mutation({
            query: (body) => ({
                url: "/user/complete-profile",
                method: "POST",
                body
            }),
        }),
        changePassword: builder.mutation({
            query: (body) => ({
                url: "/user/change-password",
                method: "POST",
                body
            }),
        }),
        editProfile: builder.mutation({
            query: (body) => ({
                url: "/user/update",
                method: "PATCH",
                body
            }),
        }),
    }),
})

export const {
    useCompleteProfileMutation,
    useChangePasswordMutation,
    useEditProfileMutation
} = userApi