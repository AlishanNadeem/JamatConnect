import { useRoute } from "@react-navigation/native"
import dayjs from "dayjs"
import { useCallback, useMemo } from "react"
import { Linking } from "react-native"
import { useModal } from "../../contexts/ModalContext"
import colors from "../../helpers/colors"
import { formatPhone, formatWebsite } from "../../helpers/general"
import { navigate } from "../../helpers/navigation"
import { ROUTES } from "../../helpers/routes"
import { useGetBusinessByIdQuery } from "../../redux/apis/Business"

const PREVIEW_COUNT = 2

const STATUS_THEME = {
    approved: {
        mode: "success",
        label: "Approved",
        message: "Your business is live and visible to the community.",
    },
    pending: {
        mode: "warning",
        label: "Pending",
        message: "Your listing is under review. You’ll be notified once it’s approved.",
    },
    rejected: {
        mode: "danger",
        label: "Rejected",
        message: "This listing was not approved. Edit and resubmit your details.",
    },
}

const useMyBusinessDetailsController = () => {

    const { params } = useRoute()
    const id = params?._id
    const { showInfoModal } = useModal()

    const {
        data,
        isLoading,
        isError,
    } = useGetBusinessByIdQuery(id, { skip: !id })

    const business = data?.data ?? {}

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
        status,
        active,
        hours = [],
        views_count,
        saved_count,
        review_count = 0,
        average_rating = 0,
        reviews = [],
    } = business

    const status_theme = STATUS_THEME[status] ?? STATUS_THEME.pending
    const is_active = Boolean(active)
    const rating_average = Number(average_rating || 0).toFixed(1)
    const preview_reviews = (Array.isArray(reviews) ? reviews : []).slice(0, PREVIEW_COUNT)

    const stats = useMemo(() => [
        {
            key: "views",
            label: "Views",
            value: Number(views_count ?? 0),
            icon: "eye",
            background: colors.lightest_primary,
            color: colors.primary,
        },
        {
            key: "saves",
            label: "Saved",
            value: Number(saved_count ?? 0),
            icon: "bookmark",
            background: colors.lightest_primary,
            color: colors.primary,
        },
    ], [saved_count, views_count])

    const phone_label = formatPhone(dialing_code, phone)
    const website_label = formatWebsite(website)
    const location_label = address?.formatted
        ?? [address?.city, address?.state, address?.country].filter(Boolean).join(", ")
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

    const manage_actions = useMemo(() => [
        {
            key: "edit",
            icon: "pencil",
            title: "Edit Listing",
            subtitle: "Profile & photos",
            background: colors.lightest_primary,
            color: colors.primary,
            onPress: "onEditListing",
        },
        {
            key: "special",
            icon: "megaphone",
            title: "Add Special",
            subtitle: "Promote offers",
            background: colors.light_danger,
            color: colors.danger,
            onPress: "onAddSpecial",
        },
        {
            key: "job",
            icon: "briefcase",
            title: "Post a Job",
            subtitle: "Hire talent",
            background: colors.light_info,
            color: colors.info,
            onPress: "onPostJob",
        },
        {
            key: "public",
            icon: "eye",
            title: "View Public",
            subtitle: "See live page",
            background: colors.light_warning,
            color: colors.warning,
            onPress: "onViewPublic",
        },
    ], [])

    const onOpenLink = useCallback((url) => {
        if (!url) return
        Linking.openURL(url)
    }, [])

    const onViewAllReviews = useCallback(() => {
        navigate(ROUTES.BUSINESS_REVIEWS, { _id: id })
    }, [id])

    const onEditListing = useCallback(() => {
        navigate(ROUTES.CREATE_BUSINESS, { _id: id })
    }, [id])

    const onViewPublic = useCallback(() => {
        navigate(ROUTES.BUSINESS_DETAILS, { _id: id })
    }, [id])

    const onAddSpecial = useCallback(() => {
        showInfoModal({
            title: "Coming Soon",
            message: "Adding specials will be available soon.",
        })
    }, [showInfoModal])

    const onPostJob = useCallback(() => {
        showInfoModal({
            title: "Coming Soon",
            message: "Posting jobs from your business will be available soon.",
        })
    }, [showInfoModal])

    const action_handlers = {
        onEditListing,
        onAddSpecial,
        onPostJob,
        onViewPublic,
    }

    return {
        values: {
            name,
            description,
            category,
            image_url,
            logo_url,
            verified,
            status,
            status_theme,
            active: is_active,
            hours,
            today,
            today_status,
            contact_items,
            manage_actions,
            stats,
            preview_reviews,
            review_count,
            rating_average,
            is_loading: isLoading,
            is_error: isError || !id,
        },
        functions: {
            onOpenLink,
            onViewAllReviews,
            onEditListing,
            onAddSpecial,
            onPostJob,
            onViewPublic,
            action_handlers,
        },
    }
}

export default useMyBusinessDetailsController
