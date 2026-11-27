import { useFocusEffect } from "@react-navigation/native"
import { useCallback } from "react"
import { navigate } from "../../helpers/navigation"
import { NAVIGATORS, ROUTES } from "../../helpers/routes"
import { useGetActiveBillboardsQuery } from "../../redux/apis/Billboard"
import { useGetBusinessCategoriesQuery } from "../../redux/apis/BusinessCategory"
import { useGetHomeCountsQuery } from "../../redux/apis/General"

const toCount = (value) => (typeof value === "number" ? value : null)

const useHomeController = () => {

    const {
        data: categories_response,
        isLoading: categories_loading,
    } = useGetBusinessCategoriesQuery()

    const {
        data: counts_response,
        refetch: refetch_counts,
    } = useGetHomeCountsQuery()

    const {
        data: billboards_response,
    } = useGetActiveBillboardsQuery()

    // Home stays mounted as a tab, so refresh the counts each time it comes into view.
    useFocusEffect(
        useCallback(() => {
            refetch_counts()
        }, [refetch_counts])
    )

    const categories = categories_response?.data ?? []
    const billboards = (billboards_response?.data ?? []).filter((slot) => slot?.special)
    const counts_data = counts_response?.data

    const counts = {
        specials: toCount(counts_data?.specials),
        businesses: toCount(counts_data?.businesses),
        jobs: toCount(counts_data?.jobs),
        listings: toCount(counts_data?.listings),
    }

    const onGrowCommunity = useCallback(() => {
        navigate(ROUTES.REFERRALS)
    }, [])

    const onViewAllCategories = useCallback(() => {
        navigate(ROUTES.CATEGORIES)
    }, [])

    const onViewAllSpecials = useCallback(() => {
        navigate(NAVIGATORS.BOTTOM, {
            screen: ROUTES.SPECIALS,
        })
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

    const onBillboardPress = useCallback((slot) => {
        const special_id = slot?.special?._id
        if (!special_id) return
        navigate(ROUTES.SPECIAL_DETAILS, { _id: String(special_id) })
    }, [])

    return {
        values: {
            categories,
            categories_loading,
            billboards,
            counts,
        },
        functions: {
            onGrowCommunity,
            onViewAllCategories,
            onViewAllSpecials,
            onViewAllJobs,
            onViewAllListings,
            onViewAllBusinesses,
            onBillboardPress,
        },
    }
}

export default useHomeController
