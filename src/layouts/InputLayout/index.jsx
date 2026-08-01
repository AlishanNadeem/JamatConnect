import { memo } from "react"
import { StyleSheet, View } from "react-native"
import Error from "../../components/Error"
import Label from "../../components/Label"
import Touchable from "../../components/Touchable"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"

const InputLayout = ({ label, required, error, children, wrapper_style, onPress }) => {

    const Component = onPress ? Touchable : View

    return (
        <View style={styles.container}>
            <Label label={label} required={required} />
            <View>
                <Component onPress={onPress} disabled={!onPress}>
                    <View style={[styles.input_wrapper, wrapper_style]}>
                        {children}
                    </View>
                </Component>
                <Error error={error} />
            </View>
        </View>
    )
}

export default memo(InputLayout)

const styles = StyleSheet.create({
    container: {
        width: "100%",
        gap: heightPixel(10),
    },
    input_wrapper: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: widthPixel(16),
        height: heightPixel(56),
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
        borderRadius: heightPixel(12),
        backgroundColor: colors.white
    },
})
