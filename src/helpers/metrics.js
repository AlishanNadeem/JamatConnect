import { Dimensions, PixelRatio } from 'react-native'
import { initialWindowMetrics } from 'react-native-safe-area-context'

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const DESIGN_WIDTH = 430
const DESIGN_HEIGHT = 932

const width_base_scale = SCREEN_WIDTH / DESIGN_WIDTH
const height_base_scale = SCREEN_HEIGHT / DESIGN_HEIGHT

function normalize(size, based = 'width') {
    const new_size = based === 'height' ? size * height_base_scale : size * width_base_scale
    return Math.round(PixelRatio.roundToNearestPixel(new_size))
}

export const heightPixel = (size) => normalize(size, 'height')

export const widthPixel = (size) => normalize(size, 'width')

export const font = (size, factor = 1) => Math.round(PixelRatio.roundToNearestPixel(width_base_scale * size * factor))

export const GLOBAL_HORIZONTAL_PADDING = widthPixel(15)

export const TOP_INSET = initialWindowMetrics?.insets.top || 0

export const BOTTOM_INSET = initialWindowMetrics?.insets.bottom || 0

export const HEADER_HEIGHT = heightPixel(70) + TOP_INSET

export const BOTTOM_BAR_HEIGHT = heightPixel(70)

export const BOTTOM_BAR_BOTTOM_PADDING = BOTTOM_INSET + heightPixel(8)