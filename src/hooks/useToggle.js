import { useCallback, useState } from "react"

const useToggle = (initial = false) => {

    const [value, setValue] = useState(initial)

    const toggle = useCallback(() => {
        setValue(prev => !prev)
    }, [])

    return {
        value,
        toggle,
        set: setValue,
    }

}

export default useToggle