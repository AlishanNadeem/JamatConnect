import { memo, useEffect, useRef } from "react"
import { Animated, StyleSheet } from "react-native"
import fonts from "../../assets/fonts"
import colors from "../../helpers/colors"
import { font, heightPixel, widthPixel } from "../../helpers/metrics"

const Error = ({ error, style }) => {

    const error_opacity = useRef(new Animated.Value(error ? 1 : 0)).current

    useEffect(() => {
        Animated.timing(error_opacity, {
            toValue: error ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start()
    }, [error])

    if (!error) return null

    return (
        <Animated.Text style={[styles.error_text, { opacity: error_opacity }, style]}>
            {error}
        </Animated.Text>
    )
}

export default memo(Error)

const styles = StyleSheet.create({
    error_text: {
        color: colors.danger,
        fontSize: font(12),
        fontFamily: fonts.primary.regular,
        marginTop: heightPixel(5),
        marginLeft: widthPixel(10),
    },
})
