import { memo, useCallback } from "react"
import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import BottomSheetModal from "../BottomSheetModal"
import Button from "../Button"
import Icon from "../Icon"
import Text from "../Text"
import Touchable from "../Touchable"

const ImagePickerModal = ({ visible, onClose, onCamera, onGallery }) => {

    const handleSubmit = useCallback((callback) => {
        onClose()
        setTimeout(() => callback?.(), 300)
    }, [])

    return (
        <BottomSheetModal
            visible={visible}
            onClose={onClose}
            title="Upload Image"
            subtitle="Choose how you want to upload your image"
        >
            <View style={styles.options}>
                <Touchable
                    style={styles.option}
                    onPress={() => handleSubmit(onCamera)}
                >
                    <Icon space name="camera" color={colors.white} background={colors.dark_primary} rounded="half" size={64} />
                    <Text size={14} weight="semibold" color={colors.black}>Camera</Text>
                    <Text size={12} color={colors.gray}>Take a new photo</Text>
                </Touchable>

                <View style={styles.divider} />

                <Touchable
                    style={styles.option}
                    onPress={() => handleSubmit(onGallery)}
                >
                    <Icon space name="images" color={colors.white} background={colors.dark_primary} rounded="half" size={64} />
                    <Text size={14} weight="semibold" color={colors.black}>Gallery</Text>
                    <Text size={12} color={colors.gray}>Choose from gallery</Text>
                </Touchable>
            </View>

            <Button onPress={onClose}>Cancel</Button>
        </BottomSheetModal>
    )
}

export default memo(ImagePickerModal)

const styles = StyleSheet.create({
    options: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginBottom: heightPixel(24),
    },
    option: {
        flex: 1,
        alignItems: "center",
        gap: heightPixel(4),
    },
    divider: {
        width: widthPixel(1),
        height: heightPixel(80),
        backgroundColor: colors.light_gray,
    },
})