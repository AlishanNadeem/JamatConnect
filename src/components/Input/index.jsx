import { memo, useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, TextInput } from "react-native";
import fonts from "../../assets/fonts";
import colors from "../../helpers/colors";
import { font, heightPixel } from "../../helpers/metrics";
import InputLayout from "../../layouts/InputLayout";
import Icon from "../Icon";

const TYPE_CONFIG = {
    text: {
        keyboardType: "default",
        autoCapitalize: "sentences",
        autoCorrect: true,
        multiline: false,
        secureTextEntry: false,
    },
    email: {
        keyboardType: "email-address",
        autoCapitalize: "none",
        autoCorrect: false,
        multiline: false,
        secureTextEntry: false,
    },
    password: {
        keyboardType: "default",
        autoCapitalize: "none",
        autoCorrect: false,
        multiline: false,
        secureTextEntry: true,
    },
    number: {
        keyboardType: "numeric",
        autoCapitalize: "none",
        autoCorrect: false,
        multiline: false,
        secureTextEntry: false,
    },
    textarea: {
        keyboardType: "default",
        autoCapitalize: "sentences",
        autoCorrect: true,
        multiline: true,
        secureTextEntry: false,
    },
}

const Input = ({
    value,
    onChangeText,
    placeholder = "",
    type = "text",
    label,
    required = false,
    icon,
    onIconPress,
    error = "",
    disabled = false
}) => {

    const [is_password_visible, setPasswordVisible] = useState(false)
    const is_password_type = type === "password"
    const is_textarea = type === "textarea"
    const config = TYPE_CONFIG[type] ?? TYPE_CONFIG.text

    const error_opacity = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(error_opacity, {
            toValue: error ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start()
    }, [error])

    const togglePassword = () => setPasswordVisible(prev => !prev)

    return (
        <InputLayout
            label={label}
            required={required}
            error={error}
            wrapper_style={[is_textarea && styles.input_wrapper_textarea]}
        >
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.gray}
                keyboardType={config.keyboardType}
                autoCapitalize={config.autoCapitalize}
                autoCorrect={config.autoCorrect}
                secureTextEntry={is_password_type && !is_password_visible}
                multiline={config.multiline}
                numberOfLines={is_textarea ? 5 : 1}
                allowFontScaling={false}
                cursorColor={colors.light_primary}
                textAlignVertical={is_textarea ? "top" : "center"}
                style={[
                    styles.input,
                    is_textarea && styles.input_textarea,
                ]}
                editable={!disabled}
            />
            {is_password_type ? (
                <Icon
                    name={is_password_visible ? "eye-off" : "eye"}
                    size={20}
                    color={colors.black}
                    onPress={togglePassword}
                />
            ) : icon ? (
                <Icon
                    {...(typeof icon === "string" ? { name: icon } : { source: icon })}
                    size={20}
                    color={colors.black}
                    onPress={onIconPress}
                />
            ) : null}
        </InputLayout>
    )
}

export default memo(Input)

const styles = StyleSheet.create({
    input_wrapper_textarea: {
        height: heightPixel(150),
        borderRadius: heightPixel(16),
        alignItems: "flex-start",
        paddingVertical: heightPixel(4),
    },
    input: {
        flex: 1,
        fontFamily: fonts.primary.regular,
        color: colors.black,
        fontSize: font(14)
    },
    input_textarea: {
        height: "100%",
    },
})