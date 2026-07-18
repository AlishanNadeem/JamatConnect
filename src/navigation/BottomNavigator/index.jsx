import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StyleSheet, View } from "react-native"
import Icon from "../../components/Icon"
import Text from "../../components/Text"
import colors from "../../helpers/colors"
import { BOTTOM_BAR_HEIGHT, BOTTOM_INSET, heightPixel } from "../../helpers/metrics"
import { GLOBAL_HEADER_OPTIONS, ROUTES, ROUTES_OPTIONS } from "../../helpers/routes"
import Home from "../../screens/Home"
import MyProfile from "../../screens/MyProfile"

const Tab = createBottomTabNavigator()

const TabIcon = ({ name, label, focused }) => (
    <View style={styles.tab_item}>
        <Icon
            name={name}
            size={20}
            color={focused ? colors.light_primary : colors.white}
        />
        <Text
            size={10}
            lines={1}
            weight={"semibold"}
            color={focused ? colors.light_primary : colors.white}
        >
            {label}
        </Text>
    </View>
)

const BottomNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                ...GLOBAL_HEADER_OPTIONS,
                tabBarShowLabel: false,
                tabBarStyle: styles.tab_bar,
                tabBarIconStyle: styles.tab_bar_item
            }}
        >
            <Tab.Screen
                name={ROUTES.HOME}
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon name="house" label="Home" focused={focused} />
                    ),
                    ...ROUTES_OPTIONS[ROUTES.HOME]
                }}
            />
            <Tab.Screen
                name={ROUTES.MY_PROFILE}
                component={MyProfile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon name="user" label="Profile" focused={focused} />
                    ),
                    ...ROUTES_OPTIONS[ROUTES.MY_PROFILE]
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomNavigator

const styles = StyleSheet.create({
    tab_bar: {
        backgroundColor: colors.primary,
        borderTopWidth: heightPixel(1),
        borderTopColor: colors.light_primary,
        height: BOTTOM_BAR_HEIGHT + BOTTOM_INSET,
        paddingTop: heightPixel(8),
        paddingBottom: BOTTOM_INSET,
        paddingHorizontal: 0,
    },
    tab_bar_item: {
        flex: 1,
        width: "100%",
        paddingTop: 0,
        paddingBottom: 0,
        paddingHorizontal: 0,
    },
    tab_item: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: heightPixel(6),
    },
})
