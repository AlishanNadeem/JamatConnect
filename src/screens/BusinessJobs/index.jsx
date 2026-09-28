import { StyleSheet, View } from "react-native"
import FlatList from "../../components/FlatList"
import Input from "../../components/Input"
import JobCard from "../../components/JobCard"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useBusinessJobsController from "./useBusinessJobsController"

const BusinessJobs = () => {

    const { values, functions } = useBusinessJobsController()

    return (
        <PrimaryLayout header>
            <View style={styles.container}>
                <Input
                    placeholder="Search jobs"
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
                        <JobCard
                            data={item}
                            onPress={() => functions.onJobPress(item)}
                        />
                    )}
                    empty={values.empty}
                    style={styles.list}
                />
            </View>
        </PrimaryLayout>
    )
}

export default BusinessJobs

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: heightPixel(12),
    },
    list: {
        flex: 1,
    },
})
