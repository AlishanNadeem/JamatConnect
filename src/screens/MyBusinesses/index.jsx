import { StyleSheet, View } from "react-native"
import Button from "../../components/Button"
import FlatList from "../../components/FlatList"
import MyBusinessCard from "../../components/MyBusinessCard"
import Row from "../../components/Row"
import Text from "../../components/Text"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import { global_styles } from "../../helpers/styles"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useMyBusinessesController from "./useMyBusinessesController"

const MyBusinesses = () => {

    const { values, functions } = useMyBusinessesController()

    return (
        <PrimaryLayout header>
            <View style={styles.content}>
                <Row align="center" justify="space-between" gap={12} style={styles.header_row}>
                    <View style={styles.header_text}>
                        <Text size={18} weight="semibold">
                            Your Businesses
                        </Text>
                        <Text size={13} color={colors.gray}>
                            Manage listings you have added.
                        </Text>
                    </View>
                    <Button
                        size="sm"
                        onPress={functions.onAddBusiness}
                        style={[global_styles.auto_width, styles.add_button]}
                    >
                        Add Business
                    </Button>
                </Row>
                <FlatList
                    data={values.data}
                    refreshing={values.refreshing}
                    loading_more={values.loading_more}
                    onRefresh={functions.onRefresh}
                    renderItem={({ item }) => (
                        <MyBusinessCard
                            data={item}
                            onPress={() => functions.onBusinessPress(item)}
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

export default MyBusinesses

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
    loader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: heightPixel(80),
    },
})
