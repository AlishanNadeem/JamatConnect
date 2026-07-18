import { AsYouType, getExampleNumber } from "libphonenumber-js"
import examples from "libphonenumber-js/mobile/examples"
import { memo, useCallback, useEffect, useState } from "react"
import { StyleSheet, TextInput, View } from "react-native"
import fonts from "../../assets/fonts"
import colors from "../../helpers/colors"
import { DEFAULT_COUNTRY } from "../../helpers/data"
import { font, heightPixel, widthPixel } from "../../helpers/metrics"
import InputLayout from "../../layouts/InputLayout"
import CountryPickerModal from "../CountryPickerModal"
import Text from "../Text"
import Touchable from "../Touchable"

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

    useEffect(() => {
        if (value) {
            const formatter = new AsYouType(country.code)
            const formatted = formatter.input(value)
            setDisplayValue(formatted)
        } else {
            setDisplayValue("")
        }
    }, [value, country])

    const handleChangeText = useCallback((text) => {

        const digits = text.replace(/\D/g, "")
        const formatter = new AsYouType(country.code)
        const formatted = formatter.input(digits)

        setDisplayValue(formatted)
        onChangeText(digits)

    }, [country])

    const handleSelectCountry = useCallback((selected) => {
        setCountry(selected)
        setDisplayValue("")
        onChangeText("")
        onChangeCountry?.(selected)
    }, [])

    return (
        <>
            <InputLayout label={label} required={required} error={error}>
                <Touchable
                    style={styles.country_picker}
                    onPress={() => setModalVisible(true)}
                    disabled={disabled}
                >
                    <View style={styles.flag_container}>
                        <Text size={18}>{getFlag(country.code)}</Text>
                    </View>
                    <Text size={14} weight="semibold">{country.calling_code}</Text>
                </Touchable>

                <View style={styles.divider} />

                <TextInput
                    value={displayValue}
                    onChangeText={handleChangeText}
                    placeholder="Enter phone number"
                    placeholderTextColor={colors.gray}
                    keyboardType="phone-pad"
                    allowFontScaling={false}
                    cursorColor={colors.light_primary}
                    style={styles.input}
                    editable={!disabled}
                    onBlur={onBlur}
                    maxLength={getMaxLength(country.code)}
                />
            </InputLayout>

            <CountryPickerModal
                visible={modal_visible}
                onSelect={handleSelectCountry}
                onClose={() => setModalVisible(false)}
            />
        </>
    )
}

export default memo(PhoneInput)

const styles = StyleSheet.create({
    country_picker: {
        flexDirection: "row",
        alignItems: "center",
        gap: widthPixel(6),
    },
    flag_container: {
        width: widthPixel(32),
        height: widthPixel(32),
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    divider: {
        width: heightPixel(1),
        height: "50%",
        backgroundColor: colors.light_gray,
        marginHorizontal: widthPixel(12),
    },
    input: {
        flex: 1,
        fontFamily: fonts.primary.regular,
        color: colors.black,
        fontSize: font(14),
    },
})
