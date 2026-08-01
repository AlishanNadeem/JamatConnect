import { memo } from "react"
import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Text from "../Text"

const Label = ({ label, required = false, style }) => {

    if (!label) return null

    return (
        <View style={[styles.container, style]}>
            <Text weight="semibold">
                {label} {required && <Text color={colors.danger}>*</Text>}
            </Text>
        </View>
    )

}

export default memo(Label)

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: widthPixel(2),
    },
})
