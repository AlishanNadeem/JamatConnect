import { StyleSheet, View } from "react-native"
import Button from "../../components/Button"
import FlatList from "../../components/FlatList"
import MyListingCard from "../../components/MyListingCard"
import Row from "../../components/Row"
import Text from "../../components/Text"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import { global_styles } from "../../helpers/styles"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useMyListingsController from "./useMyListingsController"

const MyListings = () => {

    const { values, functions } = useMyListingsController()

    return (
        <PrimaryLayout header>
            <View style={styles.content}>
                <Row align="center" justify="space-between" gap={12} style={styles.header_row}>
                    <View style={styles.header_text}>
                        <Text size={18} weight="semibold">
                            Your Listings
                        </Text>
                        <Text size={13} color={colors.gray}>
                            Manage marketplace items you have added.
                        </Text>
                    </View>
                    <Button
                        size="sm"
                        onPress={functions.onAddListing}
                        style={[global_styles.auto_width, styles.add_button]}
                    >
                        Add Listing
                    </Button>
                </Row>
                <FlatList
                    data={values.data}
                    refreshing={values.refreshing}
                    loading_more={values.loading_more}
                    onRefresh={functions.onRefresh}
                    renderItem={({ item }) => (
                        <MyListingCard
                            data={item}
                            onPress={() => functions.onListingPress(item)}
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

export default MyListings

const styles = StyleSheet.create({
    content: {
        flex: 1,
        gap: heightPixel(16),
    },
    header_row: {
        paddingTop: heightPixel(4),
    },
    header_text: {
        flex: 1,
        gap: heightPixel(4),
    },
    add_button: {
        minWidth: widthPixel(120),
    },
    list: {
        flex: 1,
    },
})
