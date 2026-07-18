import { useEffect, useRef } from "react"
import { Animated, Image, Modal, StyleSheet, View } from "react-native"
import images from "../../assets/images"
import colors from "../../helpers/colors"
import { GLOBAL_HORIZONTAL_PADDING, heightPixel, SCREEN_HEIGHT, SCREEN_WIDTH, widthPixel } from "../../helpers/metrics"
import Button from "../Button"
import Icon from "../Icon"
import Text from "../Text"

const GlobalModal = ({ visible, type, title, button_text = "Ok", message, onOk, onYes, onNo }) => {

    const scale_animation = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (visible) {
            scale_animation.setValue(0)
            Animated.spring(scale_animation, {
                toValue: 1,
                useNativeDriver: true,
                tension: 30,
                friction: 10,
            }).start()
        }
    }, [visible])

    return (
        <Modal visible={visible} animationType="fade" statusBarTranslucent>
            <View style={styles.overlay}>
                <Image source={images.logo} style={styles.watermark} />
                <Animated.View style={[styles.container, { transform: [{ scale: scale_animation }] }]}>
                    <Icon name={type === "info" ? "circle-check" : "alert-circle"} size={47} background={colors.dark_primary} rounded={"full"} space color={colors.white} />
                    {title && <Text size={26} weight="bold" align="center" color={colors.black}>{title}</Text>}
                    {message && <Text size={16} align="center" color={colors.black}>{message}</Text>}
                    <View style={styles.row}>
                        {
                            type === "info" ?
                                <Button onPress={onOk}>{button_text}</Button>
                                :
                                <>
                                    <Button onPress={onYes}>Yes</Button>
                                    <Button onPress={onNo} type="black">No</Button>
                                </>
                        }
                    </View>
                </Animated.View>
            </View>
        </Modal >
    )
}

export default GlobalModal

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: GLOBAL_HORIZONTAL_PADDING * 2,
        backgroundColor: colors.primary
    },
    container: {
        backgroundColor: colors.lightest_primary,
        borderRadius: heightPixel(20),
        paddingHorizontal: widthPixel(27),
        paddingVertical: heightPixel(34),
        minHeight: heightPixel(250),
        width: "100%",
        gap: heightPixel(16),
        justifyContent: "center",
        alignItems: "center"
    },
    row: {
        width: "100%",
        gap: heightPixel(8)
    },
    watermark: {
        position: "absolute",
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        opacity: 0.06,
        zIndex: 0
    }
})