import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Error from "../Error"
import Icon from "../Icon"
import Image from "../Image"
import Label from "../Label"
import Text from "../Text"
import Touchable from "../Touchable"

const ImageUploader = ({
    label,
    required,
    onPress,
    onRemove,
    image,
    error,
    title = "Upload image",
    subtitle,
}) => {
    return (
        <View style={styles.container}>
            <Label label={label} required={required} />
            <View>
                <View style={[styles.box, image ? styles.box_filled : styles.box_empty]}>
                    {image ? (
                        <Touchable onPress={onPress}>
                            <Image
                                source={image}
                                style={styles.preview}
                                resize="cover"
                            />
                        </Touchable>
                    ) : (
                        <Touchable style={styles.empty} onPress={onPress}>
                            <Icon name="upload-cloud" size={28} color={colors.gray} />
                            <View style={styles.text_container}>
                                {title ? (
                                    <Text size={16} align="center" weight="semibold">
                                        {title}
                                    </Text>
                                ) : null}
                                {subtitle ? (
                                    <Text size={12} align="center" color={colors.gray}>
                                        {subtitle}
                                    </Text>
                                ) : null}
                            </View>
                        </Touchable>
                    )}
                    {image ? (
                        <View style={styles.remove}>
                            <Icon
                                name="x"
                                size={26}
                                color={colors.white}
                                rounded="full"
                                space
                                background={colors.dark_primary}
                                onPress={onRemove}
                            />
                        </View>
                    ) : null}
                </View>
                <Error error={error} />
            </View>
        </View>
    )
}

export default ImageUploader

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(10),
    },
    box: {
        width: "100%",
        borderRadius: heightPixel(16),
        overflow: "hidden",
        backgroundColor: colors.white,
    },
    box_empty: {
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
        borderStyle: "dashed",
        paddingVertical: heightPixel(28),
        paddingHorizontal: widthPixel(24),
    },
    box_filled: {
        borderWidth: 0,
    },
    empty: {
        alignItems: "center",
        gap: heightPixel(10),
    },
    text_container: {
        gap: heightPixel(4),
    },
    preview: {
        width: "100%",
        aspectRatio: 16 / 9,
    },
    remove: {
        position: "absolute",
        top: heightPixel(8),
        right: heightPixel(8),
    },
})
