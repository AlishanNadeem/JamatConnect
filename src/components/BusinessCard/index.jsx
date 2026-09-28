import { memo } from "react"
import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { getLocationLabel } from "../../helpers/general"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Icon from "../Icon"
import Row from "../Row"
import Text from "../Text"
import Touchable from "../Touchable"

const BusinessCard = ({ data, saved = false, onPress, onSave }) => {

    const { name, category, logo_url, address, verified } = data

    const location_label = getLocationLabel({ address })

    return (
        <View style={styles.container}>
            <Touchable onPress={onPress} style={styles.body}>
                <Icon
                    rounded="half"
                    source={{ uri: logo_url }}
                    size={56}
                    resize="cover"
                    background={colors.background}
                />
                <View style={styles.content}>
                    <Row align="center" gap={6} style={styles.name_row}>
                        <Text size={15} weight="bold" lines={1} style={styles.name}>
                            {name}
                        </Text>
                        {
                            verified ? (
                                <Icon name="badge-check" size={16} color={colors.primary} />
                            ) : null
                        }
                    </Row>
                    {
                        category?.name ? (
                            <Text size={12} weight="semibold" color={colors.primary}>
                                {category.name}
                            </Text>
                        ) : null
                    }
                    {
                        location_label ? (
                            <Row align="center" gap={4} style={styles.location_row}>
                                <Icon name="map-pin" size={13} color={colors.gray} />
                                <Text size={12} color={colors.gray} lines={1} style={styles.location}>
                                    {location_label}
                                </Text>
                            </Row>
                        ) : null
                    }
                </View>
            </Touchable>
            <Icon
                name="bookmark"
                size={22}
                color={saved ? colors.primary : colors.gray}
                onPress={onSave}
            />
        </View>
    )
}

export default memo(BusinessCard)

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: widthPixel(8),
        padding: widthPixel(12),
        borderRadius: heightPixel(16),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
    body: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: widthPixel(12),
    },
    content: {
        flex: 1,
        gap: heightPixel(4),
    },
    name_row: {
        width: "auto",
        maxWidth: "100%",
    },
    name: {
        flexShrink: 1,
    },
    location_row: {
        width: "auto",
        maxWidth: "100%",
    },
    location: {
        flexShrink: 1,
    },
})
