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
        registerFcmToken: builder.mutation({
            query: (body) => ({
                url: "/user/fcm-token",
                method: "POST",
                body,
            }),
        }),
        removeFcmToken: builder.mutation({
            query: (body) => ({
                url: "/user/fcm-token",
                method: "DELETE",
                body,
            }),
        }),
        getSavedBusinesses: builder.query({
            query: () => ({
                url: "/user/saved-businesses",
                method: "GET",
            }),
            providesTags: ["SavedBusinesses"],
        }),
        toggleSavedBusiness: builder.mutation({
            query: (id) => ({
                url: `/user/saved-business/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["SavedBusinesses"],
        }),
        getSavedJobs: builder.query({
            query: () => ({
                url: "/user/saved-jobs",
                method: "GET",
            }),
            providesTags: ["SavedJobs"],
        }),
        toggleSavedJob: builder.mutation({
            query: (id) => ({
                url: `/user/saved-job/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["SavedJobs"],
        }),
    }),
})

export const {
    useCompleteProfileMutation,
    useChangePasswordMutation,
    useEditProfileMutation,
    useRegisterFcmTokenMutation,
    useRemoveFcmTokenMutation,
    useGetSavedBusinessesQuery,
    useToggleSavedBusinessMutation,
    useGetSavedJobsQuery,
    useToggleSavedJobMutation,
} = userApi