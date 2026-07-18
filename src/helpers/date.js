import dayjs from "dayjs"
import isToday from "dayjs/plugin/isToday"
import isYesterday from "dayjs/plugin/isYesterday"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(isToday)
dayjs.extend(isYesterday)
dayjs.extend(relativeTime)

const GLOBAL_DATE_FORMAT = "MM-DD-YYYY"

export const formatDate = (timestamp, options = {}) => {

    const {
        relative = true,
        as_object = true,
        hour24 = false,
        date_format = GLOBAL_DATE_FORMAT,
        separator = "-",
        show_time_ago = false,
        fallback = "",
    } = options

    if (!timestamp) return as_object ? { date: fallback, time: fallback } : fallback

    const date = dayjs(timestamp)

    if (!date.isValid()) return as_object ? { date: fallback, time: fallback } : fallback

    if (show_time_ago) {
        const time_ago = date.fromNow()
        return as_object ? { date: time_ago, time: "" } : time_ago
    }

    const time = date.format(hour24 ? "HH:mm" : "hh:mm A")

    let label

    if (relative && date.isToday()) label = "Today"
    else if (relative && date.isYesterday()) label = "Yesterday"
    else label = date.format(date_format)

    if (as_object) return { date: label, time }

    return `${label} ${separator} ${time}`

}