import { Platform } from "react-native"

export const getGreeting = () => {

    const hour = new Date().getHours()

    if (hour < 12) return "Good Morning ☀️"
    if (hour < 17) return "Good Afternoon 🌤️"
    if (hour < 21) return "Good Evening 🌇"
    return "Good Night 🌙"

}

export const formatWebsite = (url) => {
    if (!url) return null
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "")
}

export const formatPhone = (dialing_code, phone) => {
    if (!phone) return null
    return `${dialing_code ?? ""} ${phone}`.trim()
}

export const getOptionLabel = (options = [], value) =>
    options.find((option) => option.value === value)?.label ?? value

export const getLocationLabel = ({ location, address } = {}) =>
    location
    || address?.formatted
    || [address?.city, address?.state, address?.country].filter(Boolean).join(", ")
    || null

const appendFormDataValue = (form_data, key, value) => {

    if (value === undefined || value === null) return

    if (typeof value === "object" && value.uri) {
        form_data.append(key, {
            uri:
                Platform.OS === "ios"
                    ? value.uri.replace("file://", "")
                    : value.uri,
            name: value.name || `photo_${Date.now()}.jpg`,
            type: value.type || "image/jpeg",
        })
        return
    }

    if (value instanceof Date) {
        form_data.append(key, value.toLocaleString())
        return
    }

    if (Array.isArray(value)) {
        value.forEach((item, index) => {
            appendFormDataValue(form_data, `${key}[${index}]`, item)
        })
        return
    }

    if (typeof value === "object") {
        Object.entries(value).forEach(([nested_key, nested_value]) => {
            appendFormDataValue(form_data, `${key}[${nested_key}]`, nested_value)
        })
        return
    }

    form_data.append(key, value)

}

export const convertToFormData = (values) => {

    const form_data = new FormData()

    Object.entries(values).forEach(([key, value]) => {
        appendFormDataValue(form_data, key, value)
    })

    return form_data

}
