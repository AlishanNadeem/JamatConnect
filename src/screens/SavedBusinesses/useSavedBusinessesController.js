import { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import {
    useGetSavedBusinessesQuery,
    useGetSavedJobsQuery,
    useToggleSavedBusinessMutation,
    useToggleSavedJobMutation,
} from "../../redux/apis/User"
import { selectSavedBusinessIds, selectSavedJobIds } from "../../redux/selectors"
import { toggleSavedBusiness, toggleSavedJob } from "../../redux/slices/general.slice"

const useSavedBusinessesController = () => {

    const dispatch = useDispatch()
    const [tab, setTab] = useState("businesses")
    const saved_business_ids = useSelector(selectSavedBusinessIds)
    const saved_job_ids = useSelector(selectSavedJobIds)
    const [toggleSavedBusinessApi] = useToggleSavedBusinessMutation()
    const [toggleSavedJobApi] = useToggleSavedJobMutation()

    const businesses_query = useGetSavedBusinessesQuery()
    const jobs_query = useGetSavedJobsQuery()

    const is_jobs = tab === "jobs"
    const active_query = is_jobs ? jobs_query : businesses_query

    const onRefresh = useCallback(() => {
        active_query.refetch()
    }, [active_query])

    const onBusinessPress = useCallback((business) => {
        navigate(ROUTES.BUSINESS_DETAILS, { _id: business._id })
    }, [])

    const onJobPress = useCallback((job) => {
        navigate(ROUTES.JOB_DETAILS, { _id: String(job._id) })
    }, [])

    const onToggleSaveBusiness = useCallback((business) => {
        const id = String(business._id)
        dispatch(toggleSavedBusiness(id))
        toggleSavedBusinessApi(id).unwrap().catch(() => {
            dispatch(toggleSavedBusiness(id))
        })
    }, [dispatch, toggleSavedBusinessApi])

    const onToggleSaveJob = useCallback((job) => {
        const id = String(job._id)
        dispatch(toggleSavedJob(id))
        toggleSavedJobApi(id).unwrap().catch(() => {
            dispatch(toggleSavedJob(id))
        })
    }, [dispatch, toggleSavedJobApi])

    const businesses = Array.isArray(businesses_query.data?.data)
        ? businesses_query.data.data.filter((item) => item?._id)
        : []
    const jobs = Array.isArray(jobs_query.data?.data)
        ? jobs_query.data.data.filter((item) => item?._id)
        : []

    return {
        values: {
            tab,
            data: is_jobs ? jobs : businesses,
            saved_business_ids,
            saved_job_ids,
            is_loading: active_query.isLoading,
            refreshing: active_query.isFetching,
            loading_more: false,
            empty: active_query.isError
                ? {
                    title: "Something Went Wrong",
                    description: "Pull to refresh and try again.",
                }
                : is_jobs
                    ? {
                        title: "No Saved Jobs",
                        description: "Bookmark a job to find it here later.",
                    }
                    : {
                        title: "No Saved Businesses",
                        description: "Bookmark a business to find it here later.",
                    },
        },
        functions: {
            setTab,
            onRefresh,
            onBusinessPress,
            onJobPress,
            onToggleSaveBusiness,
            onToggleSaveJob,
        },
    }
}

export default useSavedBusinessesController
