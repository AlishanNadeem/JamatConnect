import { useRoute } from "@react-navigation/native"
import { useCallback, useEffect, useState } from "react"
import { useModal } from "../../contexts/ModalContext"
import { goBack } from "../../helpers/navigation"
import {
    useGetReviewContextQuery,
    useUpsertBusinessReviewMutation,
} from "../../redux/apis/Business"

const useWriteReviewController = () => {

    const { params } = useRoute()
    const token = String(params?.token || "").toUpperCase()
    const { showInfoModal } = useModal()

    const {
        data,
        isLoading,
        isError,
    } = useGetReviewContextQuery(token, { skip: !token })

    const [submit, { isSuccess, isLoading: is_submitting }] = useUpsertBusinessReviewMutation()

    const context = data?.data ?? {}
    const my_review = context.my_review

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const [rating_error, setRatingError] = useState("")
    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {
        if (!my_review || hydrated) return
        setRating(Number(my_review.rating) || 0)
        setComment(my_review.comment || "")
        setHydrated(true)
    }, [hydrated, my_review])

    useEffect(() => {
        if (!isSuccess) return
        showInfoModal({
            title: "Thank You!",
            message: my_review
                ? "Your review has been updated."
                : "Your review has been submitted.",
            onConfirm: goBack,
        })
    }, [isSuccess, my_review, showInfoModal])

    const onSelectRating = useCallback((value) => {
        setRating(value)
        setRatingError("")
    }, [])

    const onChangeComment = useCallback((value) => {
        setComment(value)
    }, [])

    const onSubmit = useCallback(() => {
        if (!token) return

        if (!rating) {
            setRatingError("Please select a rating")
            return
        }

        submit({
            token,
            body: {
                rating,
                comment: comment.trim(),
            },
        })
    }, [comment, rating, submit, token])

    return {
        values: {
            business_name: context.business_name || "Business",
            logo_url: context.logo_url,
            is_owner: Boolean(context.is_owner),
            is_edit: Boolean(my_review),
            rating,
            comment,
            rating_error,
            is_loading: isLoading,
            is_error: isError || !token,
            is_submitting,
        },
        functions: {
            onSelectRating,
            onChangeComment,
            onSubmit,
        },
    }
}

export default useWriteReviewController
