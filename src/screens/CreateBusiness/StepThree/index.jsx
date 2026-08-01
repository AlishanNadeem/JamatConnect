import { StyleSheet, View } from "react-native"
import Input from "../../../components/Input"
import { heightPixel } from "../../../helpers/metrics"

const StepThree = ({ formik }) => (
    <View style={styles.container}>
        <Input
            required
            label="Street Address"
            placeholder="Enter full street address"
            value={formik.values.address.formatted}
            onChangeText={formik.handleChange("address.formatted")}
            onBlur={formik.handleBlur("address.formatted")}
            error={
                formik.touched.address?.formatted &&
                formik.errors.address?.formatted
            }
        />
        <Input
            required
            label="Country"
            placeholder="Enter country"
            value={formik.values.address.country}
            onChangeText={formik.handleChange("address.country")}
            onBlur={formik.handleBlur("address.country")}
            error={
                formik.touched.address?.country &&
                formik.errors.address?.country
            }
        />
        <Input
            required
            label="State"
            placeholder="Enter state"
            value={formik.values.address.state}
            onChangeText={formik.handleChange("address.state")}
            onBlur={formik.handleBlur("address.state")}
            error={
                formik.touched.address?.state &&
                formik.errors.address?.state
            }
        />
        <Input
            required
            label="City"
            placeholder="Enter city"
            value={formik.values.address.city}
            onChangeText={formik.handleChange("address.city")}
            onBlur={formik.handleBlur("address.city")}
            error={
                formik.touched.address?.city &&
                formik.errors.address?.city
            }
        />
    </View>
)

export default StepThree

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(16),
    },
})
