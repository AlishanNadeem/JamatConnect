import { isRejectedWithValue } from "@reduxjs/toolkit"
import Toast from "react-native-toast-message"

const errorLogger = () => (next) => (action) => {

    if (isRejectedWithValue(action)) {

        const status = action.payload?.status
        const message =
            action.payload?.data?.message ||
            action.error?.message ||
            "Something went wrong"

        // Skip expected auth failures after logout / missing token
        const is_auth_error =
            status === 401 ||
            /authorization|token|unauthoriz/i.test(String(message))

        if (!is_auth_error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: message,
            })
        }
    }

    return next(action)

}

export default errorLogger
