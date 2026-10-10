import { memo } from "react"
import { View } from "react-native"
import Lucide from "@react-native-vector-icons/lucide"
import { heightPixel } from "../../helpers/metrics"
import Touchable from "../Touchable"
import colors from "../../helpers/colors"
import Image from "../Image"

const isImageSource = (source) => {
    if (!source) {
        return false
    }

    if (typeof source === "number") {
        return true
    }

    if (typeof source === "object" && source.uri) {
        return true
    }

    return false
}

const Icon = ({
    name,
    source,
    size = 28,
    background = colors.transparent,
    rounded,
    color,
    onPress,
    border,
    rotate = false,
    resize = "contain",
    space = false,
}) => {

    const Container = onPress ? Touchable : View

    const is_fluid = size === "100%"

    const border_round_config = {
        quarter: is_fluid ? "12.5%" : heightPixel(size / 8),
        half: is_fluid ? "25%" : heightPixel(size / 4),
        full: is_fluid ? "50%" : heightPixel(size / 2),
    }

    const container_size = is_fluid ? null : heightPixel(size)
    const border_width = border ? heightPixel(1) : 0

    const icon_size = space && !is_fluid
        ? heightPixel(size * 0.36)
        : (container_size ?? heightPixel(size))

    const image_padding = space && !is_fluid
        ? Math.max(0, (container_size - border_width * 2 - icon_size) / 2)
        : 0

    const container_style = {
        width: is_fluid ? "100%" : container_size,
        height: is_fluid ? "100%" : container_size,
        borderRadius: rounded ? border_round_config[rounded] : 0,
        backgroundColor: background,
        borderWidth: border_width,
        borderColor: border || "transparent",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        ...(isImageSource(source) && image_padding ? { padding: image_padding } : {}),
    }

    const image_style = {
        width: "100%",
        height: "100%",
        transform: rotate ? [{ rotate: "90deg" }] : [],
    }

    const icon_style = rotate ? { transform: [{ rotate: "90deg" }] } : undefined

    return (
        <Container onPress={onPress} style={container_style}>
            {
                name ?
                    <Lucide
                        name={name}
                        size={icon_size}
                        color={color}
                        style={icon_style}
                    />
                    :
                    isImageSource(source) ?
                        <Image
                            source={source}
                            style={image_style}
                            resize={resize}
                            color={color}
                        />
                        :
                        null
            }
        </Container>
    )
}

export default memo(Icon)
