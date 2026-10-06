import { useRoute } from "@react-navigation/native"
import dayjs from "dayjs"
import { useCallback, useMemo } from "react"
import { Linking } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import colors from "../../helpers/colors"
import { BUSINESS_REVIEWS } from "../../helpers/data"
import { formatPhone, formatWebsite, getLocationLabel } from "../../helpers/general"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import useRedeemSpecial from "../../hooks/useRedeemSpecial"
import { useGetBusinessByIdQuery } from "../../redux/apis/Business"
import { useGetSpecialsQuery } from "../../redux/apis/Special"
import { selectSavedBusinessIds } from "../../redux/selectors"
import { toggleSavedBusiness } from "../../redux/slices/general.slice"

const PREVIEW_COUNT = 2

const useBusinessDetailsController = () => {

    const { params } = useRoute()
    const id = params?._id
    const dispatch = useDispatch()
    const saved_business_ids = useSelector(selectSavedBusinessIds)
    const { redeeming_id, onRedeem } = useRedeemSpecial()

    const {
        data,
        isLoading,
        isError,
    } = useGetBusinessByIdQuery(id, { skip: !id })

    const {
        data: specials_response,
    } = useGetSpecialsQuery(
        { business: id },
        { skip: !id },
    )

    const business = data?.data ?? {}
    const specials = specials_response?.data ?? []

    const {
        name,
        description,
        category,
        email,
        phone,
        dialing_code,
        website,
        address,
        image_url,
        logo_url,
        verified,
        hours = [],
    } = business

    const phone_label = formatPhone(dialing_code, phone)
    const website_label = formatWebsite(website)
    const location_label = getLocationLabel({ address })
    const today = dayjs().format("dddd").toLowerCase()
    const today_hours = hours.find((hour) => hour.day === today)

    const website_url = website
        ? (website.startsWith("http") ? website : `https://${website}`)
        : null

    const maps_url = address?.latitude && address?.longitude
        ? `https://maps.google.com/?q=${address.latitude},${address.longitude}`
        : location_label
            ? `https://maps.google.com/?q=${encodeURIComponent(location_label)}`
            : null

    const phone_url = phone
        ? `tel:${`${dialing_code ?? ""}${phone}`.replace(/[^\d+]/g, "")}`
        : null

    const email_url = email ? `mailto:${email}` : null

    const today_status = useMemo(() => {
        if (!today_hours) return null
        if (today_hours.closed) {
            return {
                label: "Closed today",
                subtitle: "Not scheduled to open",
                color: colors.danger,
                background: colors.light_danger,
                icon: "door-closed",
                is_open: false,
            }
        }

        const now = dayjs()
        const [open_hour, open_minute] = today_hours.open.split(":").map(Number)
        const [close_hour, close_minute] = today_hours.close.split(":").map(Number)
        const open_time = now.hour(open_hour).minute(open_minute).second(0)
        const close_time = now.hour(close_hour).minute(close_minute).second(0)
        const is_open = now.isAfter(open_time) && now.isBefore(close_time)

        return {
            label: is_open ? "Open now" : "Closed now",
            subtitle: is_open
                ? `Closes at ${today_hours.close}`
                : `Opens at ${today_hours.open}`,
            color: is_open ? colors.success : colors.danger,
            background: is_open ? colors.light_success : colors.light_danger,
            icon: is_open ? "door-open" : "door-closed",
            is_open,
        }
    }, [today_hours])

    const contact_items = useMemo(() => [
        location_label && { icon: "map-pin", title: "Address", label: location_label, url: maps_url },
        phone_label && { icon: "phone", title: "Phone", label: phone_label, url: phone_url },
        email && { icon: "mail", title: "Email", label: email, url: email_url },
        website_label && { icon: "globe", title: "Website", label: website_label, url: website_url },
    ].filter(Boolean), [email, email_url, location_label, maps_url, phone_label, phone_url, website_label, website_url])

    const onOpenLink = useCallback((url) => {
        if (!url) return
        Linking.openURL(url)
    }, [])

    const reviews = BUSINESS_REVIEWS
    const review_count = reviews.length
    const rating_average = review_count
        ? (reviews.reduce((sum, review) => sum + review.rating, 0) / review_count).toFixed(1)
        : "0.0"
    const preview_reviews = reviews.slice(0, PREVIEW_COUNT)

    const onViewAllReviews = useCallback(() => {
        navigate(ROUTES.BUSINESS_REVIEWS, { _id: id })
    }, [id])

    const saved = saved_business_ids.includes(String(id))

    const onToggleSave = useCallback(() => {
        if (!id) return
        dispatch(toggleSavedBusiness(id))
    }, [dispatch, id])

    return {
        values: {
            name,
            description,
            category,
            image_url,
            logo_url,
            verified,
            hours,
            today,
            today_status,
            contact_items,
            specials,
            preview_reviews,
            review_count,
            rating_average,
            saved,
            redeeming_id,
            is_loading: isLoading,
            is_error: isError || !id,
        },
        functions: {
            onOpenLink,
            onViewAllReviews,
            onToggleSave,
            onRedeem,
        },
    }
}

export default useBusinessDetailsController
