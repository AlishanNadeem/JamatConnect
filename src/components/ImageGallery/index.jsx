import { memo, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Image from "../Image"
import Text from "../Text"

// Full-width swipeable photos with a "1 / 3" counter and dots.
const ImageGallery = ({ images = [], height = 240 }) => {

    const [width, setWidth] = useState(0)
    const [current, setCurrent] = useState(0)

    const count = images.length
    const gallery_height = heightPixel(height)

    const onLayout = (event) => {
        const next = Math.round(event.nativeEvent.layout.width)
        if (next !== width) setWidth(next)
    }

    const onMomentumScrollEnd = (event) => {
        if (!width) return
        const page = Math.round(event.nativeEvent.contentOffset.x / width)
        setCurrent(Math.max(0, Math.min(count - 1, page)))
    }

    return (
        <View style={[styles.container, { height: gallery_height }]} onLayout={onLayout}>
            {width && count ? (
                <ScrollView
                    horizontal
                    pagingEnabled
                    nestedScrollEnabled
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={onMomentumScrollEnd}
                >
                    {images.map((uri, index) => (
                        <Image
                            key={`${uri}-${index}`}
                            source={{ uri }}
                            style={{ width, height: gallery_height }}
                            resize="cover"
                        />
                    ))}
                </ScrollView>
            ) : null}
            {count > 1 ? (
                <>
                    <View style={styles.counter}>
                        <Text size={11} weight="semibold" color={colors.white}>
                            {current + 1} / {count}
                        </Text>
                    </View>
                    <View style={styles.dots}>
                        {images.map((uri, index) => (
                            <View
                                key={`${uri}-dot-${index}`}
                                style={[styles.dot, index === current && styles.dot_active]}
                            />
                        ))}
                    </View>
                </>
            ) : null}
        </View>
    )
}

export default memo(ImageGallery)

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: colors.white,
    },
    counter: {
        position: "absolute",
        top: heightPixel(12),
        right: widthPixel(12),
        backgroundColor: "rgba(0,0,0,0.55)",
        borderRadius: widthPixel(10),
        paddingHorizontal: widthPixel(8),
        paddingVertical: heightPixel(3),
    },
    dots: {
        position: "absolute",
        bottom: heightPixel(10),
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        gap: widthPixel(4),
    },
    dot: {
        width: widthPixel(6),
        height: widthPixel(6),
        borderRadius: widthPixel(3),
        backgroundColor: "rgba(255,255,255,0.6)",
    },
    dot_active: {
        width: widthPixel(14),
        backgroundColor: colors.white,
    },
})
