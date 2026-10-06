import { useEffect } from "react"

const useScreenshotProtection = (enabled = true) => {
    useEffect(() => {
        if (!enabled) return undefined

        let CaptureProtection = null

        try {
            CaptureProtection = require("react-native-capture-protection").CaptureProtection
        } catch {
            return undefined
        }

        if (!CaptureProtection?.prevent) return undefined

        CaptureProtection.prevent({
            screenshot: true,
            record: true,
            appSwitcher: true,
        }).catch(() => { })

        return () => {
            CaptureProtection.allow({
                screenshot: true,
                record: true,
                appSwitcher: true,
            }).catch(() => { })
        }
    }, [enabled])
}

export default useScreenshotProtection
