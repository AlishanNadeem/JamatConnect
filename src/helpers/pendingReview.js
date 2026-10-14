let pending_review_token = null

export const extractReviewTokenFromUrl = (url = "") => {
    if (!url || typeof url !== "string") return null

    const match = url.match(/\/review\/([A-Za-z0-9]+)/i)
    if (!match?.[1]) return null

    return match[1].toUpperCase()
}

export const setPendingReviewToken = (token) => {
    pending_review_token = token || null
}

export const consumePendingReviewToken = () => {
    const token = pending_review_token
    pending_review_token = null
    return token
}
