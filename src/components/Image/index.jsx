import { memo, useMemo } from "react"
import FastImage from "react-native-fast-image"

const normalizeSource = (source) => {

    if (!source) {
        return source
    }

    if (typeof source === "number") {
        return source
    }

    if (typeof source === "object" && source.uri) {
        return {
            priority: FastImage.priority.normal,
            ...source,
        }
    }

    return source

}

const Image = ({
    source,
    style,
    resize = "cover",
    color,
}) => {

    const resolved_source = useMemo(() => normalizeSource(source), [source])

    return (
        <FastImage
            source={resolved_source}
            style={style}
            tintColor={color}
            resizeMode={FastImage.resizeMode[resize] ?? FastImage.resizeMode.cover}
        />
    )
}

Image.resizeMode = FastImage.resizeMode
Image.priority = FastImage.priority
Image.cacheControl = FastImage.cacheControl
Image.preload = FastImage.preload
Image.clearMemoryCache = FastImage.clearMemoryCache
Image.clearDiskCache = FastImage.clearDiskCache

export default memo(Image)
