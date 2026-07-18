import { memo } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../helpers/colors';
import { heightPixel, widthPixel } from '../../helpers/metrics';
import { global_styles } from '../../helpers/styles';
import Icon from '../Icon';
import Row from '../Row';
import Text from '../Text';
import Touchable from '../Touchable';

const BUTTON_SIZES = {
    sm: { height: heightPixel(40), font_size: 12, padding_horizontal: widthPixel(16) },
    md: { height: heightPixel(52), font_size: 14, padding_horizontal: widthPixel(20) },
    lg: { height: heightPixel(62), font_size: 22, padding_horizontal: widthPixel(24) },
};

const BUTTON_TYPES = {
    primary: {
        background: [colors.primary, colors.primary],
        color: colors.white,
        border_color: colors.transparent,
    },
    secondary: {
        background: [colors.white, colors.white],
        color: colors.dark_primary,
        border_color: colors.transparent,
    },
    muted: {
        background: [colors.lightest_white, colors.lightest_white],
        color: colors.white,
        border_color: colors.transparent,
    },
    transparent: {
        background: [colors.transparent, colors.transparent],
        color: colors.white,
        border_color: colors.white,
    },
    danger: {
        background: [colors.danger, colors.danger],
        color: colors.white,
        border_color: colors.transparent,
    },
    black: {
        background: [colors.black, colors.black],
        color: colors.white,
        border_color: colors.white,
    },
}

const Button = ({
    children,
    onPress,
    size = 'md',
    type = 'primary',
    disabled = false,
    loading = false,
    icon,
    rounded,
    style = {}
}) => {

    const button_size = BUTTON_SIZES[size]
    const button_type = BUTTON_TYPES[type]
    const border_radius_config = {
        quarter: heightPixel(button_size.height / 8),
        half: heightPixel(button_size.height / 4),
        full: heightPixel(button_size.height / 2),
    }

    const border_radius = rounded ? border_radius_config[rounded] : heightPixel(8)

    return (
        <Touchable onPress={onPress} disabled={disabled || loading} >
            <LinearGradient
                colors={button_type.background}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                    styles.button,
                    style,
                    {
                        height: button_size.height,
                        borderColor: button_type.border_color,
                        borderRadius: border_radius,
                    },
                ]}
            >
                {
                    loading ? (
                        <ActivityIndicator color={button_type.color} />
                    ) : (
                        <Row align='center' justify='center' gap={8} style={[global_styles.auto_width, { paddingHorizontal: button_size.padding_horizontal }]}>
                            {icon && <Icon source={icon} size={button_size.font_size + 6} />}
                            {children && <Text align='center' size={button_size.font_size} color={button_type.color} weight='semibold'>{children}</Text>}
                        </Row>
                    )
                }
            </LinearGradient>
        </Touchable >
    );
};

export default memo(Button);

const styles = StyleSheet.create({
    button: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: heightPixel(8),
        borderWidth: heightPixel(1),
    },
});