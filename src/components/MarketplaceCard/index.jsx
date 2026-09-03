import { memo } from "react"
import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { formatDate } from "../../helpers/date"
import { GLOBAL_HORIZONTAL_PADDING, heightPixel, SCREEN_WIDTH, widthPixel } from "../../helpers/metrics"
import Image from "../Image"
import Text from "../Text"
import Touchable from "../Touchable"

const CARD_GAP = widthPixel(12)
const MARKETPLACE_CARD_WIDTH = (SCREEN_WIDTH - (GLOBAL_HORIZONTAL_PADDING * 2) - CARD_GAP) / 2

const MarketplaceCard = ({ data, onPress }) => {

    const {
        name,
        formatted_price,
        category,
        image_url,
        createdAt,
    } = data

    const posted_at = formatDate(createdAt, { show_time_ago: true })

    return (
        <Touchable onPress={onPress} style={styles.container}>
            <Image
                source={{ uri: image_url }}
                style={styles.image}
                resize="cover"
            />
            <View style={styles.content}>
                {formatted_price ? (
                    <Text weight="bold" size={18}>
                        {formatted_price}
                    </Text>
                ) : null}
                <Text lines={2}>
                    {name}
                </Text>
                {category?.name ? ( 
                    <Text size={11} weight="semibold" color={colors.primary} lines={1}>
                        {category.name}
                    </Text>
                ) : null}
                {posted_at ? (
                    <Text size={11} color={colors.gray} lines={1} align="right">
                        Posted {posted_at}
                    </Text>
                ) : null}
            </View>
        </Touchable>
    )
}

export default memo(MarketplaceCard)

const styles = StyleSheet.create({
    container: {
        width: MARKETPLACE_CARD_WIDTH,
        borderRadius: heightPixel(16),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: heightPixel(120),
        backgroundColor: colors.background,
    },
    content: {
        gap: heightPixel(6),
        paddingHorizontal: widthPixel(10),
        paddingVertical: heightPixel(10),
    },
})
