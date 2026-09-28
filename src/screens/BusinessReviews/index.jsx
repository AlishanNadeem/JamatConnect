import { StyleSheet, View } from "react-native"
import FlatList from "../../components/FlatList"
import ReviewCard, { Stars } from "../../components/ReviewCard"
import Text from "../../components/Text"
import colors from "../../helpers/colors"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useBusinessReviewsController from "./useBusinessReviewsController"

const BusinessReviews = () => {

    const { values } = useBusinessReviewsController()

    return (
        <PrimaryLayout header>
            <View style={styles.container}>
                <View style={styles.summary}>
                    <Text size={32} weight="bold">
                        {values.rating_average}
                    </Text>
                    <Stars rating={Math.round(Number(values.rating_average))} size={18} />
                    <Text size={13} color={colors.gray}>
                        {values.review_count} reviews
                    </Text>
                </View>
                <FlatList
                    data={values.data}
                    renderItem={({ item }) => <ReviewCard data={item} />}
                    empty={values.empty}
                    style={styles.list}
                />
            </View>
        </PrimaryLayout>
    )
}

export default BusinessReviews

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: heightPixel(16),
    },
    summary: {
        alignItems: "center",
        gap: heightPixel(6),
        paddingVertical: heightPixel(16),
        borderRadius: heightPixel(16),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
    list: {
        flex: 1,
    },
})
