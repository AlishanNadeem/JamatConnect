import { StyleSheet, View } from "react-native"
import Input from "../../../components/Input"
import PhoneInput from "../../../components/PhoneInput"
import { heightPixel } from "../../../helpers/metrics"

const StepTwo = ({ formik }) => (
    <View style={styles.container}>
        <Input
            label="Email"
            type="email"
            placeholder="Enter business email"
            value={formik.values.email}
            onChangeText={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            error={formik.touched.email && formik.errors.email}
        />
        <PhoneInput
            label="Phone Number"
            required
            value={formik.values.phone}
            onChangeText={formik.handleChange("phone")}
            onChangeCountry={(value) => {
                formik.setFieldValue("country_code", value?.code)
                formik.setFieldValue("dialing_code", value?.calling_code)
            }}
            onBlur={formik.handleBlur("phone")}
            error={formik.touched.phone && formik.errors.phone}
            default_country={{
                code: formik.values.country_code,
                calling_code: formik.values.dialing_code,
            }}
        />
        <Input
            label="Website"
            placeholder="https://example.com"
            value={formik.values.website}
            onChangeText={formik.handleChange("website")}
            onBlur={formik.handleBlur("website")}
            error={formik.touched.website && formik.errors.website}
        />
    </View>
)

export default StepTwo

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(16),
    },
})
