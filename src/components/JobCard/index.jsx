import { memo } from "react"
import { StyleSheet, View } from "react-native"
import { useSelector } from "react-redux"
import colors from "../../helpers/colors"
import { formatDate } from "../../helpers/date"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import { selectEmploymentTypes, selectWorkplaceTypes } from "../../redux/selectors"
import Icon from "../Icon"
import Row from "../Row"
import Text from "../Text"
import Touchable from "../Touchable"

const JobCard = ({ data, onPress }) => {

    const employment_types = useSelector(selectEmploymentTypes)
    const workplace_types = useSelector(selectWorkplaceTypes)

    const {
        title,
        location,
        business,
        employment_type,
        workplace_type,
        createdAt,
    } = data

    const employment_type_label = employment_types.find((option) => option.value === employment_type)?.label
    const workplace_type_label = workplace_types.find((option) => option.value === workplace_type)?.label
    const posted_at = createdAt
        ? formatDate(createdAt, { show_time_ago: true })
        : null

    return (
        <Touchable onPress={onPress} style={styles.container}>
            <Icon
                rounded="half"
                source={{ uri: business?.logo_url }}
                size={56}
                resize="cover"
                background={colors.background}
            />
            <View style={styles.content}>
                <Text size={15} weight="bold" lines={1}>
                    {title}
                </Text>
                {
                    business?.name ? (
                        <Text size={12} weight="semibold" color={colors.primary} lines={1}>
                            {business?.name}
                        </Text>
                    ) : null
                }
                {location ? (
                    <Row align="center" gap={4} style={styles.location_row}>
                        <Icon name="map-pin" size={13} color={colors.gray} />
                        <Text size={12} color={colors.gray} lines={1} style={styles.location}>
                            {location}
                        </Text>
                    </Row>
                ) : null}
                <Row align="center" gap={10} style={styles.meta_row}>
                    {employment_type_label ? (
                        <View style={styles.type_chip}>
                            <Text size={11} weight="semibold" color={colors.primary}>
                                {employment_type_label}
                            </Text>
                        </View>
                    ) : null}
                    {workplace_type_label ? (
                        <View style={styles.type_chip}>
                            <Text size={11} weight="semibold" color={colors.primary}>
                                {workplace_type_label}
                            </Text>
                        </View>
                    ) : null}
                </Row>
                {posted_at ? (
                    <Text size={11} color={colors.gray} align="right">
                        Posted {posted_at}
                    </Text>
                ) : null}
            </View>
        </Touchable>
    )
}

export default memo(JobCard)

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: widthPixel(12),
        padding: widthPixel(12),
        borderRadius: heightPixel(16),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
    content: {
        flex: 1,
        gap: heightPixel(6),
    },
    meta_row: {
        width: "auto",
        maxWidth: "100%",
        marginTop: heightPixel(2),
    },
    type_chip: {
        paddingHorizontal: widthPixel(8),
        paddingVertical: heightPixel(3),
        borderRadius: heightPixel(8),
        backgroundColor: colors.lightest_primary,
    },
    location_row: {
        flex: 1,
        width: "auto",
    },
    location: {
        flexShrink: 1,
    },
})
