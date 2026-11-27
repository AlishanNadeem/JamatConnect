import { StyleSheet, View } from "react-native"
import BusinessCard from "../../components/BusinessCard"
import CategoryPills from "../../components/CategoryPills"
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
                <Input
                    placeholder="Search businesses"
                    icon="search"
                    value={values.search}
                    onChangeText={functions.onSearchChange}
                />
                <CategoryPills
                    options={values.category_options}
                    selected={values.filters.category}
                    onSelect={functions.onSelectCategory}
                />
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
    list: {
        flex: 1,
    },
})
