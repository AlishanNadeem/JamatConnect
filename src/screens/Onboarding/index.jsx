import { useCallback } from "react"
import { FlatList, Image, StyleSheet, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import images from "../../assets/images"
import Button from "../../components/Button"
import Icon from "../../components/Icon"
import Text from "../../components/Text"
import colors from "../../helpers/colors"
import { GLOBAL_HORIZONTAL_PADDING, heightPixel, widthPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useOnboardingController, { SLIDE_WIDTH } from "./useOnboardingController"

const Onboarding = () => {

    const { values, functions } = useOnboardingController()

    const renderItem = useCallback(({ item }) => (
        <View style={styles.item}>
            <View style={styles.icon_ring}>
                <View style={styles.icon_wrap}>
                    <Icon
                        name={item.icon}
                        size={36}
                        color={colors.primary}
                    />
                </View>
            </View>
            <View style={styles.item_text}>
                <Text align="center" size={24} weight="bold">
                    {item.title}
                </Text>
                <Text align="center" size={15} color={colors.dark_gray} lines={3}>
                    {item.description}
                </Text>
            </View>
        </View>
    ), [])

    return (
        <PrimaryLayout padding_horizontal={false} top={false}>
            <View style={styles.content}>
                <LinearGradient
                    colors={[colors.dark_primary, colors.primary, colors.light_primary]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.hero, { paddingTop: values.insets.top }]}
                >
                    <View style={styles.circle_one} />
                    <View style={styles.circle_two} />
                    <View style={styles.circle_three} />
                    <View style={styles.logo_badge}>
                        <Image source={images.full_logo} style={styles.logo} />
                    </View>
                </LinearGradient>

                <View style={styles.panel}>
                    <FlatList
                        ref={values.flatlist_ref}
                        data={values.slides}
                        renderItem={renderItem}
                        horizontal
                        pagingEnabled
                        bounces={false}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={functions.keyExtractor}
                        onViewableItemsChanged={functions.onViewableItemsChanged}
                        viewabilityConfig={values.view_config}
                        getItemLayout={functions.getItemLayout}
                        onScrollBeginDrag={functions.onScrollBeginDrag}
                        onScrollEndDrag={functions.onScrollEndDrag}
                        style={styles.list}
                    />

                    <View style={styles.footer}>
                        <View style={styles.pagination}>
                            {values.slides.map((item, index) => (
                                <View
                                    key={item.id}
                                    style={[
                                        styles.dot,
                                        index === values.current_index ? styles.dot_active : styles.dot_inactive,
                                    ]}
                                />
                            ))}
                        </View>

                        <View style={styles.actions}>
                            <Button onPress={functions.onNext}>
                                {values.is_last ? "Get Started" : "Next"}
                            </Button>
                            <Text
                                align="center"
                                size={14}
                                weight="semibold"
                                color={values.is_last ? colors.transparent : colors.dark_gray}
                                onPress={values.is_last ? undefined : functions.onSkip}
                            >
                                Skip
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </PrimaryLayout>
    )
}

export default Onboarding

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: colors.background,
    },
    hero: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingBottom: heightPixel(40),
    },
    circle_one: {
        position: "absolute",
        top: heightPixel(-40),
        right: widthPixel(-40),
        width: widthPixel(180),
        height: widthPixel(180),
        borderRadius: widthPixel(90),
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    circle_two: {
        position: "absolute",
        bottom: heightPixel(20),
        left: widthPixel(-50),
        width: widthPixel(150),
        height: widthPixel(150),
        borderRadius: widthPixel(75),
        backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
    circle_three: {
        position: "absolute",
        top: heightPixel(80),
        left: widthPixel(40),
        width: widthPixel(50),
        height: widthPixel(50),
        borderRadius: widthPixel(25),
        backgroundColor: "rgba(255, 255, 255, 0.12)",
    },
    logo_badge: {
        width: heightPixel(168),
        height: heightPixel(168),
        borderRadius: heightPixel(84),
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: heightPixel(4),
        borderColor: "rgba(255, 255, 255, 0.35)",
    },
    logo: {
        width: heightPixel(118),
        height: heightPixel(118),
        resizeMode: "contain",
    },
    panel: {
        marginTop: heightPixel(-28),
        paddingTop: heightPixel(28),
        paddingBottom: heightPixel(12),
        borderTopLeftRadius: heightPixel(28),
        borderTopRightRadius: heightPixel(28),
        backgroundColor: colors.white,
        gap: heightPixel(22),
    },
    list: {
        flexGrow: 0,
    },
    item: {
        width: SLIDE_WIDTH,
        alignItems: "center",
        gap: heightPixel(18),
        minHeight: heightPixel(190),
        justifyContent: "center",
        paddingHorizontal: GLOBAL_HORIZONTAL_PADDING,
    },
    icon_ring: {
        width: heightPixel(92),
        height: heightPixel(92),
        borderRadius: heightPixel(46),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.lightest_primary,
        borderWidth: heightPixel(1),
        borderColor: colors.light_primary,
    },
    icon_wrap: {
        width: heightPixel(72),
        height: heightPixel(72),
        borderRadius: heightPixel(36),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.white,
    },
    item_text: {
        gap: heightPixel(10),
        paddingHorizontal: widthPixel(12),
        minHeight: heightPixel(90),
    },
    footer: {
        gap: heightPixel(22),
        paddingHorizontal: GLOBAL_HORIZONTAL_PADDING,
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: widthPixel(8),
    },
    dot: {
        height: heightPixel(8),
        borderRadius: heightPixel(20),
    },
    dot_active: {
        width: widthPixel(28),
        backgroundColor: colors.primary,
    },
    dot_inactive: {
        width: heightPixel(8),
        backgroundColor: colors.lightest_primary,
    },
    actions: {
        gap: heightPixel(14),
    },
})
