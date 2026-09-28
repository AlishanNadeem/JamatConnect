import { StyleSheet, View } from "react-native"
import BusinessCard from "../../components/BusinessCard"
import BusinessFilters from "../../components/BusinessFilters"
import FlatList from "../../components/FlatList"
import Icon from "../../components/Icon"
import Input from "../../components/Input"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useBusinessesController from "./useBusinessesController"

const Businesses = () => {

    const { values, functions } = useBusinessesController()

    return (
        <PrimaryLayout bottom_tab header>
            <View style={styles.container}>
                <View style={styles.search_row}>
                    <View style={styles.search_input}>
                        <Input
                            placeholder="Search businesses"
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
                    renderItem={({ item }) => (
                        <BusinessCard
                            data={item}
                            saved={values.saved_business_ids.includes(String(item._id))}
                            onPress={() => functions.onBusinessPress(item)}
                            onSave={() => functions.onToggleSave(item)}
                        />
                    )}
                    empty={values.empty}
                    loading={values.is_loading}
                    style={styles.list}
                />
            </View>
            <BusinessFilters
                visible={values.filters_visible}
                onClose={functions.onCloseFilters}
                onApply={functions.onApplyFilters}
                onReset={functions.onResetFilters}
                filters={values.filters}
                category_options={values.category_options}
                categories_loading={values.categories_loading}
            />
        </PrimaryLayout>
    )
}

export default Businesses

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
