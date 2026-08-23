import { StyleSheet, View } from "react-native"
import FlatList from "../../components/FlatList"
import Icon from "../../components/Icon"
import Input from "../../components/Input"
import MarketplaceCard from "../../components/MarketplaceCard"
import MarketplaceFilters from "../../components/MarketplaceFilters"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useMarketplaceController from "./useMarketplaceController"

const Marketplace = () => {

    const { values, functions } = useMarketplaceController()

    return (
        <PrimaryLayout header bottom_tab>
            <View style={styles.container}>
                <View style={styles.search_row}>
                    <View style={styles.search_input}>
                        <Input
                            placeholder="Search listings"
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
                            rounded={"half"}
                            background={colors.white}
                        />
                        {values.has_active_filters ? (
                            <View style={styles.filter_dot} />
                        ) : null}
                    </View>
                </View>
                <FlatList
                    data={values.data}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    separator={0}
                    refreshing={values.refreshing}
                    loading_more={values.loading_more}
                    onRefresh={functions.onRefresh}
                    loading={values.is_loading}
                    renderItem={({ item }) => (
                        <MarketplaceCard
                            data={item}
                            onPress={() => functions.onListingPress(item)}
                        />
                    )}
                    empty={values.empty}
                    style={styles.list}
                />
            </View>
            <MarketplaceFilters
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

export default Marketplace

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
    filter_button: {
        width: heightPixel(56),
        height: heightPixel(56),
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
        borderRadius: heightPixel(12),
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
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
    row: {
        gap: widthPixel(12),
        marginBottom: heightPixel(12),
    },
})
