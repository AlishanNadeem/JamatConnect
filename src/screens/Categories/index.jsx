import { StyleSheet, View } from "react-native"
import CategoryCard from "../../components/CategoryCard"
import FlatList from "../../components/FlatList"
import { GLOBAL_HORIZONTAL_PADDING, heightPixel, SCREEN_WIDTH, widthPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useCategoriesController from "./useCategoriesController"

const Categories = () => {

    const { values, functions } = useCategoriesController()

    return (
        <PrimaryLayout header>
            <View style={styles.container}>
                <FlatList
                    data={values.data}
                    numColumns={4}
                    columnWrapperStyle={styles.row}
                    separator={0}
                    refreshing={values.refreshing}
                    onRefresh={functions.onRefresh}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <CategoryCard
                                data={item}
                                onPress={() => functions.onCategoryPress(item)}
                            />
                        </View>
                    )}
                    empty={values.empty}
                    loading={values.is_loading}
                />
            </View>
        </PrimaryLayout>
    )
}

export default Categories

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: heightPixel(200),
    },
    row: {
        marginBottom: heightPixel(16),
    },
    item: {
        width: (SCREEN_WIDTH - (GLOBAL_HORIZONTAL_PADDING * 2)) / 4,
        alignItems: "center",
    },
})
