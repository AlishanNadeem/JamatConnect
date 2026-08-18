import { memo } from "react"
import { StyleSheet, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import colors from "../../helpers/colors"
import { formatDate } from "../../helpers/date"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Badge from "../Badge"
import Image from "../Image"
import Row from "../Row"
import Text from "../Text"
import Touchable from "../Touchable"

const MyListingCard = ({ data, onPress }) => {

    const {
        name,
        description,
        category,
        formatted_price,
        image_url,
        active,
        is_expired,
        expires_at,
    } = data

    return (
        <Touchable onPress={onPress} style={styles.container}>
            <View style={styles.cover_wrapper}>
                <Image source={{ uri: image_url }} style={styles.cover} />
                <LinearGradient
                    colors={["transparent", "rgba(0, 0, 0, 0.35)"]}
                    style={styles.cover_overlay}
                />
                <Row align="center" gap={8} style={styles.badges_row}>
                    <Badge
                        type="dot"
                        label={active ? "Active" : "Inactive"}
                        mode={active ? "success" : "muted"}
                    />
                </Row>
            </View>

            <View style={styles.content}>
                <Row align="center" justify="space-between">
                    {
                        category?.name ? (
                            <Badge
                                label={category?.name}
                                mode="primary"
                            />
                        ) : null
                    }
                    {
                        is_expired ? (
                            <Badge
                                type="dot"
                                label="Expired"
                                mode="danger"
                            />
                        ) : null
                    }
                </Row>

                <Text size={17} weight="bold" lines={1}>
                    {name}
                </Text>

                {formatted_price ? (
                    <Text size={16} weight="bold" color={colors.primary}>
                        {formatted_price}
                    </Text>
                ) : null}

                {description ? (
                    <Text size={13} color={colors.dark_gray} lines={2}>
                        {description}
                    </Text>
                ) : null}

                {expires_at ? (
                    <Text size={12} color={colors.gray}>
                        Expires {formatDate(expires_at)}
                    </Text>
                ) : null}
            </View>
        </Touchable>
    )
}

export default memo(MyListingCard)

const styles = StyleSheet.create({
    container: {
        borderRadius: heightPixel(22),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
        overflow: "hidden",
    },
    cover_wrapper: {
        position: "relative",
        width: "100%",
        height: heightPixel(152),
        backgroundColor: colors.background,
    },
    cover: {
        width: "100%",
        height: "100%",
    },
    cover_overlay: {
        ...StyleSheet.absoluteFill,
        zIndex: 1,
    },
    badges_row: {
        position: "absolute",
        top: heightPixel(12),
        right: widthPixel(12),
        width: "auto",
    },
    content: {
        gap: heightPixel(8),
        paddingHorizontal: widthPixel(18),
        paddingVertical: heightPixel(16),
    }
})
