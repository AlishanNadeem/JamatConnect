import { baseApi } from "../Base"

export const notificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getNotifications: builder.query({
            query: (params) => ({
                url: "/notification/get",
                method: "GET",
                params,
            }),
            providesTags: ["Notifications"],
        }),
        getUnreadNotificationCount: builder.query({
            query: () => ({
                url: "/notification/get-unread-count",
                method: "GET",
            }),
            providesTags: ["NotificationUnreadCount"],
        }),
        markNotificationAsRead: builder.mutation({
            query: (id) => ({
                url: `/notification/read/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Notifications", "NotificationUnreadCount"],
        }),
        markAllNotificationsAsRead: builder.mutation({
            query: () => ({
                url: "/notification/mark-all-as-read",
                method: "PATCH",
            }),
            invalidatesTags: ["Notifications", "NotificationUnreadCount"],
        }),
        deleteNotification: builder.mutation({
            query: (id) => ({
                url: `/notification/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Notifications", "NotificationUnreadCount"],
        }),
    }),
})

export const {
    useGetNotificationsQuery,
    useGetUnreadNotificationCountQuery,
    useMarkNotificationAsReadMutation,
    useMarkAllNotificationsAsReadMutation,
    useDeleteNotificationMutation,
} = notificationApi
