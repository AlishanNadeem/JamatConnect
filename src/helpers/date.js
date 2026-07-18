import dayjs from "dayjs"
import isToday from "dayjs/plugin/isToday"
import isYesterday from "dayjs/plugin/isYesterday"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(isToday)
dayjs.extend(isYesterday)
dayjs.extend(relativeTime)

const GLOBAL_DATE_FORMAT = "MMM DD, YYYY"
const GLOBAL_TIME_FORMAT_12 = "hh:mm A"
const GLOBAL_TIME_FORMAT_24 = "HH:mm"

export const formatDate = (timestamp, options = {}) => {

    const {
        relative = false,
        format = GLOBAL_DATE_FORMAT,
        show_time_ago = false,
        fallback = "",
    } = options

    if (!timestamp) return fallback

    const date = dayjs(timestamp)

    if (!date.isValid()) return fallback

    if (show_time_ago) return date.fromNow()

    if (relative && date.isToday()) return "Today"
    if (relative && date.isYesterday()) return "Yesterday"

    return date.format(format)

}

export const formatTime = (timestamp, options = {}) => {

    const {
        hour24 = false,
        fallback = "",
    } = options

    if (!timestamp) return fallback

    const date = dayjs(timestamp)

    if (!date.isValid()) return fallback

    return date.format(hour24 ? GLOBAL_TIME_FORMAT_24 : GLOBAL_TIME_FORMAT_12)

}
