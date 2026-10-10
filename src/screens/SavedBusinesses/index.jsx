import { StyleSheet, View } from "react-native"
import BusinessCard from "../../components/BusinessCard"
import FlatList from "../../components/FlatList"
import Text from "../../components/Text"
import colors from "../../helpers/colors"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useSavedBusinessesController from "./useSavedBusinessesController"

const SavedBusinesses = () => {

    const { values, functions } = useSavedBusinessesController()

    return (
        <PrimaryLayout header>
            <View style={styles.content}>
                <View style={styles.header_text}>
                    <Text size={18} weight="semibold">
                        Saved Businesses
                    </Text>
                    <Text size={13} color={colors.gray}>
                        Businesses you have bookmarked.
                    </Text>
                </View>
                <FlatList
                    data={values.data}
                    refreshing={values.refreshing}
                    loading_more={values.loading_more}
                    onRefresh={functions.onRefresh}
                    keyExtractor={(item) => String(item._id)}
                    renderItem={({ item }) => (
                        <BusinessCard
                            data={item}
                            saved={values.saved_business_ids.includes(String(item._id))}
                            onPress={() => functions.onBusinessPress(item)}
                            onSave={() => functions.onToggleSave(item)}
                        />
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
    list: {
        flex: 1,
    },
})
