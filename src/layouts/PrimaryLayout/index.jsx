import { useHeaderHeight } from "@react-navigation/elements"
import { memo } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import colors from "../../helpers/colors"
import { BOTTOM_BAR_HEIGHT, BOTTOM_INSET, GLOBAL_HORIZONTAL_PADDING, heightPixel } from "../../helpers/metrics"

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

const PrimaryLayout = ({ children, padding_horizontal = true, top = true, header = false, scrollable = false, bottom_tab = false, footer = null }) => {

    const insets = useSafeAreaInsets()
    const header_height = useHeaderHeight()

    const top_padding = !top ? 0 : header ? header_height : insets.top
    const safe_bottom = !bottom_tab ? insets.bottom : 0
    // A footer sits under the content and takes the bottom safe area itself.
    const bottom_padding = footer ? 0 : safe_bottom

    return (
        <View style={styles.container}>
            <ContentWrapper
                padding_horizontal={padding_horizontal}
                top_padding={top_padding}
                bottom_padding={bottom_padding}
                scrollable={scrollable}
            >
                {children}
            </ContentWrapper>
            {footer ? (
                <View style={[styles.footer, { paddingBottom: Math.max(safe_bottom, heightPixel(16)) }]}>
                    {footer}
                </View>
            ) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    content: {
        flex: 1,
    },
    padding_horizontal: {
        paddingHorizontal: GLOBAL_HORIZONTAL_PADDING,
    },
    footer: {
        paddingTop: heightPixel(12),
        paddingHorizontal: GLOBAL_HORIZONTAL_PADDING,
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.light_gray,
    },
})

export default memo(PrimaryLayout)
