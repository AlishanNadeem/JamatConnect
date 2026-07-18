import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Icon from "../Icon"
import Text from "../Text"
import Touchable from "../Touchable"

const ImageUploader = ({ label, required, onPress, onRemove, image }) => {
    return (
        <View style={styles.container}>
            {
                label && (
                    <View style={styles.label}>
                        <Text weight="semibold" >
                            {label} {required && <Text color="red">*</Text>}
                        </Text>
                    </View>
                )
            }
            <Touchable style={styles.upload_container} onPress={onPress}>
                <Icon name="upload-cloud" size={38} color={colors.white} />
                <View style={styles.text_container}>
                    <Text size={16} align="center">Upload Profile Photo</Text>
                    <Text size={16} align="center">WebP, PNG, JPG, Or JPEG — Max 5MB</Text>
                </View>
            </Touchable>

            {image &&
                <View style={styles.preview_container}>
                    <Icon source={image} rounded={"quarter"} size={100} resize="cover" />
                    <View style={styles.remove} >
                        <Icon name="x" size={26} color={colors.white} rounded={"full"} space background={colors.dark_primary} onPress={onRemove} />
                    </View>
                </View>
            }
        </View  >
    )
}

export default ImageUploader

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(10)
    },
    upload_container: {
        borderWidth: heightPixel(1),
        borderColor: colors.light_primary,
        borderRadius: heightPixel(16),
        paddingVertical: heightPixel(24),
        paddingHorizontal: widthPixel(24),
        alignItems: "center",
        gap: heightPixel(10),
        backgroundColor: colors.input_background,
    },
    label: {
        paddingHorizontal: widthPixel(2),
    },
    text_container: {
        gap: heightPixel(4),
    },
    preview_container: {
        alignSelf: "flex-start",
    },
    remove: {
        position: "absolute",
        top: -heightPixel(6),
        right: -heightPixel(6)
    },
})