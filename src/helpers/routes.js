import HeaderLeft from "../components/Navigation/HeaderLeft"
import HeaderTitle from "../components/Navigation/HeaderTitle"
import NotificationsBell from "../components/Navigation/NotificationsBell"
import colors from "./colors"
import { GLOBAL_HORIZONTAL_PADDING, HEADER_HEIGHT } from "./metrics"
import { goBack } from "./navigation"

const headerBack = () => (
    <HeaderLeft name="chevron-left" onPress={goBack} type="secondary" />
)

const headerNotifications = () => <NotificationsBell />

const withTitle = (title, { has_back_button = false } = {}) => ({
    headerTitle: ({ children }) => (
        <HeaderTitle
            title={title || children}
            has_back_button={has_back_button}
        />
    ),
    ...(has_back_button ? { headerLeft: headerBack } : {}),
})

const withLogo = () => ({
    headerTitle: () => <HeaderTitle type="logo" />,
})

const TAB_HEADER = {
    headerLeft: null,
    headerLeftContainerStyle: { paddingLeft: 0 },
    headerTitleContainerStyle: {
        marginHorizontal: 0,
        paddingLeft: GLOBAL_HORIZONTAL_PADDING,
    },
    headerRight: headerNotifications,
}

const tabScreen = (title) => ({
    ...withTitle(title),
    ...TAB_HEADER,
})

const backScreen = (title, { notifications = false } = {}) => ({
    ...withTitle(title, { has_back_button: true }),
    ...(notifications ? { headerRight: headerNotifications } : {}),
})

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
    BUSINESSES: "Businesses",
    JOBS: "Jobs",
    MARKETPLACE: "Marketplace",
    MARKETPLACE_DETAILS: "MarketplaceDetails",
    MY_PROFILE: "MyProfile",
    EDIT_PROFILE: "EditProfile",
    CHANGE_PASSWORD: "ChangePassword",
    NOTIFICATIONS: "Notifications",
    ABOUT_US: "AboutUs",
    TERMS_AND_CONDITIONS: "TermsAndConditions",
    PRIVACY_POLICY: "PrivacyPolicy",
    CONTACT_US: "ContactUs",
    REFERRALS: "Referrals",
    REFERRAL_USERS: "ReferralUsers",
    MY_BUSINESSES: "MyBusinesses",
    CREATE_BUSINESS: "CreateBusiness",
    MY_BUSINESS_DETAILS: "MyBusinessDetails",
    MY_LISTINGS: "MyListings",
    SAVED_BUSINESSES: "SavedBusinesses",
    CREATE_LISTING: "CreateListing",
    CREATE_JOB: "CreateJob",
    JOB_DETAILS: "JobDetails",
    BUSINESS_DETAILS: "BusinessDetails",
    BUSINESS_REVIEWS: "BusinessReviews",
    BUSINESS_JOBS: "BusinessJobs",
    CATEGORIES: "Categories",
}

const HIDDEN_HEADER = { headerShown: false }

export const ROUTES_OPTIONS = {
    [NAVIGATORS.BOTTOM]: HIDDEN_HEADER,
    [NAVIGATORS.APP_STACK]: HIDDEN_HEADER,

    [ROUTES.ONBOARDING]: HIDDEN_HEADER,
    [ROUTES.LOGIN]: HIDDEN_HEADER,
    [ROUTES.SIGNUP]: HIDDEN_HEADER,
    [ROUTES.FORGET_PASSWORD]: HIDDEN_HEADER,
    [ROUTES.VERIFY_CODE]: HIDDEN_HEADER,
    [ROUTES.SET_PASSWORD]: HIDDEN_HEADER,

    // Bottom tabs
    [ROUTES.HOME]: { ...withLogo(), ...TAB_HEADER },
    [ROUTES.BUSINESSES]: tabScreen("Businesses"),
    [ROUTES.JOBS]: tabScreen("Jobs"),
    [ROUTES.MARKETPLACE]: tabScreen("Marketplace"),
    [ROUTES.MY_PROFILE]: tabScreen("More Options"),

    // Stack screens with back
    [ROUTES.MARKETPLACE_DETAILS]: backScreen("Listing Details"),
    [ROUTES.EDIT_PROFILE]: backScreen("Edit Profile"),
    [ROUTES.CHANGE_PASSWORD]: backScreen("Change Password"),
    [ROUTES.NOTIFICATIONS]: backScreen("Notifications"),
    [ROUTES.ABOUT_US]: backScreen("About Us", { notifications: true }),
    [ROUTES.TERMS_AND_CONDITIONS]: backScreen("Terms & Conditions", { notifications: true }),
    [ROUTES.PRIVACY_POLICY]: backScreen("Privacy Policy", { notifications: true }),
    [ROUTES.CONTACT_US]: backScreen("Contact Us", { notifications: true }),
    [ROUTES.REFERRALS]: backScreen("Referrals"),
    [ROUTES.REFERRAL_USERS]: backScreen("Referred Users"),
    [ROUTES.MY_BUSINESSES]: backScreen("My Businesses"),
    [ROUTES.CREATE_BUSINESS]: backScreen("Add Business"),
    [ROUTES.MY_BUSINESS_DETAILS]: backScreen("My Business"),
    [ROUTES.MY_LISTINGS]: backScreen("My Listings"),
    [ROUTES.SAVED_BUSINESSES]: backScreen("Saved"),
    [ROUTES.CREATE_LISTING]: backScreen("Add Listing"),
    [ROUTES.CREATE_JOB]: backScreen("Post a Job"),
    [ROUTES.JOB_DETAILS]: backScreen("Job Details"),
    [ROUTES.BUSINESS_DETAILS]: backScreen("Business Details"),
    [ROUTES.BUSINESS_REVIEWS]: backScreen("Reviews"),
    [ROUTES.BUSINESS_JOBS]: backScreen("Business Jobs"),
    [ROUTES.CATEGORIES]: backScreen("Categories"),
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
