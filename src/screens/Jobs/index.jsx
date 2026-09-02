import { StyleSheet, View } from "react-native"
import FlatList from "../../components/FlatList"
import Icon from "../../components/Icon"
import Input from "../../components/Input"
import JobCard from "../../components/JobCard"
import JobFilters from "../../components/JobFilters"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useJobsController from "./useJobsController"

const Jobs = () => {

    const { values, functions } = useJobsController()

    return (
        <PrimaryLayout bottom_tab header>
            <View style={styles.container}>
                <View style={styles.search_row}>
                    <View style={styles.search_input}>
                        <Input
                            placeholder="Search jobs"
                            icon="search"
                            value={values.search}
                            onChangeText={functions.onSearchChange}
                        />
                    </View>
                    <View>
                        <Icon
                            name="filter"
                            size={56}
                            color={values.has_active_filters ? colors.primary : colors.black}
                            onPress={functions.onOpenFilters}
                            border={values.has_active_filters ? colors.primary : colors.light_gray}
                            space
                            rounded="half"
                            background={colors.white}
                        />
                        {values.has_active_filters ? (
                            <View style={styles.filter_dot} />
                        ) : null}
                    </View>
                </View>
                <FlatList
                    data={values.data}
                    refreshing={values.refreshing}
                    loading_more={values.loading_more}
                    onRefresh={functions.onRefresh}
                    loading={values.is_loading}
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
            <JobFilters
                visible={values.filters_visible}
                onClose={functions.onCloseFilters}
                onApply={functions.onApplyFilters}
                onReset={functions.onResetFilters}
                filters={values.filters}
                employment_type_options={values.employment_type_options}
                workplace_type_options={values.workplace_type_options}
            />
        </PrimaryLayout>
    )
}

export default Jobs

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: heightPixel(200),
        gap: heightPixel(12),
    },
    search_row: {
        flexDirection: "row",
        alignItems: "center",
        gap: widthPixel(10),
    },
    search_input: {
        flex: 1,
    },
    filter_dot: {
        position: "absolute",
        top: heightPixel(8),
        right: widthPixel(8),
        width: heightPixel(8),
        height: heightPixel(8),
        borderRadius: heightPixel(4),
        backgroundColor: colors.primary,
    },
    list: {
        flex: 1,
    },
})
