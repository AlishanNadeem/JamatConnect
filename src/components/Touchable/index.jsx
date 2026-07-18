import { memo, useRef } from 'react'
import { Animated, TouchableWithoutFeedback, View, StyleSheet } from 'react-native'
import colors from '../../helpers/colors'

const Touchable = ({
    children,
    onPress,
    disabled = false,
    style = {},
    ripple = false,
}) => {

    const animation = useRef(new Animated.Value(1)).current
    const ripple_scale = useRef(new Animated.Value(0)).current
    const ripple_opacity = useRef(new Animated.Value(0)).current

    const handlePressIn = () => {

        Animated.spring(animation, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start()

        if (ripple) {
            ripple_scale.setValue(0)
            ripple_opacity.setValue(0.4)
            Animated.parallel([
                Animated.timing(ripple_scale, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(ripple_opacity, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]).start()
        }

    }

    const handlePressOut = () => {

        Animated.spring(animation, {
            toValue: 1,
            friction: 4,
            tension: 40,
            useNativeDriver: true,
        }).start()

    }

    return (
        <TouchableWithoutFeedback
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled}
        >
            <Animated.View style={[style, { transform: [{ scale: animation }] }]}>
                {children}
                {ripple && (
                    <Animated.View
                        pointerEvents="none"
                        style={[
                            styles.ripple,
                            {
                                opacity: ripple_opacity,
                                transform: [{ scale: ripple_scale }],
                            }
                        ]}
                    />
                )}
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

export default memo(Touchable)

const styles = StyleSheet.create({
    ripple: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 999,
        backgroundColor: colors.overlay,
    },
})