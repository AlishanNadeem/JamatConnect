import { StyleSheet } from "react-native"
import FlatList from "../../components/FlatList"
import NotificationCard from "../../components/NotificationCard"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useNotificationController from "./useNotificationController"

const Notifications = () => {

    const { values, functions } = useNotificationController()

    return (
        <PrimaryLayout header>
            <FlatList
                data={values.data}
                refreshing={values.refreshing}
                loading_more={values.loading_more}
                loading={values.is_loading}
                onRefresh={functions.onRefresh}
                onEndReached={functions.onLoadMore}
                separator={12}
                keyExtractor={(item) => String(item?._id || item?.id)}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <NotificationCard
                        data={item}
                        onPress={() => functions.onPressNotification(item)}
                    />
                )}
                empty={values.empty}
            />
        </PrimaryLayout>
    )
}

export default Notifications

const styles = StyleSheet.create({
    list: {
        paddingTop: heightPixel(8),
        flexGrow: 1,
    },
})
