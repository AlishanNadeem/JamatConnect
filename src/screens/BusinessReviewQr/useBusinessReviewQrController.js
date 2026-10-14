import { useRoute } from "@react-navigation/native"
import { useGetBusinessReviewQrQuery } from "../../redux/apis/Business"

const useBusinessReviewQrController = () => {

    const { params } = useRoute()
    const id = params?._id

    const {
        data,
        isLoading,
        isError,
    } = useGetBusinessReviewQrQuery(id, { skip: !id })

    const payload = data?.data ?? {}

    return {
        values: {
            business_name: payload.business_name || "Your business",
            review_url: payload.review_url || "",
            is_loading: isLoading,
            is_error: isError || !id,
        },
    }
}

export default useBusinessReviewQrController
