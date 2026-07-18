import { AsYouType, getExampleNumber } from "libphonenumber-js"
import examples from "libphonenumber-js/mobile/examples"
import { memo, useCallback, useEffect, useRef, useState } from "react"
import { Animated, StyleSheet, TextInput, View } from "react-native"
import fonts from "../../assets/fonts"
import colors from "../../helpers/colors"
import { font, heightPixel, widthPixel } from "../../helpers/metrics"
import CountryPickerModal from "../CountryPickerModal"
import Text from "../Text"
import Touchable from "../Touchable"
import { DEFAULT_COUNTRY } from "../../helpers/data"

const getFlag = (code) => {
    return code
        .toUpperCase()
        .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt()))
}

const getMaxLength = (code) => {
    try {
        const example = getExampleNumber(code, examples)
        if (!example) return 15
        const national = example.formatNational()
        return national.length
    } catch {
        return 15
    }
}

const PhoneInput = ({
    value,
    onChangeText,
    onChangeCountry,
    label,
    required = false,
    error = "",
    disabled = false,
    default_country = DEFAULT_COUNTRY,
    onBlur,
}) => {

    const [country, setCountry] = useState(default_country)
    const [modal_visible, setModalVisible] = useState(false)
    const [displayValue, setDisplayValue] = useState("")
    const error_opacity = useRef(new Animated.Value(0)).current

    useEffect(() => {

        if (value) {
            const formatter = new AsYouType(country.code)
            const formatted = formatter.input(value)
            setDisplayValue(formatted)
        } else {
            setDisplayValue("")
        }

    }, [value, country])

    useEffect(() => {
        Animated.timing(error_opacity, {
            toValue: error ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start()
    }, [error])

    const handleChangeText = useCallback((text) => {

        const digits = text.replace(/\D/g, "")

        const formatter = new AsYouType(country.code)
        const formatted = formatter.input(digits)

        setDisplayValue(formatted)
        onChangeText(digits)

    }, [country, onChangeText])

    const handleSelectCountry = useCallback((selected) => {
        setCountry(selected)
        setDisplayValue("")
        onChangeText("")
        if (onChangeCountry) {
            onChangeCountry(selected)
        }
    }, [onChangeText, onChangeCountry])

    return (
        <View style={styles.container}>
            {label && (
                <View style={styles.label}>
                    <Text weight="semibold">
                        {label} {required && <Text color="red">*</Text>}
                    </Text>
                </View>
            )}

            <View style={styles.input_wrapper}>
                <Touchable
                    style={styles.country_picker}
                    onPress={() => setModalVisible(true)}
                    disabled={disabled}
                >
                    <View style={styles.flag_container}>
                        <Text size={18}>{getFlag(country.code)}</Text>
                    </View>
                    <Text color={colors.white} size={14} weight="semibold">{country.calling_code}</Text>
                </Touchable>

                <View style={styles.divider} />

                <TextInput
                    value={displayValue}
                    onChangeText={handleChangeText}
                    placeholder="Enter phone number"
                    placeholderTextColor={colors.white}
                    keyboardType="phone-pad"
                    allowFontScaling={false}
                    cursorColor={colors.light_primary}
                    style={styles.input}
                    editable={!disabled}
                    onBlur={onBlur}
                    maxLength={getMaxLength(country.code)}
                />
            </View>

            {error ? (
                <Animated.Text style={[styles.error_text, { opacity: error_opacity }]}>
                    {error}
                </Animated.Text>
            ) : null}

            <CountryPickerModal
                visible={modal_visible}
                onSelect={handleSelectCountry}
                onClose={() => setModalVisible(false)}
            />
        </View>
    )
}

export default memo(PhoneInput)

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
        borderColor: colors.light_primary,
        borderRadius: heightPixel(100),
        backgroundColor: colors.input_background,
    },
    country_picker: {
        flexDirection: "row",
        alignItems: "center",
        gap: widthPixel(6),
    },
    flag_container: {
        width: widthPixel(32),
        height: widthPixel(32),
        borderRadius: widthPixel(16),
        backgroundColor: colors.input_background,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    divider: {
        width: heightPixel(1),
        height: "50%",
        backgroundColor: colors.lightest_white,
        marginHorizontal: widthPixel(12),
    },
    input: {
        flex: 1,
        fontFamily: fonts.primary.regular,
        color: colors.white,
        fontSize: font(14),
    },
    error_text: {
        color: "#FF4D4F",
        fontSize: font(12),
        fontFamily: fonts.primary.regular,
        marginTop: heightPixel(5),
        marginLeft: widthPixel(10),
    },
})