import { baseApi } from "../Base"

export const feedbackApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createFeedback: builder.mutation({
            query: (body) => ({
                url: "/feedback/create",
                method: "POST",
                body
            }),
        }),
    }),
})

export const {
    useCreateFeedbackMutation
} = feedbackApi