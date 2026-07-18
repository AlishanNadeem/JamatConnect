import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { useCallback } from "react"
import { WEB_CLIENT_ID } from "../config/env"

GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
})

export const useSocialLogin = () => {

    const signInWithGoogle = useCallback(async () => {

        try {

            await GoogleSignin.hasPlayServices()
            const response = await GoogleSignin.signIn()

            return {
                success: true,
                provider: "google",
                token: response?.data?.idToken || response?.idToken,
            }

        } catch (error) {
            return {
                success: false,
                error,
            }
        }

    }, [])

    const signInWithApple = useCallback(async () => {
        throw new Error("Apple Sign In not implemented")
    }, [])

    return {
        signInWithGoogle,
        signInWithApple,
    }
}