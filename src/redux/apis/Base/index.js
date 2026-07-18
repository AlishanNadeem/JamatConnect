import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../../config/env'

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) headers.set('Authorization', `Bearer ${token}`)
        return headers
    },
})

const baseQueryWithReAuth = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions)
    return result

}

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReAuth,
    tagTypes: ["UserProviders"],
    endpoints: () => ({}),
})