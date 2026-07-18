import { memo, useEffect, useRef } from "react"
import { Animated, Modal, Pressable, StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { BOTTOM_INSET, heightPixel, widthPixel } from "../../helpers/metrics"
import Text from "../Text"

const BottomSheetModal = ({
    visible,
    onClose,
    title,
    subtitle,
    children,
    initial_height = 300,
}) => {

    const translate_y = useRef(new Animated.Value(initial_height)).current

    useEffect(() => {
        if (visible) {
            translate_y.setValue(initial_height)
            Animated.spring(translate_y, {
                toValue: 0,
                useNativeDriver: true,
                tension: 65,
                friction: 11,
            }).start()
        } else {
            Animated.timing(translate_y, {
                toValue: initial_height,
                duration: 250,
                useNativeDriver: true,
            }).start()
        }
    }, [visible])

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <Animated.View style={[styles.sheet, { transform: [{ translateY: translate_y }] }]}>
                    <Pressable>
                        <View style={styles.handle} />
                        {title && (
                            <Text size={18} weight="bold" style={styles.title} color={colors.black}>
                                {title}
                            </Text>
                        )}
                        {subtitle && (
                            <Text size={14} style={styles.subtitle} color={colors.gray}>
                                {subtitle}
                            </Text>
                        )}
                        {children}
                    </Pressable>
                </Animated.View>
            </Pressable>
        </Modal>
    )
}

export default memo(BottomSheetModal)

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: colors.overlay,
        justifyContent: "flex-end",
    },
    sheet: {
        backgroundColor: colors.lightest_primary,
        borderTopLeftRadius: heightPixel(24),
        borderTopRightRadius: heightPixel(24),
        paddingHorizontal: widthPixel(24),
        paddingTop: heightPixel(12),
        paddingBottom: BOTTOM_INSET + heightPixel(20),
        maxHeight: "80%",
    },
    handle: {
        width: widthPixel(40),
        height: heightPixel(4),
        borderRadius: heightPixel(100),
        backgroundColor: colors.dark_gray,
        alignSelf: "center",
        marginBottom: heightPixel(20),
    },
    title: {
        marginBottom: heightPixel(4),
    },
    subtitle: {
        marginBottom: heightPixel(24),
    },
})