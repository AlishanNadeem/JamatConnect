import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import * as Keychain from 'react-native-keychain'

const SERVICE = Platform.select({
    ios: "com.pixelgenesys.checkingup",
    android: "com.pixelgenesys.checkingup"
})

const useKeychain = () => {

    const [credentials, setCredentials] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Keychain.getGenericPassword({ service: SERVICE })
            .then(saved => setCredentials(saved ? { email: saved.username, password: saved.password } : null))
            .catch(() => setCredentials(null))
            .finally(() => setLoading(false))
    }, [])

    const saveCredentials = (email, password) =>
        Keychain.setGenericPassword(email, password, { service: SERVICE })
            .then(() => setCredentials({ email, password }))
            .catch(err => console.log('Error saving credentials:', err))

    const clearCredentials = () =>
        Keychain.resetGenericPassword({ service: SERVICE })
            .then(() => setCredentials(null))
            .catch(err => console.log('Error clearing credentials:', err))

    return { credentials, loading, saveCredentials, clearCredentials }
}

export default useKeychain