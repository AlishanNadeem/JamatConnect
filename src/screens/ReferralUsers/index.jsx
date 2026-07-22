import { ActivityIndicator, StyleSheet, View } from "react-native"
import FlatList from "../../components/FlatList"
import ReferralUserCard from "../../components/ReferralUserCard"
import colors from "../../helpers/colors"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useReferralUsersController from "./useReferralUsersController"

const ReferralUsers = () => {

    const { values, functions } = useReferralUsersController()

    if (values.is_loading) {
        return (
            <PrimaryLayout header>
                <View style={styles.loader}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>
            </PrimaryLayout>
        )
    }

    return (
        <PrimaryLayout header>
            <FlatList
                data={values.data}
                refreshing={values.refreshing}
                loading_more={values.loading_more}
                onRefresh={functions.onRefresh}
                onEndReached={functions.onLoadMore}
                renderItem={({ item }) => <ReferralUserCard data={item} />}
                empty={values.empty}
            />
        </PrimaryLayout>
    )
}

export default ReferralUsers

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: heightPixel(80),
    },
})
