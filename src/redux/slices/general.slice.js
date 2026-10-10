import { createSlice } from "@reduxjs/toolkit"
import { authApi } from "../apis/Auth"
import { generalApi } from "../apis/General"
import { userApi } from "../apis/User"

const toIdList = (items = []) => items.map((item) => String(item?._id ?? item))

const initial = {
    first_launch: true,
    alert_mode: null,
    app_config: null,
    employment_types: [],
    workplace_types: [],
    saved_business_ids: [],
    saved_job_ids: [],
}

const generalSlice = createSlice({
    name: "general",
    initialState: initial,
    reducers: {
        completeOnboarding: (state) => {
            state.first_launch = false
        },
        setAlertMode: (state, action) => {
            state.alert_mode = action.payload
        },
        toggleSavedBusiness: (state, action) => {
            const id = String(action.payload)
            if (!state.saved_business_ids) {
                state.saved_business_ids = []
            }
            const index = state.saved_business_ids.indexOf(id)
            if (index >= 0) {
                state.saved_business_ids.splice(index, 1)
            } else {
                state.saved_business_ids.push(id)
            }
        },
        toggleSavedJob: (state, action) => {
            const id = String(action.payload)
            if (!state.saved_job_ids) {
                state.saved_job_ids = []
            }
            const index = state.saved_job_ids.indexOf(id)
            if (index >= 0) {
                state.saved_job_ids.splice(index, 1)
            } else {
                state.saved_job_ids.push(id)
            }
        },
        clearUserData: (state) => {
            state.saved_business_ids = []
            state.saved_job_ids = []
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                generalApi.endpoints.getVersion.matchFulfilled,
                (state, action) => {
                    state.app_config = action.payload.data
                }
            )
            .addMatcher(
                generalApi.endpoints.getData.matchFulfilled,
                (state, action) => {
                    const data = action.payload?.data ?? {}
                    state.employment_types = data.employment_types ?? []
                    state.workplace_types = data.workplace_types ?? []
                }
            )
            .addMatcher(
                userApi.endpoints.getSavedBusinesses.matchFulfilled,
                (state, action) => {
                    state.saved_business_ids = toIdList(action.payload?.data ?? [])
                }
            )
            .addMatcher(
                userApi.endpoints.toggleSavedBusiness.matchFulfilled,
                (state, action) => {
                    state.saved_business_ids = toIdList(action.payload?.data?.saved_businesses ?? [])
                }
            )
            .addMatcher(
                userApi.endpoints.getSavedJobs.matchFulfilled,
                (state, action) => {
                    state.saved_job_ids = toIdList(action.payload?.data ?? [])
                }
            )
            .addMatcher(
                userApi.endpoints.toggleSavedJob.matchFulfilled,
                (state, action) => {
                    state.saved_job_ids = toIdList(action.payload?.data?.saved_jobs ?? [])
                }
            )
            .addMatcher(
                authApi.endpoints.login.matchFulfilled,
                (state, action) => {
                    state.saved_business_ids = toIdList(action.payload?.data?.user?.saved_businesses ?? [])
                    state.saved_job_ids = toIdList(action.payload?.data?.user?.saved_jobs ?? [])
                }
            )
            .addMatcher(
                authApi.endpoints.signup.matchFulfilled,
                (state, action) => {
                    state.saved_business_ids = toIdList(action.payload?.data?.user?.saved_businesses ?? [])
                    state.saved_job_ids = toIdList(action.payload?.data?.user?.saved_jobs ?? [])
                }
            )
    }
})

export const { completeOnboarding, setAlertMode, toggleSavedBusiness, toggleSavedJob, clearUserData } = generalSlice.actions
export default generalSlice.reducer
