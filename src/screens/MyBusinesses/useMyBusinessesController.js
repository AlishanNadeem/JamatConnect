import { useCallback, useState } from "react"
import { MY_BUSINESSES } from "../../helpers/data"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"

const useMyBusinessesController = () => {

    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        setTimeout(() => setRefreshing(false), 600)
    }, [])

    const onAddBusiness = useCallback(() => {
        navigate(ROUTES.CREATE_BUSINESS)
    }, [])

    return {
        values: {
            data: MY_BUSINESSES,
            is_loading: false,
            refreshing,
            loading_more: false,
            empty: {
                title: "No Businesses Yet",
                description: "Add your first business to start reaching the community.",
            },
        },
        functions: {
            onRefresh,
            onAddBusiness,
        },
    }
}

export default useMyBusinessesController
