import { createStackNavigator } from "@react-navigation/stack"
import { useSelector } from "react-redux"
import { GLOBAL_HEADER_OPTIONS, ROUTES, ROUTES_OPTIONS } from "../../helpers/routes"
import { selectFirstLaunch } from "../../redux/selectors"
import ForgotPassword from "../../screens/Auth/ForgotPassword"
import Login from "../../screens/Auth/Login"
import SetPassword from "../../screens/Auth/SetPassword"
import Signup from "../../screens/Auth/Signup"
import VerifyCode from "../../screens/Auth/VerifyCode"
import Onboarding from "../../screens/Onboarding"

const Stack = createStackNavigator()

const AuthStackNavigator = () => {

    const first_launch = useSelector(selectFirstLaunch)

    return (
        <Stack.Navigator screenOptions={GLOBAL_HEADER_OPTIONS}>
            {
                first_launch &&
                <Stack.Screen name={ROUTES.ONBOARDING} component={Onboarding} options={ROUTES_OPTIONS[ROUTES.ONBOARDING]} />
            }
            <Stack.Screen name={ROUTES.LOGIN} component={Login} options={ROUTES_OPTIONS[ROUTES.LOGIN]} />
            <Stack.Screen name={ROUTES.SIGNUP} component={Signup} options={ROUTES_OPTIONS[ROUTES.SIGNUP]} />
            <Stack.Screen name={ROUTES.FORGET_PASSWORD} component={ForgotPassword} options={ROUTES_OPTIONS[ROUTES.FORGET_PASSWORD]} />
            <Stack.Screen name={ROUTES.VERIFY_CODE} component={VerifyCode} options={ROUTES_OPTIONS[ROUTES.VERIFY_CODE]} />
            <Stack.Screen name={ROUTES.SET_PASSWORD} component={SetPassword} options={ROUTES_OPTIONS[ROUTES.SET_PASSWORD]} />
        </Stack.Navigator>
    )
}

export default AuthStackNavigator