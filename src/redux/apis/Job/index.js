import { baseApi } from "../Base"

export const jobApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createJob: builder.mutation({
            query: (body) => ({
                url: "/job/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Jobs", "MyJobs"],
        }),
        getJobs: builder.query({
            query: (params) => ({
                url: "/job/get",
                method: "GET",
                params,
            }),
            providesTags: ["Jobs"],
        }),
        getMyJobs: builder.query({
            query: (params) => ({
                url: "/job/my",
                method: "GET",
                params,
            }),
            providesTags: ["MyJobs"],
        }),
        getJobById: builder.query({
            query: (arg) => {
                const id = typeof arg === "object" && arg !== null ? arg.id : arg
                const params = typeof arg === "object" && arg !== null
                    ? { show_similar_jobs: arg.show_similar_jobs }
                    : undefined

                return {
                    url: `/job/get/${id}`,
                    method: "GET",
                    params,
                }
            },
            providesTags: ["Jobs"],
        }),
        updateJob: builder.mutation({
            query: ({ id, body }) => ({
                url: `/job/update/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Jobs", "MyJobs"],
        }),
        toggleJobActive: builder.mutation({
            query: (id) => ({
                url: `/job/toggle-active/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Jobs", "MyJobs"],
        }),
        deleteJob: builder.mutation({
            query: (id) => ({
                url: `/job/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Jobs", "MyJobs"],
        }),
    }),
})

export const {
    useCreateJobMutation,
    useGetJobsQuery,
    useGetMyJobsQuery,
    useGetJobByIdQuery,
    useUpdateJobMutation,
    useToggleJobActiveMutation,
    useDeleteJobMutation,
} = jobApi
