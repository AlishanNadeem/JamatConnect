import { useState, useEffect, useCallback } from "react"

const delay = 500

const useSearch = () => {

    const [search, setSearch] = useState("")
    const [debounced, setDebounced] = useState("")

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounced(search)
        }, delay)

        return () => clearTimeout(handler)
    }, [search, delay])

    const onChange = useCallback((text) => {
        setSearch(text)
    }, [])

    return {
        search,
        debounced,
        onChange,
    }
}

export default useSearch