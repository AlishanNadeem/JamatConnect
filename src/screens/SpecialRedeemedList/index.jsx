import { useRoute } from "@react-navigation/native"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import Empty from "../../components/Empty"
import FlatList from "../../components/FlatList"
import Row from "../../components/Row"
import Text from "../../components/Text"
import colors from "../../helpers/colors"
import { formatDate, formatTime } from "../../helpers/date"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import { useGetRedeemedListQuery, useGetSpecialByIdQuery } from "../../redux/apis/Special"

const SpecialRedeemedList = () => {
    const { params } = useRoute()
    const special_id = params?.special_id || params?._id

    const {
        data: special_response,
        isLoading: special_loading,
    } = useGetSpecialByIdQuery(special_id, { skip: !special_id })

    const {
        data,
        isLoading,
        isError,
        refetch,
        isFetching,
    } = useGetRedeemedListQuery(
        { id: special_id },
        { skip: !special_id },
    )

    const special = special_response?.data
    const items = data?.data ?? []
    const total = data?.total ?? data?.pagination?.total ?? items.length

    if (isLoading || special_loading) {
        return (
            <PrimaryLayout header>
                <View style={styles.loader}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>
            </PrimaryLayout>
        )
    }

    if (isError) {
        return (
            <PrimaryLayout header>
                <Empty
                    title="Something Went Wrong"
                    description="Unable to load redeemed customers."
                />
            </PrimaryLayout>
        )
    }

    return (
        <PrimaryLayout header>
            <View style={styles.container}>
                <View style={styles.summary}>
                    <Text size={16} weight="bold" lines={2}>
                        {special?.title || "Special"}
                    </Text>
                    <Text size={13} color={colors.dark_gray}>
                        {total} redeemed
                    </Text>
                </View>

                <FlatList
                    data={items}
                    refreshing={isFetching}
                    onRefresh={refetch}
                    keyExtractor={(item) => String(item._id)}
                    ListEmptyComponent={
                        <Empty
                            title="No Redemptions Yet"
                            description="Customers who redeem this special will appear here."
                        />
                    }
                    renderItem={({ item }) => (
                        <Row align="center" justify="space-between" style={styles.row}>
                            <Text size={14} weight="semibold" lines={1} style={styles.name}>
                                {item.name}
                            </Text>
                            <View style={styles.date_block}>
                                <Text size={12} color={colors.dark_gray}>
                                    {formatDate(item.redeemed_at)}
                                </Text>
                                <Text size={11} color={colors.gray}>
                                    {formatTime(item.redeemed_at)}
                                </Text>
                            </View>
                        </Row>
                    )}
                />
            </View>
        </PrimaryLayout>
    )
}

export default SpecialRedeemedList

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        gap: heightPixel(16),
    },
    summary: {
        gap: heightPixel(4),
        paddingHorizontal: widthPixel(4),
    },
    row: {
        paddingHorizontal: widthPixel(14),
        paddingVertical: heightPixel(14),
        borderRadius: heightPixel(14),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
        marginBottom: heightPixel(10),
    },
    name: {
        flex: 1,
        paddingRight: widthPixel(12),
    },
    date_block: {
        alignItems: "flex-end",
        gap: heightPixel(2),
    },
})
