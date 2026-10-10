import { StyleSheet, View } from "react-native"
import BusinessCard from "../../components/BusinessCard"
import FlatList from "../../components/FlatList"
import JobCard from "../../components/JobCard"
import Row from "../../components/Row"
import Text from "../../components/Text"
import Touchable from "../../components/Touchable"
import colors from "../../helpers/colors"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useSavedBusinessesController from "./useSavedBusinessesController"

const SavedTabs = ({ tab, onChange }) => (
    <Row gap={8} style={styles.tabs}>
        {[
            { key: "businesses", label: "Businesses" },
            { key: "jobs", label: "Jobs" },
        ].map((item) => {
            const active = tab === item.key
            return (
                <Touchable
                    key={item.key}
                    onPress={() => onChange(item.key)}
                    style={[styles.tab, active && styles.tab_active]}
                >
                    <Text
                        size={13}
                        weight="semibold"
                        color={active ? colors.white : colors.dark_gray}
                        align="center"
                    >
                        {item.label}
                    </Text>
                </Touchable>
            )
        })}
    </Row>
)

const SavedBusinesses = () => {

    const { values, functions } = useSavedBusinessesController()
    const is_jobs = values.tab === "jobs"

    return (
        <PrimaryLayout header>
            <View style={styles.content}>
                <View style={styles.header_text}>
                    <Text size={18} weight="semibold">
                        Saved
                    </Text>
                    <Text size={13} color={colors.gray}>
                        Businesses and jobs you have bookmarked.
                    </Text>
                </View>
                <SavedTabs tab={values.tab} onChange={functions.setTab} />
                <FlatList
                    data={values.data}
                    refreshing={values.refreshing}
                    loading_more={values.loading_more}
                    onRefresh={functions.onRefresh}
                    keyExtractor={(item) => String(item._id)}
                    renderItem={({ item }) => (
                        is_jobs ? (
                            <JobCard
                                data={item}
                                saved={values.saved_job_ids.includes(String(item._id))}
                                onPress={() => functions.onJobPress(item)}
                                onSave={() => functions.onToggleSaveJob(item)}
                            />
                        ) : (
                            <BusinessCard
                                data={item}
                                saved={values.saved_business_ids.includes(String(item._id))}
                                onPress={() => functions.onBusinessPress(item)}
                                onSave={() => functions.onToggleSaveBusiness(item)}
                            />
                        )
                    )}
                    empty={values.empty}
                    style={styles.list}
                    loading={values.is_loading}
                />
            </View>
        </PrimaryLayout>
    )
}

export default SavedBusinesses

const styles = StyleSheet.create({
    content: {
        flex: 1,
        gap: heightPixel(16),
    },
    header_text: {
        gap: heightPixel(4),
        paddingTop: heightPixel(4),
    },
    tabs: {
        width: "100%",
    },
    tab: {
        flex: 1,
        paddingVertical: heightPixel(10),
        borderRadius: heightPixel(12),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
    tab_active: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    list: {
        flex: 1,
    },
})
