import { StyleSheet, View } from "react-native"
import BusinessCard from "../../components/BusinessCard"
import FlatList from "../../components/FlatList"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useBusinessesController from "./useBusinessesController"

const Businesses = () => {

    const { values, functions } = useBusinessesController()

    return (
        <PrimaryLayout bottom_tab header>
            <View style={styles.container}>
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
    },
})
