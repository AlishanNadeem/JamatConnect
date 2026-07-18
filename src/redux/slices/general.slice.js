import { createSlice } from "@reduxjs/toolkit"
import { generalApi } from "../apis/General"

const initial = {
    first_launch: true,
    alert_mode: null,
    app_config: null
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
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                generalApi.endpoints.getVersion.matchFulfilled,
                (state, action) => {
                    state.app_config = action.payload.data
                }
            )
    }
})

export const { completeOnboarding, setAlertMode } = generalSlice.actions
export default generalSlice.reducer