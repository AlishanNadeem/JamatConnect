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
                onRefresh={functions.onRefresh}
                onEndReached={functions.onLoadMore}
                renderItem={({ item }) => <NotificationCard data={item} />}
                empty={{
                    title: "No Notifications Found",
                    description: "Pull to refresh"
                }}
            />
        </PrimaryLayout>
    )
}

export default Notifications

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(20),
    }
})