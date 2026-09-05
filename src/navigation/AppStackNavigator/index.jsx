import { createStackNavigator } from "@react-navigation/stack"
import { GLOBAL_HEADER_OPTIONS, NAVIGATORS, ROUTES, ROUTES_OPTIONS } from "../../helpers/routes"
import BusinessDetails from "../../screens/BusinessDetails"
import BusinessReviews from "../../screens/BusinessReviews"
import Categories from "../../screens/Categories"
import CreateBusiness from "../../screens/CreateBusiness"
import CreateJob from "../../screens/CreateJob"
import CreateListing from "../../screens/CreateListing"
import JobDetails from "../../screens/JobDetails"
import MarketplaceDetails from "../../screens/MarketplaceDetails"
import MyBusinessDetails from "../../screens/MyBusinessDetails"
import MyBusinesses from "../../screens/MyBusinesses"
import MyListings from "../../screens/MyListings"
import Referrals from "../../screens/Referrals"
import ReferralUsers from "../../screens/ReferralUsers"
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
            <Stack.Screen name={ROUTES.REFERRALS} component={Referrals} options={ROUTES_OPTIONS[ROUTES.REFERRALS]} />
            <Stack.Screen name={ROUTES.REFERRAL_USERS} component={ReferralUsers} options={ROUTES_OPTIONS[ROUTES.REFERRAL_USERS]} />
            <Stack.Screen name={ROUTES.MY_BUSINESSES} component={MyBusinesses} options={ROUTES_OPTIONS[ROUTES.MY_BUSINESSES]} />
            <Stack.Screen name={ROUTES.CREATE_BUSINESS} component={CreateBusiness} options={ROUTES_OPTIONS[ROUTES.CREATE_BUSINESS]} />
            <Stack.Screen name={ROUTES.MY_BUSINESS_DETAILS} component={MyBusinessDetails} options={ROUTES_OPTIONS[ROUTES.MY_BUSINESS_DETAILS]} />
            <Stack.Screen name={ROUTES.MY_LISTINGS} component={MyListings} options={ROUTES_OPTIONS[ROUTES.MY_LISTINGS]} />
            <Stack.Screen name={ROUTES.CREATE_LISTING} component={CreateListing} options={ROUTES_OPTIONS[ROUTES.CREATE_LISTING]} />
            <Stack.Screen name={ROUTES.CREATE_JOB} component={CreateJob} options={ROUTES_OPTIONS[ROUTES.CREATE_JOB]} />
            <Stack.Screen name={ROUTES.JOB_DETAILS} component={JobDetails} options={ROUTES_OPTIONS[ROUTES.JOB_DETAILS]} />
            <Stack.Screen name={ROUTES.BUSINESS_DETAILS} component={BusinessDetails} options={ROUTES_OPTIONS[ROUTES.BUSINESS_DETAILS]} />
            <Stack.Screen name={ROUTES.BUSINESS_REVIEWS} component={BusinessReviews} options={ROUTES_OPTIONS[ROUTES.BUSINESS_REVIEWS]} />
            <Stack.Screen name={ROUTES.MARKETPLACE_DETAILS} component={MarketplaceDetails} options={ROUTES_OPTIONS[ROUTES.MARKETPLACE_DETAILS]} />
            <Stack.Screen name={ROUTES.CATEGORIES} component={Categories} options={ROUTES_OPTIONS[ROUTES.CATEGORIES]} />
            <Stack.Screen name={ROUTES.ABOUT_US} component={AboutUs} options={ROUTES_OPTIONS[ROUTES.ABOUT_US]} />
            <Stack.Screen name={ROUTES.TERMS_AND_CONDITIONS} component={TermsAndConditions} options={ROUTES_OPTIONS[ROUTES.TERMS_AND_CONDITIONS]} />
            <Stack.Screen name={ROUTES.PRIVACY_POLICY} component={PrivacyPolicy} options={ROUTES_OPTIONS[ROUTES.PRIVACY_POLICY]} />
            <Stack.Screen name={ROUTES.CONTACT_US} component={ContactUs} options={ROUTES_OPTIONS[ROUTES.CONTACT_US]} />
        </Stack.Navigator>
    )
}

export default AppStackNavigator
