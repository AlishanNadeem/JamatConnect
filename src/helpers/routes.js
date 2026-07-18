import HeaderLeft from "../components/Navigation/HeaderLeft";
import HeaderRight from "../components/Navigation/HeaderRight";
import HeaderTitle from "../components/Navigation/HeaderTitle";
import colors from "./colors";
import { GLOBAL_HORIZONTAL_PADDING, HEADER_HEIGHT } from "./metrics";
import { goBack, navigate } from "./navigation";

const screenOptionsWithTitle = (title, type = "primary") => ({
    headerTitle: ({ children }) => (
        <HeaderTitle title={title || children} type={type} />
    ),
})

const HEADER_LEFT = {
    back: () => <HeaderLeft name="chevron-left" onPress={goBack} type="secondary" />,
    none: null,
}

const HEADER_RIGHT = {
    notifications: () => <HeaderRight name="bell" onPress={() => navigate(ROUTES.NOTIFICATIONS)} />,
    none: null,
}

export const NAVIGATORS = {
    AUTH_STACK: "AuthStackNavigator",
    COMPLETE_PROFILE_STACK: "CompleteProfileStackNavigator",
    APP_DRAWER: "AppDrawerNavigator",
    APP_STACK: "AppStackNavigator",
    BOTTOM: "BottomNavigator",
}

export const ROUTES = {
    // Auth
    ONBOARDING: "Onboarding",
    LOGIN: "Login",
    SIGNUP: "Signup",
    FORGET_PASSWORD: "ForgetPassword",
    VERIFY_CODE: "VerifyCode",
    SET_PASSWORD: "SetPassword",
    COMPLETE_PROFILE: "CompleteProfile",

    HOME: "Home",
    CONFIGURE: "Configure",
    CONTACTS: "Contacts",
    MY_PROFILE: "MyProfile",

    CHECKIN_SETTINGS: "CheckInSetting",
    MANAGE_CONTACT: "ManageContact",
    ALERT_DETAILS: "AlertDetails",
    MAP: "Map",
    DAILY_CHECK_IN: "DailyCheckIn",


    CONTACT_US: "ContactUs",
    ABOUT_US: "AboutUs",
    TERMS_AND_CONDITIONS: "TermsAndConditions",
    PRIVACY_POLICY: "PrivacyPolicy",
    CHANGE_PASSWORD: "ChangePassword",
    EDIT_PROFILE: "EditProfile",
    NOTIFICATIONS: "Notifications",

}

export const ROUTES_OPTIONS = {

    [NAVIGATORS.BOTTOM]: {
        ...screenOptionsWithTitle(undefined, "secondary"),
        headerLeft: HEADER_LEFT.none,
        headerRight: HEADER_RIGHT.notifications
    },

    [NAVIGATORS.APP_STACK]: {
        headerShown: false,
    },

    [ROUTES.ONBOARDING]: {
        headerShown: false,
    },

    [ROUTES.LOGIN]: {
        headerShown: false,
    },

    [ROUTES.SIGNUP]: {
        headerShown: false,
    },

    [ROUTES.FORGET_PASSWORD]: {
        headerShown: false,
    },

    [ROUTES.VERIFY_CODE]: {
        headerShown: false,
    },

    [ROUTES.SET_PASSWORD]: {
        headerShown: false,
    },

    [ROUTES.COMPLETE_PROFILE]: {
        headerShown: false,
    },

    [ROUTES.SUBSCRIPTION_PLANS]: {
        ...screenOptionsWithTitle("Subscription Plans"),
        headerLeft: HEADER_LEFT.back,
        in_drawer: true,
        drawer_label: "Subscribed Platforms",
    },

    [ROUTES.HOME]: {
        headerShown: false,
        in_drawer: true,
        drawer_label: "Home",
    },

    [ROUTES.CONFIGURE]: {
        headerShown: false,
    },

    [ROUTES.CONTACTS]: {
        headerShown: false,
    },

    [ROUTES.MY_PROFILE]: {
        headerShown: false,
    },

    [ROUTES.CHECKIN_SETTINGS]: {
        ...screenOptionsWithTitle("Check-in Settings"),
        headerLeft: HEADER_LEFT.back,
    },

    [ROUTES.MANAGE_CONTACT]: {
        ...screenOptionsWithTitle(),
        headerLeft: HEADER_LEFT.back,
    },

    [ROUTES.ALERT_DETAILS]: {
        ...screenOptionsWithTitle("SOS Alert Details"),
        headerLeft: HEADER_LEFT.back,
    },

    [ROUTES.MAP]: {
        ...screenOptionsWithTitle("Map"),
        headerLeft: HEADER_LEFT.back,
    },

    [ROUTES.DAILY_CHECK_IN]: {
        ...screenOptionsWithTitle("Daily Check-in"),
        headerLeft: HEADER_LEFT.back,
    },

    [ROUTES.CONTACT_US]: {
        ...screenOptionsWithTitle("Contact Us"),
        headerLeft: HEADER_LEFT.back,
        headerRight: HEADER_RIGHT.notifications,
    },

    [ROUTES.TERMS_AND_CONDITIONS]: {
        ...screenOptionsWithTitle("Terms & Conditions"),
        headerLeft: HEADER_LEFT.back,
        headerRight: HEADER_RIGHT.notifications,
    },

    [ROUTES.ABOUT_US]: {
        ...screenOptionsWithTitle("About Us"),
        headerLeft: HEADER_LEFT.back,
        headerRight: HEADER_RIGHT.notifications,
    },

    [ROUTES.PRIVACY_POLICY]: {
        ...screenOptionsWithTitle("Privacy Policy"),
        headerLeft: HEADER_LEFT.back,
        headerRight: HEADER_RIGHT.notifications,
    },

    [ROUTES.CHANGE_PASSWORD]: {
        ...screenOptionsWithTitle("Change Password"),
        headerLeft: HEADER_LEFT.back,
    },

    [ROUTES.EDIT_PROFILE]: {
        ...screenOptionsWithTitle("Edit Profile"),
        headerLeft: HEADER_LEFT.back,
    },

    [ROUTES.NOTIFICATIONS]: {
        ...screenOptionsWithTitle("Notifications"),
        headerLeft: HEADER_LEFT.back,
    },

}

export const GLOBAL_HEADER_OPTIONS = {
    headerShown: true,
    headerTitleAlign: "left",
    headerTransparent: true,
    headerTintColor: colors.white,
    headerBackButtonVisible: false,
    headerLeftContainerStyle: { paddingLeft: GLOBAL_HORIZONTAL_PADDING },
    headerRightContainerStyle: { paddingRight: GLOBAL_HORIZONTAL_PADDING },
    headerStyle: { height: HEADER_HEIGHT },
    // animation: "slide_from_right",
}