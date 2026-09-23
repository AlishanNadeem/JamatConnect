import { useCallback, useEffect, useRef, useState } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useDispatch } from "react-redux"
import { APP_NAME } from "../../config/env"
import { SCREEN_WIDTH } from "../../helpers/metrics"
import { completeOnboarding } from "../../redux/slices/general.slice"

export const SLIDE_WIDTH = SCREEN_WIDTH

const AUTO_SCROLL_INTERVAL = 4000

const DATA = [
    {
        id: "1",
        icon: "store",
        title: "Discover Local Businesses",
        description: `Find trusted community businesses and support the people around you on ${APP_NAME}.`,
    },
    {
        id: "2",
        icon: "briefcase",
        title: "Find Community Jobs",
        description: "Browse open roles from local businesses and apply in just a few taps.",
    },
    {
        id: "3",
        icon: "shopping-bag",
        title: "Shop the Marketplace",
        description: "Buy and sell within your community — list items, find deals, and trade with ease.",
    },
]

const useOnboardingController = () => {

    const dispatch = useDispatch()
    const insets = useSafeAreaInsets()

    const flatlist_ref = useRef(null)
    const paused_ref = useRef(false)
    const index_ref = useRef(0)
    const view_config = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

    const [current_index, setCurrentIndex] = useState(0)

    const is_last = current_index === DATA.length - 1

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            const index = viewableItems[0].index ?? 0
            index_ref.current = index
            setCurrentIndex(index)
        }
    }).current

    useEffect(() => {

        const interval = setInterval(() => {
            if (paused_ref.current) return

            const next_index = (index_ref.current + 1) % DATA.length
            flatlist_ref.current?.scrollToIndex({ index: next_index, animated: true })
        }, AUTO_SCROLL_INTERVAL)

        return () => clearInterval(interval)

    }, [])

    const onSkip = useCallback(() => {
        dispatch(completeOnboarding())
    }, [dispatch])

    const onNext = useCallback(() => {
        if (is_last) {
            onSkip()
            return
        }

        flatlist_ref.current?.scrollToIndex({
            index: current_index + 1,
            animated: true,
        })
    }, [current_index, is_last, onSkip])

    const onScrollBeginDrag = useCallback(() => {
        paused_ref.current = true
    }, [])

    const onScrollEndDrag = useCallback(() => {
        paused_ref.current = false
    }, [])

    const getItemLayout = useCallback((_, index) => ({
        length: SLIDE_WIDTH,
        offset: SLIDE_WIDTH * index,
        index,
    }), [])

    const keyExtractor = useCallback((item) => item.id, [])

    return {
        values: {
            slides: DATA,
            current_index,
            is_last,
            insets,
            flatlist_ref,
            view_config,
        },
        functions: {
            onNext,
            onSkip,
            onViewableItemsChanged,
            onScrollBeginDrag,
            onScrollEndDrag,
            getItemLayout,
            keyExtractor,
        },
    }
}

export default useOnboardingController
