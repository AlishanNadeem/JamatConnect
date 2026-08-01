import { memo } from "react"
import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Row from "../Row"
import Text from "../Text"

const StepIndicator = ({ current_step, total_steps, step, steps = [] }) => {
    return (
        <View style={styles.container}>
            <Row align="center" justify="space-between">
                <Text size={12} weight="semibold" color={colors.gray}>
                    Step {current_step + 1} of {total_steps}
                </Text>
                <Text size={12} weight="semibold" color={colors.primary}>
                    {Math.round(((current_step + 1) / total_steps) * 100)}%
                </Text>
            </Row>
            <View style={styles.progress_track}>
                {
                    steps.map((item, index) => (
                        <View
                            key={item.key}
                            style={[
                                styles.progress_segment,
                                index <= current_step && styles.progress_segment_active,
                            ]}
                        />
                    ))
                }
            </View>
            <View style={styles.heading}>
                <Text size={18} weight="bold">
                    {step.title}
                </Text>
                <Text size={13} color={colors.gray}>
                    {step.subtitle}
                </Text>
            </View>
        </View>
    )
}

export default memo(StepIndicator)

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(10),
        marginBottom: heightPixel(16),
    },
    progress_track: {
        flexDirection: "row",
        gap: widthPixel(6),
    },
    progress_segment: {
        flex: 1,
        height: heightPixel(4),
        borderRadius: heightPixel(4),
        backgroundColor: colors.light_gray,
    },
    progress_segment_active: {
        backgroundColor: colors.primary,
    },
    heading: {
        gap: heightPixel(4),
        paddingTop: heightPixel(4),
    },
})
