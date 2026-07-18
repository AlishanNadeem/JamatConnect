import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useModal } from "../../contexts/ModalContext"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import { clearCredentials } from "../../redux/slices/auth.slice"

const useMyProfileController = () => {

    const dispatch = useDispatch()
    const { showConfirmModal } = useModal()

    const onReferrals = useCallback(() => {
        navigate(ROUTES.REFERRALS)
    }, [])

    const onAboutUs = useCallback(() => {
        navigate(ROUTES.ABOUT_US)
    }, [])

    const onLogout = useCallback(async () => {
        const confirmed = await showConfirmModal({
            title: "Logout",
            message: "Are you sure you want to logout?"
        })

        if (confirmed) {
            dispatch(clearCredentials())
        }
    }, [dispatch, showConfirmModal])

    return {
        functions: {
            onReferrals,
            onAboutUs,
            onLogout,
        }
    }
}

export default useMyProfileController
