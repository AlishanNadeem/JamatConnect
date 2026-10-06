import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useModal } from "../../contexts/ModalContext"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import { authApi } from "../../redux/apis/Auth"
import { baseApi } from "../../redux/apis/Base"
import { clearCredentials } from "../../redux/slices/auth.slice"
import { clearUserData } from "../../redux/slices/general.slice"

const useMyProfileController = () => {

    const dispatch = useDispatch()
    const { showConfirmModal } = useModal()

    const onMyBusiness = useCallback(() => {
        navigate(ROUTES.MY_BUSINESSES)
    }, [])

    const onMyListings = useCallback(() => {
        navigate(ROUTES.MY_LISTINGS)
    }, [])

    const onBillboard = useCallback(() => {
        navigate(ROUTES.BILLBOARD)
    }, [])

    const onReferrals = useCallback(() => {
        navigate(ROUTES.REFERRALS)
    }, [])

    const onChangePassword = useCallback(() => {
        navigate(ROUTES.CHANGE_PASSWORD)
    }, [])

    const onAboutUs = useCallback(() => {
        navigate(ROUTES.ABOUT_US)
    }, [])

    const onContactUs = useCallback(() => {
        navigate(ROUTES.CONTACT_US)
    }, [])

    const onPrivacyPolicy = useCallback(() => {
        navigate(ROUTES.PRIVACY_POLICY)
    }, [])

    const onTermsAndConditions = useCallback(() => {
        navigate(ROUTES.TERMS_AND_CONDITIONS)
    }, [])

    const onLogout = useCallback(async () => {

        const confirmed = await showConfirmModal({
            title: "Logout",
            message: "Are you sure you want to logout?"
        })

        if (!confirmed) return

        dispatch(clearCredentials())
        dispatch(clearUserData())

        setTimeout(() => {
            dispatch(baseApi.util.resetApiState())
            dispatch(authApi.util.resetApiState())
        }, 0)

    }, [dispatch, showConfirmModal])

    return {
        functions: {
            onMyBusiness,
            onMyListings,
            onBillboard,
            onReferrals,
            onChangePassword,
            onAboutUs,
            onContactUs,
            onPrivacyPolicy,
            onTermsAndConditions,
            onLogout,
        }
    }
}

export default useMyProfileController
