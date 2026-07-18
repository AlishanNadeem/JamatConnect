import { createSlice } from "@reduxjs/toolkit"
import { USER } from "../../helpers/data"
import { authApi } from "../apis/Auth"
import { userApi } from "../apis/User"

const initial = {
    user: null,
    token: null,
    is_authenticated: false
}

const authSlice = createSlice({
    name: "auth",
    initialState: initial,
    reducers: {
        setCredentials: (state, action) => {
            state.user = USER
            state.token = null
            state.is_authenticated = true
        },
        clearCredentials: (state) => {
            state.user = null
            state.token = null
            state.is_authenticated = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authApi.endpoints.signup.matchFulfilled,
                (state, action) => {
                    state.user = action.payload.data.user
                    state.token = action.payload.data.token
                    state.is_authenticated = true
                }
            )
        builder
            .addMatcher(
                userApi.endpoints.completeProfile.matchFulfilled,
                (state, action) => {
                    state.user = action.payload.data
                }
            )
        builder
            .addMatcher(
                authApi.endpoints.login.matchFulfilled,
                (state, action) => {
                    state.user = action.payload.data.user
                    state.token = action.payload.data.token
                    state.is_authenticated = true
                }
            )
        builder
            .addMatcher(
                userApi.endpoints.editProfile.matchFulfilled,
                (state, action) => {
                    state.user = action.payload.data.user
                }
            )
    }
})

export const { setCredentials, clearCredentials } = authSlice.actions
export default authSlice.reducer