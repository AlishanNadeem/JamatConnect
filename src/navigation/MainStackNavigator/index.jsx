import { createStackNavigator } from "@react-navigation/stack"
import { useSelector } from "react-redux"
import { NAVIGATORS } from "../../helpers/routes"
import { selectIsAuthenticated } from "../../redux/selectors"
import AppStackNavigator from "../AppStackNavigator"
import AuthStackNavigator from "../AuthStackNavigator"

const Stack = createStackNavigator()

const MainStackNavigator = () => {

    const is_logged_in = useSelector(selectIsAuthenticated)

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {
                is_logged_in ?
                    <Stack.Screen name={NAVIGATORS.APP_STACK} component={AppStackNavigator} />
                    :
                    <Stack.Screen name={NAVIGATORS.AUTH_STACK} component={AuthStackNavigator} />
            }
        </Stack.Navigator>
    )
}

export default MainStackNavigator
