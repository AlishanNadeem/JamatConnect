import { baseApi } from "../Base"

export const marketplaceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createListing: builder.mutation({
            query: (body) => ({
                url: "/marketplace/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["MyListings", "Listings"],
        }),
        getMyListings: builder.query({
            query: (params) => ({
                url: "/marketplace/my",
                method: "GET",
                params,
            }),
            providesTags: ["MyListings"],
        }),
        getListings: builder.query({
            query: (params) => ({
                url: "/marketplace/get",
                method: "GET",
                params,
            }),
            providesTags: ["Listings"],
        }),
        getListingById: builder.query({
            query: (id) => ({
                url: `/marketplace/get/${id}`,
                method: "GET",
            }),
            providesTags: ["ListingDetails"],
        }),
        updateListing: builder.mutation({
            query: ({ id, body }) => ({
                url: `/marketplace/update/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["MyListings", "Listings", "ListingDetails"],
        }),
        deleteListing: builder.mutation({
            query: (id) => ({
                url: `/marketplace/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["MyListings", "Listings"],
        }),
        toggleListingActive: builder.mutation({
            query: (id) => ({
                url: `/marketplace/toggle-active/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["MyListings", "Listings", "ListingDetails"],
        }),
        renewListing: builder.mutation({
            query: (id) => ({
                url: `/marketplace/renew/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["MyListings", "Listings", "ListingDetails"],
        }),
    }),
})

export const {
    useCreateListingMutation,
    useGetMyListingsQuery,
    useGetListingsQuery,
    useGetListingByIdQuery,
    useUpdateListingMutation,
    useDeleteListingMutation,
    useToggleListingActiveMutation,
    useRenewListingMutation,
} = marketplaceApi
