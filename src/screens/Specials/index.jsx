import { StyleSheet, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import FlatList from "../../components/FlatList"
import Input from "../../components/Input"
import Row from "../../components/Row"
import SpecialCard from "../../components/SpecialCard"
import Text from "../../components/Text"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useSpecialsController from "./useSpecialsController"

const DealsHeader = ({ count, searching }) => (
    <LinearGradient
        colors={[colors.dark_primary, colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
    >
        <View style={styles.hero_orb_one} />
        <View style={styles.hero_orb_two} />
        <Text size={12} weight="semibold" color={colors.lightest_primary}>
            Community deals
        </Text>
        <Text size={20} weight="bold" color={colors.white}>
            {searching ? "Search results" : "Specials near you"}
        </Text>
        <Row align="center" gap={6} style={styles.hero_count}>
            <View style={styles.count_dot} />
            <Text size={13} color={colors.lightest_primary}>
                <Text size={13} weight="bold" color={colors.white}>
                    {count}
                </Text>
                {" "}
                {count === 1 ? "deal" : "deals"} available
            </Text>
        </Row>
    </LinearGradient>
)

const Specials = () => {
    const { values, functions } = useSpecialsController()
    const count = values.data?.length || 0

    return (
        <PrimaryLayout bottom_tab header>
            <View style={styles.container}>
                <DealsHeader count={count} searching={Boolean(values.search)} />
                <Input
                    placeholder="Search deals or businesses"
                    icon="search"
                    value={values.search}
                    onChangeText={functions.onSearchChange}
                />
                <FlatList
                    data={values.data}
                    refreshing={values.refreshing}
                    loading_more={values.loading_more}
                    onRefresh={functions.onRefresh}
                    loading={values.is_loading}
                    keyExtractor={(item) => String(item._id)}
                    renderItem={({ item }) => (
                        <SpecialCard
                            data={item}
                            onPress={() => functions.onSpecialPress(item)}
                        />
                    )}
                    empty={values.empty}
                    style={styles.list}
                    separator={12}
                />
            </View>
        </PrimaryLayout>
    )
}

export default Specials

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: heightPixel(12),
        minHeight: heightPixel(200),
    },
    hero: {
        borderRadius: widthPixel(16),
        paddingHorizontal: widthPixel(16),
        paddingVertical: heightPixel(16),
        overflow: "hidden",
        gap: heightPixel(4),
    },
    hero_orb_one: {
        position: "absolute",
        width: widthPixel(120),
        height: widthPixel(120),
        borderRadius: widthPixel(60),
        backgroundColor: "rgba(255,255,255,0.08)",
        top: -heightPixel(40),
        right: -widthPixel(20),
    },
    hero_orb_two: {
        position: "absolute",
        width: widthPixel(80),
        height: widthPixel(80),
        borderRadius: widthPixel(40),
        backgroundColor: "rgba(255,255,255,0.06)",
        bottom: -heightPixel(30),
        left: widthPixel(40),
    },
    hero_count: {
        marginTop: heightPixel(6),
    },
    count_dot: {
        width: widthPixel(6),
        height: widthPixel(6),
        borderRadius: widthPixel(3),
        backgroundColor: colors.lightest_primary,
    },
    list: {
        flex: 1,
    },
})
