import { memo, useCallback } from "react"
import { StyleSheet, View } from "react-native"
import { useSelector } from "react-redux"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import { selectUser } from "../../redux/selectors"
import Icon from "../Icon"
import Row from "../Row"
import Text from "../Text"

const ProfileHeader = () => {

    const user = useSelector(selectUser)

    const onEditPress = useCallback(() => {
        navigate(ROUTES.EDIT_PROFILE)
    }, [])

    return (
        <Row align="center" gap={14} style={styles.container}>
            <Icon rounded="full" source={{ uri: user?.image_url }} size={72} resize="cover" border={colors.white} />
            <View style={styles.content}>
                <Text size={20} weight="bold" lines={1}>
                    {user?.name}
                </Text>
                <Text size={14} color={colors.gray} lines={1}>
                    {user?.email}
                </Text>
            </View>
            <Icon space name="square-pen" size={40} color={colors.primary} background={colors.background} rounded={"half"} border={colors.light_gray} onPress={onEditPress} />
        </Row>
    )
}

export default memo(ProfileHeader)

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingHorizontal: widthPixel(16),
        paddingVertical: heightPixel(16),
        borderRadius: heightPixel(16),
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
        overflow: "hidden",
    },
    content: {
        flex: 1,
    }
})
