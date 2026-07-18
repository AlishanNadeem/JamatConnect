import { memo } from "react"
import { StyleSheet, View } from "react-native"
import images from "../../assets/images"
import Icon from "../../components/Icon"
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper"
import Text from "../../components/Text"
import colors from "../../helpers/colors"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../PrimaryLayout"

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <PrimaryLayout background>
            <KeyboardAvoidingWrapper>
                <View style={styles.inner}>
                    <View style={styles.logo_container}>
                        <Icon source={images.logo} size={190} />
                    </View>
                    <View style={styles.content}>
                        <Text align="center" size={30} weight="bold" color={colors.black}>{title}</Text>
                        {subtitle && <Text align="center" weight="semibold" color={colors.gray} style={styles.subtitle}>{subtitle}</Text>}
                        <View style={styles.children_container}>
                            {children}
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingWrapper>
        </PrimaryLayout>
    )
}

const styles = StyleSheet.create({
    inner: {
        flexGrow: 1,
    },
    logo_container: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: heightPixel(50)
    },
    content: {
        flex: 1,
        width: "100%",
        alignItems: "center"
    },
    children_container: {
        flexGrow: 1,
        width: "100%",
    },
    subtitle: {
        marginTop: heightPixel(4),
    },
})

export default memo(AuthLayout)