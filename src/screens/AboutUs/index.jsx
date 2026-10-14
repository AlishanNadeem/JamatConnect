import { StyleSheet, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { useNavigation } from "@react-navigation/native"
import images from "../../assets/images"
import Icon from "../../components/Icon"
import Row from "../../components/Row"
import Text from "../../components/Text"
import { APP_NAME } from "../../config/env"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import { ROUTES } from "../../helpers/routes"
import PrimaryLayout from "../../layouts/PrimaryLayout"

const PILLARS = [
    {
        icon: "store",
        title: "Local businesses",
        description: "Help community shops get discovered by the people nearby.",
    },
    {
        icon: "briefcase",
        title: "Community jobs",
        description: "Make hiring simpler for employers and job seekers alike.",
    },
    {
        icon: "shopping-bag",
        title: "Trusted marketplace",
        description: "Buy and sell with people you know and trust.",
    },
]

const AboutUs = () => {

    const navigation = useNavigation()

    return (
        <PrimaryLayout scrollable header>
            <View style={styles.content}>
                <View style={styles.hero}>
                    <LinearGradient
                        colors={[colors.dark_primary, colors.primary, colors.light_primary]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={StyleSheet.absoluteFill}
                        pointerEvents="none"
                    />
                    <View style={styles.circle_one} />
                    <View style={styles.circle_two} />

                    <Icon
                        source={images.logo}
                        size={72}
                        space
                        rounded="half"
                        background={colors.white}
                    />
                    <View style={styles.hero_text}>
                        <Text size={24} weight="bold" align="center" color={colors.white}>
                            {APP_NAME}
                        </Text>
                        <Text size={14} align="center" color={colors.lightest_primary}>
                            Local businesses, jobs, and marketplace — in one community app.
                        </Text>
                    </View>
                </View>

                <View style={styles.story}>
                    <Text size={12} weight="semibold" color={colors.gray} style={styles.eyebrow}>
                        OUR STORY
                    </Text>
                    <Text size={20} weight="bold">
                        Built to keep value circulating in the community
                    </Text>
                    <Text size={15} color={colors.dark_gray}>
                        {APP_NAME} started with a simple idea: make it easier to support the businesses around you, find meaningful local work, and buy or sell with people you trust.
                    </Text>
                    <Text size={15} color={colors.dark_gray}>
                        We are building a practical home for community commerce — clear, mobile-first, and focused on real connections rather than noise.
                    </Text>
                </View>

                <View style={styles.pillars_section}>
                    <Text size={12} weight="semibold" color={colors.gray} style={styles.eyebrow}>
                        WHAT WE STAND FOR
                    </Text>
                    <View style={styles.pillars_card}>
                        {PILLARS.map((pillar, index) => {
                            const is_last = index === PILLARS.length - 1

                            return (
                                <Row
                                    key={pillar.title}
                                    align="flex-start"
                                    gap={14}
                                    style={!is_last && styles.pillar_spaced}
                                >
                                    <Icon
                                        name={pillar.icon}
                                        size={44}
                                        space
                                        rounded="half"
                                        background={colors.lightest_primary}
                                        color={colors.primary}
                                    />
                                    <View style={styles.pillar_details}>
                                        <Text size={15} weight="semibold">
                                            {pillar.title}
                                        </Text>
                                        <Text size={13} color={colors.gray}>
                                            {pillar.description}
                                        </Text>
                                    </View>
                                </Row>
                            )
                        })}
                    </View>
                </View>

                <Row
                    align="center"
                    gap={14}
                    onPress={() => navigation.navigate(ROUTES.CONTACT_US)}
                    style={styles.contact_card}
                >
                    <Icon
                        name="mail"
                        size={44}
                        space
                        rounded="half"
                        background={colors.lightest_primary}
                        color={colors.primary}
                    />
                    <View style={styles.contact_details}>
                        <Text size={15} weight="semibold">
                            Get in touch
                        </Text>
                        <Text size={13} color={colors.gray}>
                            Questions or feedback? We would love to hear from you.
                        </Text>
                    </View>
                    <Icon name="chevron-right" size={20} color={colors.gray} />
                </Row>
            </View>
        </PrimaryLayout>
    )
}

export default AboutUs

const styles = StyleSheet.create({
    content: {
        gap: heightPixel(20),
        paddingTop: heightPixel(4),
    },
    hero: {
        alignItems: "center",
        gap: heightPixel(14),
        paddingVertical: heightPixel(28),
        paddingHorizontal: widthPixel(24),
        borderRadius: heightPixel(24),
        overflow: "hidden",
        backgroundColor: colors.primary,
    },
    circle_one: {
        position: "absolute",
        width: widthPixel(140),
        height: widthPixel(140),
        borderRadius: widthPixel(70),
        backgroundColor: "rgba(255,255,255,0.08)",
        top: -widthPixel(40),
        right: -widthPixel(30),
    },
    circle_two: {
        position: "absolute",
        width: widthPixel(100),
        height: widthPixel(100),
        borderRadius: widthPixel(50),
        backgroundColor: "rgba(255,255,255,0.06)",
        bottom: -widthPixel(30),
        left: -widthPixel(20),
    },
    hero_text: {
        gap: heightPixel(6),
    },
    story: {
        gap: heightPixel(10),
        paddingVertical: heightPixel(20),
        paddingHorizontal: widthPixel(20),
        borderRadius: heightPixel(20),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
    eyebrow: {
        letterSpacing: widthPixel(2),
    },
    pillars_section: {
        gap: heightPixel(10),
    },
    pillars_card: {
        paddingVertical: heightPixel(20),
        paddingHorizontal: widthPixel(20),
        borderRadius: heightPixel(20),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
    pillar_spaced: {
        marginBottom: heightPixel(18),
    },
    pillar_details: {
        flex: 1,
        gap: heightPixel(4),
        paddingTop: heightPixel(4),
    },
    contact_card: {
        paddingVertical: heightPixel(18),
        paddingHorizontal: widthPixel(18),
        borderRadius: heightPixel(20),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
    contact_details: {
        flex: 1,
        gap: heightPixel(4),
    },
})
