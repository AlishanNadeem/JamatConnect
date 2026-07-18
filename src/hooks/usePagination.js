import { useState, useCallback } from "react"

const usePagination = ({ source = [], page_size = 10 } = {}) => {

    const [data, setData] = useState(source.slice(0, page_size))
    const [page, setPage] = useState(1)
    const [refreshing, setRefreshing] = useState(false)
    const [loading_more, setLoadingMore] = useState(false)
    const [has_more, setHasMore] = useState(source.length > page_size)

    const resetPage = useCallback(async (fetch_fn) => {

        setRefreshing(true)

        try {
            if (fetch_fn) {
                const result = await fetch_fn({ page: 1, page_size })
                setData(result.data)
                setHasMore(result.has_more)
            } else {
                setData(source.slice(0, page_size))
                setHasMore(source.length > page_size)
            }

            setPage(1)

        } finally {
            setRefreshing(false)
        }

    }, [source, page_size])

    const nextPage = useCallback(async (fetch_fn) => {

        if (loading_more || !has_more) return

        setLoadingMore(true)

        try {
            const next = page + 1

            if (fetch_fn) {
                const result = await fetch_fn({ page: next, page_size })
                setData(prev => [...prev, ...result.data])
                setHasMore(result.has_more)
            } else {
                const next_data = source.slice(0, next * page_size)
                setData(next_data)
                setHasMore(next_data.length < source.length)
            }

            setPage(next)

        } finally {
            setLoadingMore(false)
        }

    }, [loading_more, has_more, page, source, page_size])

    return {
        data,
        page,
        refreshing,
        loading_more,
        has_more,
        resetPage,
        nextPage,
    }
}

export default usePagination