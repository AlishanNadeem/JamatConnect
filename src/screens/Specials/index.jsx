import { StyleSheet, View } from "react-native"
import FlatList from "../../components/FlatList"
import Input from "../../components/Input"
import SpecialCard from "../../components/SpecialCard"
import SponsoredBillboard from "../../components/SponsoredBillboard"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useSpecialsController from "./useSpecialsController"

const Specials = () => {
    const { values, functions } = useSpecialsController()

    return (
        <PrimaryLayout bottom_tab header>
            <View style={styles.container}>
                <SponsoredBillboard
                    billboards={values.billboards}
                    onPress={functions.onBillboardPress}
                />
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
                    separator={9}
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
    list: {
        flex: 1,
    },
})
