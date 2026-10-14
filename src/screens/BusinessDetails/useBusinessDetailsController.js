import { useRoute } from "@react-navigation/native"
import dayjs from "dayjs"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { Linking } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import colors from "../../helpers/colors"
import { formatPhone, formatWebsite, getLocationLabel } from "../../helpers/general"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import { useGetBusinessByIdQuery, useRecordBusinessViewMutation } from "../../redux/apis/Business"
import { useToggleSavedBusinessMutation } from "../../redux/apis/User"
import { selectSavedBusinessIds } from "../../redux/selectors"
import { toggleSavedBusiness } from "../../redux/slices/general.slice"

const useBusinessDetailsController = () => {

    const { params } = useRoute()
    const id = params?._id
    const dispatch = useDispatch()
    const saved_business_ids = useSelector(selectSavedBusinessIds)
    const viewed_id_ref = useRef(null)
    const [toggleSaved] = useToggleSavedBusinessMutation()
    const [recordView] = useRecordBusinessViewMutation()

    const {
        data,
        isLoading,
        isError,
        isSuccess,
    } = useGetBusinessByIdQuery(id, { skip: !id })

    const business = data?.data ?? {}

    useEffect(() => {
        if (!id || !isSuccess || viewed_id_ref.current === String(id)) return
        viewed_id_ref.current = String(id)
        recordView(id)
    }, [id, isSuccess, recordView])

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

    const review_count = 0
    const rating_average = "0.0"
    const preview_reviews = []

    const onViewAllReviews = useCallback(() => {
        navigate(ROUTES.BUSINESS_REVIEWS, { _id: id })
    }, [id])

    const saved = saved_business_ids.includes(String(id))

    const onToggleSave = useCallback(() => {
        if (!id) return
        const business_id = String(id)
        dispatch(toggleSavedBusiness(business_id))
        toggleSaved(business_id).unwrap().catch(() => {
            dispatch(toggleSavedBusiness(business_id))
        })
    }, [dispatch, id, toggleSaved])

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
            preview_reviews,
            review_count,
            rating_average,
            saved,
            is_loading: isLoading,
            is_error: isError || !id,
        },
        functions: {
            onOpenLink,
            onViewAllReviews,
            onToggleSave,
        },
    }
}

export default useBusinessDetailsController
