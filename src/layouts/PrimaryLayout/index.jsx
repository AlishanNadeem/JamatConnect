import { useHeaderHeight } from "@react-navigation/elements"
import { memo } from "react"
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import images from "../../assets/images"
import colors from "../../helpers/colors"
import { BOTTOM_BAR_HEIGHT, BOTTOM_INSET, GLOBAL_HORIZONTAL_PADDING, heightPixel, widthPixel } from "../../helpers/metrics"

const ContentWrapper = ({ children, top_padding, bottom_padding, padding_horizontal, scrollable }) => {

    const wrapper_style = [
        styles.content,
        { paddingTop: top_padding },
    ]

    const content = scrollable ? (
        <View style={wrapper_style}>
            <ScrollView
                contentContainerStyle={[
                    padding_horizontal ? styles.padding_horizontal : {},
                    { paddingBottom: bottom_padding }
                ]}
                showsVerticalScrollIndicator={false}
            >
                {children}
            </ScrollView>
        </View>
    ) : (
        <View style={[wrapper_style, padding_horizontal ? styles.padding_horizontal : {}, { paddingBottom: bottom_padding }]}>
            {children}
        </View>
    )

    return content

}

const PrimaryLayout = ({ children, background = false, padding_horizontal = true, top = true, header = false, scrollable = false, bottom_tab = false }) => {

    const insets = useSafeAreaInsets()
    const header_height = useHeaderHeight()

    const top_padding = !top ? 0 : header ? header_height : insets.top
    const bottom_padding = !bottom_tab ? insets.bottom : BOTTOM_BAR_HEIGHT + BOTTOM_INSET

    return (
        <ImageBackground source={images.background} style={styles.container}>
            <ContentWrapper
                background={background}
                padding_horizontal={padding_horizontal}
                top_padding={top_padding}
                bottom_padding={bottom_padding}
                scrollable={scrollable}
            >
                {children}
            </ContentWrapper>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: {
        flex: 1,
    },
    padding_horizontal: {
        paddingHorizontal: GLOBAL_HORIZONTAL_PADDING,
    },
    watermark: {
        position: "absolute",
        height: heightPixel(433),
        width: widthPixel(507),
        top: heightPixel(-82),
        right: widthPixel(-43),
        left: widthPixel(-43),
        opacity: 0.06,
    }
})

export default memo(PrimaryLayout)