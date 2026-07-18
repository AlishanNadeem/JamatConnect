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

    // App
    HOME: "Home",
    MY_PROFILE: "MyProfile",
    EDIT_PROFILE: "EditProfile",
    CHANGE_PASSWORD: "ChangePassword",
    NOTIFICATIONS: "Notifications",
    ABOUT_US: "AboutUs",
    TERMS_AND_CONDITIONS: "TermsAndConditions",
    PRIVACY_POLICY: "PrivacyPolicy",
    CONTACT_US: "ContactUs",
    REFERRALS: "Referrals",
}

export const ROUTES_OPTIONS = {
    [NAVIGATORS.BOTTOM]: {
        ...screenOptionsWithTitle(undefined, "secondary"),
        headerLeft: HEADER_LEFT.none,
        headerRight: HEADER_RIGHT.notifications,
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

    [ROUTES.HOME]: {
        headerShown: false,
    },

    [ROUTES.MY_PROFILE]: {
        headerShown: false,
    },

    [ROUTES.EDIT_PROFILE]: {
        ...screenOptionsWithTitle("Edit Profile"),
        headerLeft: HEADER_LEFT.back,
    },

    [ROUTES.CHANGE_PASSWORD]: {
        ...screenOptionsWithTitle("Change Password"),
        headerLeft: HEADER_LEFT.back,
    },

    [ROUTES.NOTIFICATIONS]: {
        ...screenOptionsWithTitle("Notifications"),
        headerLeft: HEADER_LEFT.back,
    },

    [ROUTES.ABOUT_US]: {
        ...screenOptionsWithTitle("About Us"),
        headerLeft: HEADER_LEFT.back,
        headerRight: HEADER_RIGHT.notifications,
    },

    [ROUTES.TERMS_AND_CONDITIONS]: {
        ...screenOptionsWithTitle("Terms & Conditions"),
        headerLeft: HEADER_LEFT.back,
        headerRight: HEADER_RIGHT.notifications,
    },

    [ROUTES.PRIVACY_POLICY]: {
        ...screenOptionsWithTitle("Privacy Policy"),
        headerLeft: HEADER_LEFT.back,
        headerRight: HEADER_RIGHT.notifications,
    },

    [ROUTES.CONTACT_US]: {
        ...screenOptionsWithTitle("Contact Us"),
        headerLeft: HEADER_LEFT.back,
        headerRight: HEADER_RIGHT.notifications,
    },

    [ROUTES.REFERRALS]: {
        ...screenOptionsWithTitle("Referrals"),
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
}
