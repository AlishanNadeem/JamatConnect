import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import { useGetSavedBusinessesQuery, useToggleSavedBusinessMutation } from "../../redux/apis/User"
import { selectSavedBusinessIds } from "../../redux/selectors"
import { toggleSavedBusiness } from "../../redux/slices/general.slice"

const useSavedBusinessesController = () => {

    const dispatch = useDispatch()
    const saved_business_ids = useSelector(selectSavedBusinessIds)
    const [toggleSaved] = useToggleSavedBusinessMutation()

    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetSavedBusinessesQuery()

    const onRefresh = useCallback(() => {
        refetch()
    }, [refetch])

    const onBusinessPress = useCallback((business) => {
        navigate(ROUTES.BUSINESS_DETAILS, { _id: business._id })
    }, [])

    const onToggleSave = useCallback((business) => {
        const id = String(business._id)
        dispatch(toggleSavedBusiness(id))
        toggleSaved(id).unwrap().catch(() => {
            dispatch(toggleSavedBusiness(id))
        })
    }, [dispatch, toggleSaved])

    return {
        values: {
            data: Array.isArray(data?.data)
                ? data.data.filter((item) => item?._id)
                : [],
            saved_business_ids,
            is_loading: isLoading,
            refreshing: isFetching,
            loading_more: false,
            empty: isError
                ? {
                    title: "Something Went Wrong",
                    description: "Pull to refresh and try again.",
                }
                : {
                    title: "No Saved Businesses",
                    description: "Bookmark a business to find it here later.",
                },
        },
        functions: {
            onRefresh,
            onBusinessPress,
            onToggleSave,
        },
    }
}

export default useSavedBusinessesController
