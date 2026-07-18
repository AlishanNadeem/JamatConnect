import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../../../config/env"
import { generalApi } from "../General"

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/auth/`,
        prepareHeaders: (headers) => {

            headers.set("Accept", "application/json")
            return headers

        }
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: 'login',
                method: 'POST',
                body,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(generalApi.endpoints.getData.initiate())
                } catch { }
            }
        }),
        signup: builder.mutation({
            query: (body) => ({
                url: 'signup',
                method: 'POST',
                body,
            })
        }),
        forgetPassword: builder.mutation({
            query: (body) => ({
                url: 'forget-password',
                method: 'POST',
                body,
            })
        }),
        verifyCode: builder.mutation({
            query: (body) => ({
                url: 'verify-otp',
                method: 'POST',
                body,
            })
        }),
        setPassword: builder.mutation({
            query: (body) => ({
                url: 'set-password',
                method: 'POST',
                body: {
                    password: body?.password
                },
                headers: {
                    "Authorization": `Bearer ${body?.token}`
                }
            })
        })
    }),
})

export const {
    useLoginMutation,
    useSignupMutation,
    useForgetPasswordMutation,
    useVerifyCodeMutation,
    useSetPasswordMutation
} = authApi