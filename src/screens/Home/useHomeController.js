import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { navigate } from "../../helpers/navigation"
import { NAVIGATORS, ROUTES } from "../../helpers/routes"
import { useGetBusinessesQuery } from "../../redux/apis/Business"
import { useGetBusinessCategoriesQuery } from "../../redux/apis/BusinessCategory"
import { useGetJobsQuery } from "../../redux/apis/Job"
import { useGetListingsQuery } from "../../redux/apis/Marketplace"
import { selectSavedBusinessIds } from "../../redux/selectors"
import { toggleSavedBusiness } from "../../redux/slices/general.slice"

const HOME_PREVIEW_PARAMS = {
    page: 1,
    page_size: 5,
}

const useHomeController = () => {

    const dispatch = useDispatch()
    const saved_business_ids = useSelector(selectSavedBusinessIds)

    const {
        data: categories_response,
        isLoading: categories_loading,
    } = useGetBusinessCategoriesQuery()

    const {
        data: jobs_response,
    } = useGetJobsQuery(HOME_PREVIEW_PARAMS)

    const {
        data: listings_response,
    } = useGetListingsQuery(HOME_PREVIEW_PARAMS)

    const {
        data: businesses_response,
    } = useGetBusinessesQuery(HOME_PREVIEW_PARAMS)

    const categories = categories_response?.data ?? []
    const jobs = jobs_response?.data ?? []
    const listings = listings_response?.data ?? []
    const businesses = businesses_response?.data ?? []

    const onGrowCommunity = useCallback(() => {
        navigate(ROUTES.REFERRALS)
    }, [])

    const onCategoryPress = useCallback((category) => {
        navigate(NAVIGATORS.BOTTOM, {
            screen: ROUTES.BUSINESSES,
            params: {
                category_id: category?.id ?? category?._id,
            },
        })
    }, [])

    const onViewAllCategories = useCallback(() => {
        navigate(ROUTES.CATEGORIES)
    }, [])

    const onViewAllJobs = useCallback(() => {
        navigate(NAVIGATORS.BOTTOM, {
            screen: ROUTES.JOBS,
        })
    }, [])

    const onViewAllListings = useCallback(() => {
        navigate(NAVIGATORS.BOTTOM, {
            screen: ROUTES.MARKETPLACE,
        })
    }, [])

    const onViewAllBusinesses = useCallback(() => {
        navigate(NAVIGATORS.BOTTOM, {
            screen: ROUTES.BUSINESSES,
        })
    }, [])

    const onJobPress = useCallback((item) => {
        navigate(ROUTES.JOB_DETAILS, { _id: String(item._id) })
    }, [])

    const onListingPress = useCallback((item) => {
        navigate(ROUTES.MARKETPLACE_DETAILS, { _id: item._id })
    }, [])

    const onBusinessPress = useCallback((business) => {
        navigate(ROUTES.BUSINESS_DETAILS, { _id: business._id })
    }, [])

    const onToggleSave = useCallback((business) => {
        dispatch(toggleSavedBusiness(business._id))
    }, [dispatch])

    return {
        values: {
            categories,
            categories_loading,
            jobs,
            listings,
            businesses,
            saved_business_ids,
        },
        functions: {
            onGrowCommunity,
            onCategoryPress,
            onViewAllCategories,
            onViewAllJobs,
            onViewAllListings,
            onViewAllBusinesses,
            onJobPress,
            onListingPress,
            onBusinessPress,
            onToggleSave,
        },
    }
}

export default useHomeController
