import { StyleSheet, View } from "react-native"
import FlatList from "../../components/FlatList"
import NotificationCard from "../../components/NotificationCard"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useNotificationController from "./useNotificationController"

const Notifications = () => {

    const { values, functions } = useNotificationController()

    return (
        <PrimaryLayout header>
            <View style={styles.container}>
                <FlatList
                    data={values.data}
                    refreshing={values.refreshing}
                    loading_more={values.loading_more}
                    loading={values.is_loading}
                    onRefresh={functions.onRefresh}
                    onEndReached={functions.onLoadMore}
                    separator={12}
                    keyExtractor={(item) => String(item?._id || item?.id)}
                    renderItem={({ item }) => (
                        <NotificationCard
                            data={item}
                            onPress={() => functions.onPressNotification(item)}
                        />
                    )}
                    empty={values.empty}
                    style={styles.list}
                />
            </View>
        </PrimaryLayout>
    )
}

export default Notifications

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: heightPixel(200),
    },
    list: {
        flex: 1,
    },
})
