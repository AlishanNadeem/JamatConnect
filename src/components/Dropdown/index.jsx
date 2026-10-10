import { memo, useCallback, useMemo } from "react"
import { StyleSheet } from "react-native"
import useToggle from "../../hooks/useToggle"
import InputLayout from "../../layouts/InputLayout"
import colors from "../../helpers/colors"
import DropDownModal from "../DropDownModal"
import Icon from "../Icon"
import Text from "../Text"

const Dropdown = ({
    label,
    required = false,
    placeholder = "Select",
    options = [],
    value,
    onChange,
    onBlur,
    error,
    loading = false,
    disabled = false,
    title,
}) => {

    const { value: visible, toggle, set: setVisible } = useToggle()

    const selected_option = useMemo(
        () => options.find((option) => option.value === value),
        [options, value],
    )

    const display_text = loading
        ? "Loading..."
        : selected_option?.label || placeholder

    const handleOpen = useCallback(() => {
        if (loading || disabled) return
        toggle()
    }, [disabled, loading, toggle])

    const handleClose = useCallback(() => {
        setVisible(false)
    }, [setVisible])

    const handleSelect = useCallback((option) => {
        onChange?.(option)
    }, [onChange])

    return (
        <>
            <InputLayout
                label={label}
                required={required}
                onPress={disabled ? undefined : handleOpen}
                error={error}
                wrapper_style={[styles.wrapper, disabled && styles.wrapper_disabled]}
            >
                <Text
                    lines={1}
                    color={disabled ? colors.gray : selected_option ? colors.black : colors.gray}
                    style={styles.text}
                >
                    {display_text}
                </Text>
                <Icon name="chevron-down" size={20} color={disabled ? colors.gray : colors.black} />
            </InputLayout>

            <DropDownModal
                visible={visible}
                onClose={handleClose}
                onSelect={handleSelect}
                data={options}
                title={title || label}
                labelKey="label"
                keyExtractor={(item) => String(item.value)}
            />
        </>
    )
}

export default memo(Dropdown)

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: "space-between",
    },
    wrapper_disabled: {
        backgroundColor: colors.background,
    },
    text: {
        flex: 1,
    },
})
