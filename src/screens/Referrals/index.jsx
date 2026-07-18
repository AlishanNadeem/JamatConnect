import { StyleSheet, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import Button from "../../components/Button"
import Icon from "../../components/Icon"
import Row from "../../components/Row"
import Text from "../../components/Text"
import { APP_NAME } from "../../config/env"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useReferralsController from "./useReferralsController"
import { global_styles } from "../../helpers/styles"

const STEPS = [
    {
        icon: "share-2",
        title: "Share your link",
        description: "Send your personal invite link to friends and family.",
    },
    {
        icon: "user-plus",
        title: "They sign up",
        description: "Your friend creates an account through your link.",
    },
    {
        icon: "users",
        title: "Stay connected",
        description: `Help your circle join ${APP_NAME} and stay in touch.`,
    },
]

const InviteCard = ({ total_referrals, onPress }) => (
    <View style={styles.invite_card}>
        <LinearGradient
            colors={[colors.light_primary, colors.dark_primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.invite_banner}
        >
            <Icon
                name="users"
                size={56}
                space
                rounded="half"
                background={colors.white}
                color={colors.primary}
            />

            <Text size={26} weight="bold" align="center" color={colors.white}>
                Invite Friends
            </Text>

            <Text size={14} align="center" color={colors.lime_primary}>
                Share {APP_NAME} with people you trust and grow your community.
            </Text>
        </LinearGradient>

        <Row align="center" justify="space-between" gap={16} onPress={onPress} style={styles.stats_row}>
            <View style={styles.stats_details}>
                <Text size={16} weight="semibold">
                    Total Referrals
                </Text>
                <Text size={12} color={colors.gray}>
                    Based on users who successfully joined the platform.
                </Text>
            </View>
            <Row align="center" gap={8} style={global_styles.auto_width}>
                <Text size={36} weight="bold" align="right" color={colors.primary}>
                    {total_referrals}
                </Text>
                <Icon name="chevron-right" size={20} color={colors.gray} />
            </Row>
        </Row>
    </View>
)

const ShareCard = ({ onShare }) => (
    <View style={styles.share_card}>
        <Row align="center" gap={14}>
            <Icon
                name="share-2"
                size={44}
                space
                rounded="half"
                background={colors.lightest_primary}
                color={colors.primary}
            />
            <View style={styles.share_details}>
                <Text size={16} weight="semibold">
                    Share your invite
                </Text>
                <Text size={13} color={colors.gray}>
                    Send your link through messages, email, or social apps.
                </Text>
            </View>
        </Row>
        <Button onPress={onShare}>Share Referral Link</Button>
    </View>
)

const StepsSection = () => (
    <View style={styles.steps_section}>
        <Text size={12} weight="semibold" color={colors.gray} style={styles.steps_heading}>
            HOW IT WORKS
        </Text>

        <View style={styles.steps_card}>
            {STEPS.map((step, index) => {
                const is_last = index === STEPS.length - 1

                return (
                    <View key={step.title} style={styles.step_row}>
                        <View style={styles.step_timeline}>
                            <Icon
                                name={step.icon}
                                size={40}
                                space
                                rounded="half"
                                background={colors.lightest_primary}
                                color={colors.primary}
                            />
                            {!is_last ? <View style={styles.step_connector} /> : null}
                        </View>
                        <View style={[styles.step_details, !is_last && styles.step_details_spaced]}>
                            <Text size={15} weight="semibold">
                                {step.title}
                            </Text>
                            <Text size={13} color={colors.gray}>
                                {step.description}
                            </Text>
                        </View>
                    </View>
                )
            })}
        </View>
    </View>
)

const Referrals = () => {

    const { values, functions } = useReferralsController()

    return (
        <PrimaryLayout scrollable header>
            <View style={styles.content}>
                <InviteCard
                    total_referrals={values.total_referrals}
                    onPress={functions.onViewReferrals}
                />
                <ShareCard onShare={functions.onShare} />
                <StepsSection />
            </View>
        </PrimaryLayout>
    )
}

export default Referrals

const styles = StyleSheet.create({
    content: {
        gap: heightPixel(20),
        paddingTop: heightPixel(4),
    },
    invite_card: {
        borderRadius: heightPixel(24),
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
        overflow: "hidden",
        backgroundColor: colors.white,
    },
    invite_banner: {
        alignItems: "center",
        gap: heightPixel(12),
        paddingVertical: heightPixel(28),
        paddingHorizontal: widthPixel(24),
    },
    stats_row: {
        paddingVertical: heightPixel(20),
        paddingHorizontal: widthPixel(20),
        backgroundColor: colors.white,
    },
    stats_details: {
        flex: 1,
        gap: heightPixel(4),
    },
    share_card: {
        gap: heightPixel(18),
        paddingVertical: heightPixel(20),
        paddingHorizontal: widthPixel(20),
        borderRadius: heightPixel(20),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
    share_details: {
        flex: 1,
        gap: heightPixel(4),
    },
    steps_section: {
        gap: heightPixel(10),
    },
    steps_heading: {
        letterSpacing: widthPixel(2),
        marginLeft: widthPixel(4),
    },
    steps_card: {
        paddingVertical: heightPixel(20),
        paddingHorizontal: widthPixel(20),
        borderRadius: heightPixel(20),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
    step_row: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: widthPixel(14),
    },
    step_timeline: {
        alignItems: "center",
        width: widthPixel(40),
    },
    step_connector: {
        width: heightPixel(2),
        height: heightPixel(32),
        marginVertical: heightPixel(6),
        borderRadius: heightPixel(2),
        backgroundColor: colors.lightest_primary,
    },
    step_details: {
        flex: 1,
        gap: heightPixel(4),
        paddingTop: heightPixel(8),
    },
    step_details_spaced: {
        paddingBottom: heightPixel(20),
    },
})
