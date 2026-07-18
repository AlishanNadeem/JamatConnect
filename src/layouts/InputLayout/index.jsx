import { memo, useEffect, useRef } from "react"
import { Animated, StyleSheet, View } from "react-native"
import fonts from "../../assets/fonts"
import Text from "../../components/Text"
import Touchable from "../../components/Touchable"
import colors from "../../helpers/colors"
import { font, heightPixel, widthPixel } from "../../helpers/metrics"

const InputLayout = ({ label, required, error, children, wrapper_style, onPress }) => {

    const error_opacity = useRef(new Animated.Value(error ? 1 : 0)).current

    const Component = onPress ? Touchable : View

    useEffect(() => {
        Animated.timing(error_opacity, {
            toValue: error ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start()
    }, [error])

    return (
        <View style={styles.container}>
            {label && (
                <View style={styles.label}>
                    <Text weight="semibold">
                        {label} {required && <Text color="red">*</Text>}
                    </Text>
                </View>
            )}

            <Component onPress={onPress} disabled={!onPress}>
                <View style={[styles.input_wrapper, wrapper_style]}>
                    {children}
                </View>
            </Component>

            {error ? (
                <Animated.Text style={[styles.error_text, { opacity: error_opacity }]}>
                    {error}
                </Animated.Text>
            ) : null}
        </View>
    )
}

export default memo(InputLayout)

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    label: {
        marginBottom: heightPixel(10),
        paddingHorizontal: widthPixel(2),
    },
    input_wrapper: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: widthPixel(16),
        height: heightPixel(56),
        borderWidth: heightPixel(1.5),
        borderColor: colors.light_gray,
        borderRadius: heightPixel(12),
        backgroundColor: colors.white
    },
    error_text: {
        color: colors.danger,
        fontSize: font(12),
        fontFamily: fonts.primary.regular,
        marginTop: heightPixel(5),
        marginLeft: widthPixel(10),
    },
})