import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../contexts/ModalContext"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import { selectUser } from "../../redux/selectors"
import { clearCredentials } from "../../redux/slices/auth.slice"

const useMyProfileController = () => {

    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const { showConfirmModal } = useModal()

    const onChangePassword = useCallback(() => {
        navigate(ROUTES.CHANGE_PASSWORD)
    }, [])

    const onEditProfile = useCallback(() => {
        navigate(ROUTES.EDIT_PROFILE)
    }, [])

    const onLogout = useCallback(async () => {

        const confirmed = await showConfirmModal({
            title: "Logout",
            message: "Are you sure you want to logout?"
        })

        if (confirmed) {
            dispatch(clearCredentials())
        }

    }, [])

    return {
        values: {
            user: user ?? {}
        },
        functions: {
            onChangePassword,
            onEditProfile,
            onLogout,
        }
    }
}

export default useMyProfileController