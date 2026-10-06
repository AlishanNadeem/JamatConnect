import { ActivityIndicator, StyleSheet, View } from "react-native"
import Empty from "../../components/Empty"
import FlatList from "../../components/FlatList"
import SpecialCard from "../../components/SpecialCard"
import colors from "../../helpers/colors"
import { heightPixel } from "../../helpers/metrics"
import useRedeemSpecial from "../../hooks/useRedeemSpecial"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import { useGetFeaturedSpecialsQuery } from "../../redux/apis/Special"

const Billboard = () => {
    const { redeeming_id, onRedeem } = useRedeemSpecial()

    const {
        data,
        isLoading,
        isError,
        refetch,
        isFetching,
    } = useGetFeaturedSpecialsQuery({ page: 1, page_size: 50 })

    const specials = data?.data ?? []

    if (isLoading) {
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
                    description="Unable to load featured specials."
                />
            </PrimaryLayout>
        )
    }

    return (
        <PrimaryLayout header>
            <FlatList
                data={specials}
                refreshing={isFetching}
                onRefresh={refetch}
                keyExtractor={(item) => String(item._id)}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <Empty
                        title="No Specials Yet"
                        description="Featured specials from local businesses will appear here."
                    />
                }
                renderItem={({ item }) => (
                    <SpecialCard
                        data={item}
                        redeeming={String(redeeming_id) === String(item._id)}
                        onRedeem={() => onRedeem(item)}
                    />
                )}
            />
        </PrimaryLayout>
    )
}

export default Billboard

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    list: {
        gap: heightPixel(12),
        paddingBottom: heightPixel(24),
        flexGrow: 1,
    },
})
