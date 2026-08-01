import { StyleSheet, Switch, View } from "react-native"
import DateTimeInput from "../../../components/DateTimeInput"
import Row from "../../../components/Row"
import Text from "../../../components/Text"
import colors from "../../../helpers/colors"
import { heightPixel } from "../../../helpers/metrics"
import { global_styles } from "../../../helpers/styles"

const StepFour = ({ formik, onUpdateHour }) => (
    <View style={styles.container}>
        {formik.values.hours.map((hour, index) => (
            <View key={hour.day} style={styles.hour_row}>
                <Row align="center" justify="space-between">
                    <Text weight="semibold" capitalize>
                        {hour.day}
                    </Text>
                    <Row align="center" gap={8} style={global_styles.auto_width}>
                        <Text size={13} color={colors.gray}>
                            Closed
                        </Text>
                        <Switch
                            value={hour.closed}
                            onValueChange={(value) => onUpdateHour(index, "closed", value)}
                            trackColor={{
                                false: colors.light_gray,
                                true: colors.light_primary,
                            }}
                            thumbColor={colors.white}
                        />
                    </Row>
                </Row>
                {!hour.closed && (
                    <Row gap={12} style={styles.hour_times}>
                        <View style={styles.hour_input}>
                            <DateTimeInput
                                label="Open"
                                type="time"
                                placeholder="Open time"
                                value={hour.open}
                                onChangeText={(value) => onUpdateHour(index, "open", value)}
                            />
                        </View>
                        <View style={styles.hour_input}>
                            <DateTimeInput
                                label="Close"
                                type="time"
                                placeholder="Close time"
                                value={hour.close}
                                onChangeText={(value) => onUpdateHour(index, "close", value)}
                            />
                        </View>
                    </Row>
                )}
            </View>
        ))}
    </View>
)

export default StepFour

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(16),
    },
    hour_row: {
        gap: heightPixel(10),
        paddingBottom: heightPixel(12),
        borderBottomWidth: heightPixel(1),
        borderBottomColor: colors.light_gray,
    },
    hour_times: {
        width: "100%",
    },
    hour_input: {
        flex: 1,
    },
})
