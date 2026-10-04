import { memo } from "react"
import { StyleSheet, View } from "react-native"
import { useSelector } from "react-redux"
import colors from "../../../helpers/colors"
import { heightPixel, widthPixel } from "../../../helpers/metrics"
import { navigate } from "../../../helpers/navigation"
import { ROUTES } from "../../../helpers/routes"
import { selectIsAuthenticated } from "../../../redux/selectors"
import { useGetUnreadNotificationCountQuery } from "../../../redux/apis/Notification"
import Icon from "../../Icon"
import Text from "../../Text"

const NotificationsBell = () => {

    const is_authenticated = useSelector(selectIsAuthenticated)

    const { data } = useGetUnreadNotificationCountQuery(undefined, {
        skip: !is_authenticated,
    })

    const count = data?.data?.count ?? 0
    const badge_label = count > 99 ? "99+" : String(count)

    return (
        <View style={styles.wrap}>
            <Icon
                name="bell"
                size={36}
                space
                rounded="half"
                background={colors.lightest_primary}
                color={colors.primary}
                onPress={() => navigate(ROUTES.NOTIFICATIONS)}
            />
            {count > 0 ? (
                <View style={styles.badge}>
                    <Text size={9} weight="semibold" color={colors.white} align="center">
                        {badge_label}
                    </Text>
                </View>
            ) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        position: "relative",
    },
    badge: {
        position: "absolute",
        top: -heightPixel(2),
        right: -widthPixel(2),
        minWidth: heightPixel(18),
        height: heightPixel(18),
        borderRadius: heightPixel(9),
        paddingHorizontal: widthPixel(4),
        backgroundColor: colors.danger,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: heightPixel(1.5),
        borderColor: colors.white,
    },
})

export default memo(NotificationsBell)
