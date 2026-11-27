import { memo } from "react"
import { StyleSheet, View } from "react-native"
import { useSelector } from "react-redux"
import colors from "../../helpers/colors"
import { formatDate } from "../../helpers/date"
import { getOptionLabel } from "../../helpers/general"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import { selectEmploymentTypes, selectWorkplaceTypes } from "../../redux/selectors"
import Badge from "../Badge"
import Icon from "../Icon"
import Row from "../Row"
import Text from "../Text"
import Touchable from "../Touchable"

const JobCard = ({ data, saved = false, onPress, onSave }) => {

    const employment_types = useSelector(selectEmploymentTypes)
    const workplace_types = useSelector(selectWorkplaceTypes)

    const {
        title,
        location,
        business,
        employment_type,
        workplace_type,
        createdAt,
        applied,
        closed,
    } = data

    const employment_type_label = getOptionLabel(employment_types, employment_type)
    const workplace_type_label = getOptionLabel(workplace_types, workplace_type)
    const posted_at = createdAt
        ? formatDate(createdAt, { show_time_ago: true })
        : null

    return (
        <Touchable onPress={onPress} style={styles.container}>
            <View style={styles.top}>
                <Icon
                    rounded="half"
                    source={{ uri: business?.logo_url }}
                    size={56}
                    resize="cover"
                    background={colors.background}
                />
                <View style={styles.content}>
                    <Row align="center" justify="space-between" gap={8} style={styles.title_row}>
                        <Text size={15} weight="bold" lines={1} style={styles.title}>
                            {title}
                        </Text>
                        {closed ? (
                            <Badge type="dot" label="Closed" mode="danger" />
                        ) : applied ? (
                            <Badge type="dot" label="Applied" mode="muted" />
                        ) : null}
                    </Row>
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
                            <Badge label={employment_type_label} mode="light_primary" />
                        ) : null}
                        {workplace_type_label ? (
                            <Badge label={workplace_type_label} mode="light_primary" />
                        ) : null}
                    </Row>
                </View>
            </View>
            {posted_at || onSave ? (
                <View style={styles.footer}>
                    <Text size={11} color={colors.gray}>
                        {posted_at ? `Posted ${posted_at}` : ""}
                    </Text>
                    {onSave ? (
                        <Touchable onPress={onSave} style={styles.save}>
                            <Icon
                                name={saved ? "bookmark-check" : "bookmark"}
                                size={14}
                                color={colors.primary}
                            />
                            <Text size={12} weight="semibold" color={colors.primary}>
                                {saved ? "Saved" : "Save"}
                            </Text>
                        </Touchable>
                    ) : null}
                </View>
            ) : null}
        </Touchable>
    )
}

export default memo(JobCard)

const styles = StyleSheet.create({
    container: {
        padding: widthPixel(12),
        borderRadius: heightPixel(16),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
    top: {
        flexDirection: "row",
        gap: widthPixel(12),
    },
    content: {
        flex: 1,
        gap: heightPixel(6),
    },
    // Prototype footer: time on the left, Save on the right, under a divider.
    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: heightPixel(10),
        paddingTop: heightPixel(8),
        borderTopWidth: heightPixel(1),
        borderTopColor: colors.light_gray,
    },
    save: {
        flexDirection: "row",
        alignItems: "center",
        gap: widthPixel(4),
        paddingVertical: heightPixel(2),
        paddingLeft: widthPixel(8),
    },
    title_row: {
        width: "100%",
    },
    title: {
        flex: 1,
    },
    meta_row: {
        width: "auto",
        maxWidth: "100%",
        marginTop: heightPixel(2),
        flexWrap: "wrap",
    },
    location_row: {
        flex: 1,
        width: "auto",
    },
    location: {
        flexShrink: 1,
    },
})
