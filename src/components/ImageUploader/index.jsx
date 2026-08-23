import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Icon from "../Icon"
import Text from "../Text"
import Touchable from "../Touchable"
import Error from "../Error"
import Label from "../Label"

const ImageUploader = ({ label, required, onPress, onRemove, image, error, title, subtitle }) => {
    return (
        <View style={styles.container}>
            <Label label={label} required={required} />
            <View>
                <Touchable style={styles.upload_container} onPress={onPress}>
                    <Icon name="upload-cloud" size={28} color={colors.black} />
                    <View style={styles.text_container}>
                        {title && <Text size={16} align="center">{title}</Text>}
                        {subtitle && <Text size={12} align="center">{subtitle}</Text>}
                    </View>
                </Touchable>
                <Error error={error} />
            </View>
            {image &&
                <View style={styles.preview_container}>
                    <Icon source={image} rounded={"quarter"} size={100} resize="cover" />
                    <View style={styles.remove} >
                        <Icon name="x" size={26} color={colors.white} rounded={"full"} space background={colors.dark_primary} onPress={onRemove} />
                    </View>
                </View>
            }
        </View>
    )
}

export default ImageUploader

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(10)
    },
    upload_container: {
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
        borderRadius: heightPixel(16),
        paddingVertical: heightPixel(24),
        paddingHorizontal: widthPixel(24),
        alignItems: "center",
        gap: heightPixel(10),
        backgroundColor: colors.white,
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