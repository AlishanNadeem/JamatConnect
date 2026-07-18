import { createStackNavigator } from "@react-navigation/stack"
import { GLOBAL_HEADER_OPTIONS, NAVIGATORS, ROUTES, ROUTES_OPTIONS } from "../../helpers/routes"
import AboutUs from "../../screens/AboutUs"
import ChangePassword from "../../screens/ChangePassword"
import ContactUs from "../../screens/ContactUs"
import EditProfile from "../../screens/EditProfile"
import Notifications from "../../screens/Notifications"
import PrivacyPolicy from "../../screens/PrivacyPolicy"
import TermsAndConditions from "../../screens/TermsAndConditions"
import BottomNavigator from "../BottomNavigator"

const Stack = createStackNavigator()

const AppStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={GLOBAL_HEADER_OPTIONS}>
            <Stack.Screen name={NAVIGATORS.BOTTOM} component={BottomNavigator} options={ROUTES_OPTIONS[NAVIGATORS.BOTTOM]} />

            <Stack.Screen name={ROUTES.CHANGE_PASSWORD} component={ChangePassword} options={ROUTES_OPTIONS[ROUTES.CHANGE_PASSWORD]} />
            <Stack.Screen name={ROUTES.EDIT_PROFILE} component={EditProfile} options={ROUTES_OPTIONS[ROUTES.EDIT_PROFILE]} />

            <Stack.Screen name={ROUTES.NOTIFICATIONS} component={Notifications} options={ROUTES_OPTIONS[ROUTES.NOTIFICATIONS]} />
            <Stack.Screen name={ROUTES.ABOUT_US} component={AboutUs} options={ROUTES_OPTIONS[ROUTES.ABOUT_US]} />
            <Stack.Screen name={ROUTES.TERMS_AND_CONDITIONS} component={TermsAndConditions} options={ROUTES_OPTIONS[ROUTES.TERMS_AND_CONDITIONS]} />
            <Stack.Screen name={ROUTES.PRIVACY_POLICY} component={PrivacyPolicy} options={ROUTES_OPTIONS[ROUTES.PRIVACY_POLICY]} />
            <Stack.Screen name={ROUTES.CONTACT_US} component={ContactUs} options={ROUTES_OPTIONS[ROUTES.CONTACT_US]} />
        </Stack.Navigator>
    )
}

export default AppStackNavigator
