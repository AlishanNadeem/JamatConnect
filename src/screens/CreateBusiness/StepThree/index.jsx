import { useMemo } from "react"
import { StyleSheet, View } from "react-native"
import Dropdown from "../../../components/Dropdown"
import Input from "../../../components/Input"
import {
    getCityOptions,
    getCountryOptions,
    getStateOptions,
} from "../../../helpers/location"
import { heightPixel } from "../../../helpers/metrics"

const StepThree = ({ formik }) => {
    const country_code = formik.values.address.country_code
    const state_code = formik.values.address.state_code

    const country_options = useMemo(() => getCountryOptions(), [])
    const state_options = useMemo(() => getStateOptions(country_code), [country_code])
    const city_options = useMemo(
        () => getCityOptions(country_code, state_code),
        [country_code, state_code],
    )

    const has_country = Boolean(country_code)
    const has_state = Boolean(state_code)

    const onCountryChange = (option) => {
        formik.setFieldValue("address.country", option.label)
        formik.setFieldValue("address.country_code", option.value)
        formik.setFieldValue("address.state", "")
        formik.setFieldValue("address.state_code", "")
        formik.setFieldValue("address.city", "")
        formik.setFieldError("address.country", undefined)
        formik.setFieldError("address.state", undefined)
        formik.setFieldError("address.city", undefined)
        formik.setFieldTouched("address.country", true, false)
    }

    const onStateChange = (option) => {
        formik.setFieldValue("address.state", option.label)
        formik.setFieldValue("address.state_code", option.value)
        formik.setFieldValue("address.city", "")
        formik.setFieldError("address.state", undefined)
        formik.setFieldError("address.city", undefined)
        formik.setFieldTouched("address.state", true, false)
    }

    const onCityChange = (option) => {
        formik.setFieldValue("address.city", option.value)
        formik.setFieldError("address.city", undefined)
        formik.setFieldTouched("address.city", true, false)
    }

    return (
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
            <Dropdown
                required
                label="Country"
                placeholder="Select country"
                title="Select Country"
                options={country_options}
                value={country_code}
                onChange={onCountryChange}
                error={
                    formik.touched.address?.country &&
                    formik.errors.address?.country
                }
            />
            <Dropdown
                required
                label="State"
                placeholder="Select state"
                title="Select State"
                options={state_options}
                value={state_code}
                disabled={!has_country}
                onChange={onStateChange}
                error={
                    formik.touched.address?.state &&
                    formik.errors.address?.state
                }
            />
            <Dropdown
                required
                label="City"
                placeholder="Select city"
                title="Select City"
                options={city_options}
                value={formik.values.address.city}
                disabled={!has_state}
                onChange={onCityChange}
                error={
                    formik.touched.address?.city &&
                    formik.errors.address?.city
                }
            />
        </View>
    )
}

export default StepThree

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(16),
    },
})
