import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import images from "../../assets/images";
import Button from "../../components/Button";
import Text from "../../components/Text";
import colors from "../../helpers/colors";
import { GLOBAL_HORIZONTAL_PADDING, heightPixel, SCREEN_WIDTH, widthPixel } from "../../helpers/metrics";
import PrimaryLayout from "../../layouts/PrimaryLayout";
import { useDispatch } from "react-redux";
import { completeOnboarding } from "../../redux/slices/general.slice";

const DATA = [
    { id: "1", title: "Quick ", subtitle: "Daily Check-Ins", description: "Respond in seconds and let your family know you're safe." },
    { id: "2", title: "Instant", subtitle: "SOS Alerts", description: "Send an emergency signal to your loved ones with just one tap." },
    { id: "3", title: "Stay", subtitle: "Connected 24/7", description: "Keep your circle updated on your safety, anytime and anywhere." },
]

const AUTO_SCROLL_INTERVAL = 3000;

const Onboarding = () => {

    const dispatch = useDispatch()

    const flatlist_ref = useRef(null);
    const scroll_x = useRef(new Animated.Value(0)).current;

    const logo_height = useRef(new Animated.Value(heightPixel(336))).current;
    const logo_top = useRef(new Animated.Value(heightPixel(570))).current;
    const slider_opacity = useRef(new Animated.Value(0)).current;

    const [currentIndex, setCurrentIndex] = useState(0);

    const view_config = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const onViewRef = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    useEffect(() => {
        const timer = setTimeout(() => {
            Animated.parallel([
                Animated.timing(logo_height, { toValue: heightPixel(336), duration: 500, useNativeDriver: false }),
                Animated.timing(logo_top, { toValue: heightPixel(215), duration: 500, useNativeDriver: false }),
            ]).start(() => {
                Animated.timing(slider_opacity, { toValue: 1, duration: 200, useNativeDriver: true }).start();
            });
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {

        const interval = setInterval(() => {

            let next_index = currentIndex + 1;
            if (next_index >= DATA.length) next_index = 0;
            flatlist_ref.current.scrollToIndex({ index: next_index, animated: true });

        }, AUTO_SCROLL_INTERVAL);

        return () => clearInterval(interval);

    }, [currentIndex])

    const onContinue = useCallback(() => {
        dispatch(completeOnboarding())
    }, [dispatch])

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <View>
                <Text align="center" size={34} weight="semibold" color={colors.lime_primary}>{item.title}</Text>
                <Text align="center" size={34} weight="semibold">{item.subtitle}</Text>
            </View>
            <View>
                <Text align="center" size={18}>{item.description}</Text>
            </View>
        </View>
    );

    return (
        <PrimaryLayout padding_horizontal={false} top={false}>
            <View style={styles.content}>
                <Animated.Image source={images.full_logo} style={[styles.logo, { height: logo_height, width: logo_height, top: logo_top }]} />
                <Animated.View style={[styles.slider, { opacity: slider_opacity }]}>
                    <View style={styles.pagination}>
                        {
                            DATA.map((_, i) => {

                                const input_range = [
                                    (i - 1) * (SCREEN_WIDTH - GLOBAL_HORIZONTAL_PADDING * 4),
                                    i * (SCREEN_WIDTH - GLOBAL_HORIZONTAL_PADDING * 4),
                                    (i + 1) * (SCREEN_WIDTH - GLOBAL_HORIZONTAL_PADDING * 4),
                                ];

                                const width = scroll_x.interpolate({ inputRange: input_range, outputRange: [heightPixel(6), widthPixel(24), heightPixel(6)], extrapolate: "clamp" });

                                const backgroundColor = scroll_x.interpolate({ inputRange: input_range, outputRange: [colors.lightest_white, colors.light_primary, colors.lightest_white], extrapolate: "clamp" });

                                return <Animated.View key={i} style={[styles.dot, { width, backgroundColor }]} />;

                            })
                        }
                    </View>
                    <Animated.FlatList
                        ref={flatlist_ref}
                        data={DATA}
                        renderItem={renderItem}
                        horizontal
                        pagingEnabled
                        scrollEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        onViewableItemsChanged={onViewRef}
                        viewabilityConfig={view_config}
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scroll_x } } }], { useNativeDriver: false })}
                        scrollEventThrottle={16}
                        contentContainerStyle={styles.list}
                    />
                    <Button onPress={onContinue}>Let's Start</Button>
                </Animated.View>
            </View>
        </PrimaryLayout>
    );
};

export default Onboarding;

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    logo: {
        position: "absolute",
        alignSelf: "center",
        resizeMode: "contain",
    },
    slider: {
        position: "absolute",
        bottom: heightPixel(80),
        left: 0,
        right: 0,
        paddingHorizontal: GLOBAL_HORIZONTAL_PADDING * 2,
        gap: heightPixel(25),
    },
    list: {
        alignItems: "center",
        marginBottom: heightPixel(20),
    },
    item: {
        alignItems: "center",
        width: SCREEN_WIDTH - GLOBAL_HORIZONTAL_PADDING * 4,
        gap: heightPixel(20),
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: widthPixel(6),
    },
    dot: {
        height: heightPixel(6),
        borderRadius: heightPixel(20),
    },
});
