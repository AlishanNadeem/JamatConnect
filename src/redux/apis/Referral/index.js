import { baseApi } from "../Base"

export const referralApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getReferredUsers: builder.query({
            query: (params) => ({
                url: "/referral/referred-users",
                method: "GET",
                params,
            }),
        }),
    }),
})

export const {
    useGetReferredUsersQuery,
} = referralApi
