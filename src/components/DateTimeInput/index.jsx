import { memo } from "react"
import { StyleSheet, View } from "react-native"
import DatePicker from "react-native-date-picker"
import colors from "../../helpers/colors"
import useToggle from "../../hooks/useToggle"
import InputLayout from "../../layouts/InputLayout"
import Icon from "../Icon"
import Text from "../Text"

const DateTimeInput = ({
    value,
    onChangeText,
    placeholder = "",
    type = "date",
    label,
    required = false,
    error = "",
    disabled = false,
}) => {

    const { value: open, toggle: toggleOpen } = useToggle(false)

    const getDisplayValue = () => {
        if (!value) return null
        const date = new Date(value)
        if (type === "date") return date.toLocaleDateString()
        if (type === "time") return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        if (type === "datetime") return `${date.toLocaleDateString()}  ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    }

    const icon_name = type === "time" ? "clock" : "calendar"

    return (
        <InputLayout
            label={label}
            required={required}
            error={error}
            onPress={disabled ? undefined : toggleOpen}
        >
            <View style={styles.input}>
                <Text
                    color={colors.white}
                >
                    {getDisplayValue() || placeholder}
                </Text>
            </View>
            <Icon name={icon_name} size={24} color={colors.white} onPress={toggleOpen} />

            <DatePicker
                modal
                open={open}
                date={value ? new Date(value) : new Date()}
                mode={type}
                onConfirm={(date) => {
                    toggleOpen()
                    onChangeText(date)
                }}
                onCancel={toggleOpen}
            />
        </InputLayout >
    )
}

export default memo(DateTimeInput)

const styles = StyleSheet.create({
    input: {
        flex: 1,
        width: "100%",
    },
})