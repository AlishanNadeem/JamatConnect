import { StyleSheet, View } from "react-native"
import BusinessCard from "../../components/BusinessCard"
import Dropdown from "../../components/Dropdown"
import FlatList from "../../components/FlatList"
import Input from "../../components/Input"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useBusinessesController from "./useBusinessesController"

const Businesses = () => {

    const { values, functions } = useBusinessesController()

    return (
        <PrimaryLayout bottom_tab header>
            <View style={styles.container}>
                <View style={styles.filters}>
                    <Input
                        placeholder="Search businesses"
                        icon="search"
                        value={values.search}
                        onChangeText={functions.onSearchChange}
                    />
                    <Dropdown
                        placeholder="All Categories"
                        title="Filter by Category"
                        options={values.category_options}
                        value={values.selected_category}
                        loading={values.categories_loading}
                        onChange={functions.onCategoryChange}
                    />
                </View>
                <FlatList
                    data={values.data}
                    refreshing={values.refreshing}
                    loading_more={values.loading_more}
                    onRefresh={functions.onRefresh}
                    renderItem={({ item }) => (
                        <BusinessCard
                            data={item}
                            onPress={() => functions.onBusinessPress(item)}
                        />
                    )}
                    empty={values.empty}
                    loading={values.is_loading}
                    style={styles.list}
                />
            </View>
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
    filters: {
        gap: heightPixel(10),
    },
    list: {
        flex: 1,
    },
})
