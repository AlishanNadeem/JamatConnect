import { useState } from "react"
import { Alert, Platform } from "react-native"
import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions"

const useImagePicker = ({ onImageSelected } = {}) => {

    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)

    const options = {
        mediaType: "photo",
        quality: 0.8,
        maxWidth: 1024,
        maxHeight: 1024,
        includeBase64: false,
    }

    const camera_permission = Platform.select({
        ios: PERMISSIONS.IOS.CAMERA,
        android: PERMISSIONS.ANDROID.CAMERA,
    })

    const gallery_permission = Platform.select({
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
        android: Platform.Version >= 33
            ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
            : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    })

    const requestPermission = async (permission) => {
        const result = await check(permission)
        if (result === RESULTS.GRANTED) return true
        if (result === RESULTS.DENIED) {
            const request_result = await request(permission)
            return request_result === RESULTS.GRANTED
        }
        return false
    }

    const handleResponse = (response) => {
        if (response.didCancel) return
        if (response.errorCode) {
            Alert.alert("Error", response.errorMessage || "Something went wrong.")
            return
        }
        const asset = response.assets?.[0]
        if (!asset) return
        const selected = {
            uri: asset.uri,
            name: asset.fileName,
            type: asset.type,
            size: asset.fileSize,
        }
        setImage(selected)
        onImageSelected?.(selected)
    }

    const openCamera = async () => {
        setLoading(true)
        try {
            const granted = await requestPermission(camera_permission)
            if (!granted) {
                Alert.alert("Permission Denied", "Camera permission is required to take a photo.")
                return
            }
            const response = await launchCamera(options)
            handleResponse(response)
        } finally {
            setLoading(false)
        }
    }

    const openGallery = async () => {
        setLoading(true)
        try {
            const granted = await requestPermission(gallery_permission)
            if (!granted) {
                Alert.alert("Permission Denied", "Gallery permission is required to select a photo.")
                return
            }
            const response = await launchImageLibrary(options)
            handleResponse(response)
        } finally {
            setLoading(false)
        }
    }

    const clearImage = () => {
        setImage(null)
        onImageSelected?.(null)
    }

    return {
        image,
        loading,
        openCamera,
        openGallery,
        clearImage,
    }
}

export default useImagePicker