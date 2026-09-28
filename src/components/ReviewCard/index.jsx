import { memo } from "react"
import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { formatDate } from "../../helpers/date"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Icon from "../Icon"
import Row from "../Row"
import Text from "../Text"

export const Stars = ({ rating, size = 14 }) => (
    <Row align="center" gap={2} style={styles.stars}>
        {[1, 2, 3, 4, 5].map((value) => (
            <Icon
                key={value}
                name="star"
                size={size}
                color={value <= rating ? colors.yellow : colors.light_gray}
            />
        ))}
    </Row>
)

const ReviewCard = ({ data, background = colors.white }) => {

    const { name, image_url, rating, comment, created_at } = data

    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <Row align="center" gap={10}>
                <Icon
                    rounded="full"
                    source={{ uri: image_url }}
                    size={40}
                    resize="cover"
                    background={colors.background}
                />
                <View style={styles.meta}>
                    <Text size={14} weight="semibold" lines={1}>
                        {name}
                    </Text>
                    <Row align="center" justify="space-between" gap={8}>
                        <Stars rating={rating} />
                        <Text size={11} color={colors.gray}>
                            {""} {formatDate(created_at)}
                        </Text>
                    </Row>
                </View>
            </Row>
            {comment ? (
                <Text size={13} color={colors.dark_gray}>
                    {comment}
                </Text>
            ) : null}
        </View>
    )
}

export default memo(ReviewCard)

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(10),
        padding: widthPixel(12),
        borderRadius: heightPixel(14),
        backgroundColor: colors.white,
    },
    meta: {
        flex: 1,
        gap: heightPixel(4),
    },
    stars: {
        width: "auto",
    },
})
