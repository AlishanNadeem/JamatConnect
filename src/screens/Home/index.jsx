import { StyleSheet, View } from "react-native"
import { useCallback } from "react"
import LinearGradient from "react-native-linear-gradient"
import { useSelector } from "react-redux"
import BusinessCard from "../../components/BusinessCard"
import CategoryCard from "../../components/CategoryCard"
import FlatList from "../../components/FlatList"
import Icon from "../../components/Icon"
import JobCard from "../../components/JobCard"
import MarketplaceCard from "../../components/MarketplaceCard"
import Row from "../../components/Row"
import Text from "../../components/Text"
import { APP_NAME } from "../../config/env"
import colors from "../../helpers/colors"
import { formatDate } from "../../helpers/date"
import { getGreeting } from "../../helpers/general"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import { selectUser } from "../../redux/selectors"
import useHomeController from "./useHomeController"

const GreetingCard = ({ user }) => {

    const member_since = formatDate(user?.createdAt)

    return (
        <View style={styles.card}>
            <LinearGradient
                colors={[colors.dark_primary, colors.primary, colors.light_primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
                pointerEvents="none"
            />
            <View style={styles.circle_one} />
            <View style={styles.circle_two} />
            <View style={styles.circle_three} />

            <Row align="center" gap={14} style={styles.content}>
                <View style={styles.avatar}>
                    <Icon
                        rounded="full"
                        source={{ uri: user?.image_url }}
                        size={64}
                        resize="cover"
                        border={colors.white}
                    />
                </View>
                <View style={styles.text_block}>
                    <Text size={13} weight="semibold" color={colors.lightest_primary}>
                        {getGreeting()}
                    </Text>
                    <Text size={20} weight="bold" color={colors.white} lines={1}>
                        {user?.name || "Guest"}
                    </Text>
                    {member_since ? (
                        <Row align="center" gap={6} style={styles.member_row}>
                            <Icon name="calendar" size={14} color={colors.lightest_primary} />
                            <Text size={12} color={colors.lightest_primary}>
                                Member since {member_since}
                            </Text>
                        </Row>
                    ) : null}
                </View>
            </Row>
        </View>
    )
}

const CommunityCard = ({ onPress }) => (
    <View style={styles.community_card}>
        <LinearGradient
            colors={[colors.dark_primary, colors.primary, colors.light_primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
        />
        <View style={styles.community_circle_one} />
        <View style={styles.community_circle_two} />
        <View style={styles.community_circle_three} />

        <Row align="center" gap={14} style={styles.community_top}>
            <View style={styles.community_icon}>
                <Icon
                    name="users"
                    size={44}
                    space
                    rounded="half"
                    background={colors.white}
                    color={colors.primary}
                />
            </View>
            <View style={styles.community_text}>
                <Text size={12} weight="semibold" color={colors.lightest_primary}>
                    Referrals
                </Text>
                <Text size={18} weight="bold" color={colors.white} lines={2}>
                    Help our community grow
                </Text>
            </View>
        </Row>

        <Text size={13} color={colors.lightest_primary}>
            Invite friends and family to join {APP_NAME} and strengthen our community together.
        </Text>

        <Row align="center" justify="space-between" onPress={onPress} style={styles.community_action}>
            <Text size={14} weight="semibold" color={colors.primary}>
                Invite Friends
            </Text>
            <View style={styles.community_action_icon}>
                <Icon name="arrow-right" size={16} color={colors.white} />
            </View>
        </Row>
    </View>
)

const CategoriesSection = ({ categories, onCategoryPress, onViewAll }) => {

    const renderItem = useCallback(({ item }) => (
        <CategoryCard
            data={item}
            onPress={() => onCategoryPress(item)}
        />
    ), [onCategoryPress])

    const keyExtractor = useCallback(
        (item) => (item.id ?? item._id)?.toString(),
        [],
    )

    return (
        <View style={styles.section}>
            <Row align="center" justify="space-between">
                <Text size={16} weight="bold">
                    Categories
                </Text>
                <Text size={13} weight="semibold" color={colors.primary} onPress={onViewAll}>
                    View All
                </Text>
            </Row>

            <FlatList
                horizontal
                nestedScrollEnabled
                data={categories}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                separator={14}
                contentContainerStyle={styles.categories_list}
            />
        </View>
    )
}

const JobsSection = ({ jobs, saved_job_ids, onJobPress, onToggleSave, onViewAll }) => {

    if (!jobs.length) return null

    return (
        <View style={styles.section}>
            <Row align="center" justify="space-between">
                <Text size={16} weight="bold">
                    Latest Jobs
                </Text>
                <Text size={13} weight="semibold" color={colors.primary} onPress={onViewAll}>
                    View All
                </Text>
            </Row>
            <FlatList
                data={jobs}
                scrollEnabled={false}
                keyExtractor={(item) => String(item._id)}
                renderItem={({ item }) => (
                    <JobCard
                        data={item}
                        saved={saved_job_ids.includes(String(item._id))}
                        onPress={() => onJobPress(item)}
                        onSave={() => onToggleSave(item)}
                    />
                )}
            />
        </View>
    )
}

const MarketplaceSection = ({ listings, onListingPress, onViewAll }) => {

    if (!listings.length) return null

    return (
        <View style={styles.section}>
            <Row align="center" justify="space-between">
                <Text size={16} weight="bold">
                    Marketplace
                </Text>
                <Text size={13} weight="semibold" color={colors.primary} onPress={onViewAll}>
                    View All
                </Text>
            </Row>
            <FlatList
                data={listings}
                numColumns={2}
                scrollEnabled={false}
                columnWrapperStyle={styles.marketplace_row}
                separator={0}
                keyExtractor={(item) => String(item._id)}
                renderItem={({ item }) => (
                    <MarketplaceCard
                        data={item}
                        onPress={() => onListingPress(item)}
                    />
                )}
            />
        </View>
    )
}

const BusinessesSection = ({ businesses, saved_business_ids, onBusinessPress, onToggleSave, onViewAll }) => {

    if (!businesses.length) return null

    return (
        <View style={styles.section}>
            <Row align="center" justify="space-between">
                <Text size={16} weight="bold">
                    New Businesses
                </Text>
                <Text size={13} weight="semibold" color={colors.primary} onPress={onViewAll}>
                    View All
                </Text>
            </Row>
            <FlatList
                data={businesses}
                scrollEnabled={false}
                keyExtractor={(item) => String(item._id)}
                renderItem={({ item }) => (
                    <BusinessCard
                        data={item}
                        saved={saved_business_ids.includes(String(item._id))}
                        onPress={() => onBusinessPress(item)}
                        onSave={() => onToggleSave(item)}
                    />
                )}
            />
        </View>
    )
}

const Home = () => {

    const user = useSelector(selectUser)
    const { values, functions } = useHomeController()

    return (
        <PrimaryLayout bottom_tab header scrollable>
            <View style={styles.container}>
                <GreetingCard user={user} />
                <CategoriesSection
                    categories={values.categories}
                    onCategoryPress={functions.onCategoryPress}
                    onViewAll={functions.onViewAllCategories}
                />
                <JobsSection
                    jobs={values.jobs}
                    saved_job_ids={values.saved_job_ids}
                    onJobPress={functions.onJobPress}
                    onToggleSave={functions.onToggleSaveJob}
                    onViewAll={functions.onViewAllJobs}
                />
                <MarketplaceSection
                    listings={values.listings}
                    onListingPress={functions.onListingPress}
                    onViewAll={functions.onViewAllListings}
                />
                <BusinessesSection
                    businesses={values.businesses}
                    saved_business_ids={values.saved_business_ids}
                    onBusinessPress={functions.onBusinessPress}
                    onToggleSave={functions.onToggleSave}
                    onViewAll={functions.onViewAllBusinesses}
                />
                <CommunityCard onPress={functions.onGrowCommunity} />
            </View>
        </PrimaryLayout>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(16),
        paddingTop: heightPixel(8),
    },
    card: {
        position: "relative",
        paddingHorizontal: widthPixel(16),
        paddingVertical: heightPixel(18),
        borderRadius: heightPixel(20),
        overflow: "hidden",
        backgroundColor: colors.primary,
    },
    avatar: {
        flexShrink: 0,
    },
    circle_one: {
        position: "absolute",
        top: heightPixel(-24),
        right: widthPixel(-24),
        width: widthPixel(100),
        height: widthPixel(100),
        borderRadius: widthPixel(50),
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    circle_two: {
        position: "absolute",
        bottom: heightPixel(-32),
        left: widthPixel(-20),
        width: widthPixel(80),
        height: widthPixel(80),
        borderRadius: widthPixel(40),
        backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
    circle_three: {
        position: "absolute",
        top: heightPixel(20),
        right: widthPixel(60),
        width: widthPixel(36),
        height: widthPixel(36),
        borderRadius: widthPixel(18),
        backgroundColor: "rgba(255, 255, 255, 0.12)",
    },
    community_card: {
        position: "relative",
        gap: heightPixel(14),
        paddingHorizontal: widthPixel(16),
        paddingVertical: heightPixel(18),
        borderRadius: heightPixel(20),
        overflow: "hidden",
        backgroundColor: colors.primary,
    },
    community_circle_one: {
        position: "absolute",
        top: heightPixel(-28),
        right: widthPixel(-18),
        width: widthPixel(110),
        height: widthPixel(110),
        borderRadius: widthPixel(55),
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    community_circle_two: {
        position: "absolute",
        bottom: heightPixel(-36),
        left: widthPixel(-22),
        width: widthPixel(88),
        height: widthPixel(88),
        borderRadius: widthPixel(44),
        backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
    community_circle_three: {
        position: "absolute",
        top: heightPixel(52),
        right: widthPixel(72),
        width: widthPixel(28),
        height: widthPixel(28),
        borderRadius: widthPixel(14),
        backgroundColor: "rgba(255, 255, 255, 0.12)",
    },
    community_top: {
        width: "100%",
    },
    community_icon: {
        flexShrink: 0,
    },
    community_text: {
        flex: 1,
        gap: heightPixel(2),
    },
    community_action: {
        width: "100%",
        paddingLeft: widthPixel(16),
        paddingRight: widthPixel(8),
        paddingVertical: heightPixel(8),
        borderRadius: heightPixel(14),
        backgroundColor: colors.white,
    },
    community_action_icon: {
        width: heightPixel(32),
        height: heightPixel(32),
        borderRadius: heightPixel(16),
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        width: "100%",
    },
    text_block: {
        flex: 1,
        gap: heightPixel(4),
    },
    member_row: {
        width: "auto",
        marginTop: heightPixel(2),
    },
    section: {
        gap: heightPixel(12),
    },
    categories_list: {
        paddingVertical: heightPixel(4),
    },
    marketplace_row: {
        gap: widthPixel(12),
        marginBottom: heightPixel(12),
    },
})
