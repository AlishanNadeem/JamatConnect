import AsyncStorage from "@react-native-async-storage/async-storage"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import { authApi } from "../apis/Auth"
import { baseApi } from "../apis/Base"
import errorLogger from "../middlewares/error.middleware"
import authReducer from "../slices/auth.slice"
import generalReducer from "../slices/general.slice"

const persist_config = {
    key: "com.pixelgenesys.checkingup",
    storage: AsyncStorage,
    whitelist: ["auth", "general"]
}

const rootReducer = combineReducers({
    auth: authReducer,
    general: generalReducer,
    [authApi.reducerPath]: authApi.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
})

export const store = configureStore({
    reducer: persistReducer(persist_config, rootReducer),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
            .concat(authApi.middleware)
            .concat(baseApi.middleware)
            .concat(errorLogger),
})

export const persistor = persistStore(store)