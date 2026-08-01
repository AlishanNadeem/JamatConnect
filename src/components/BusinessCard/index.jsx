import { memo } from "react"
import { StyleSheet, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import colors from "../../helpers/colors"
import { formatPhone, formatWebsite } from "../../helpers/general"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Badge from "../Badge"
import Icon from "../Icon"
import Image from "../Image"
import Row from "../Row"
import Text from "../Text"

const STATUS_THEME = {
    approved: {
        color: colors.success,
        label: "Approved",
    },
    pending: {
        color: colors.warning,
        label: "Pending",
    },
    rejected: {
        color: colors.danger,
        label: "Rejected",
    },
}

const DetailChip = ({ icon, label }) => (
    <View style={styles.detail_chip}>
        <Icon
            name={icon}
            size={30}
            space
            rounded="half"
            background={colors.white}
            color={colors.primary}
        />
        <Text size={11} color={colors.dark_gray} lines={2} style={styles.detail_label}>
            {label}
        </Text>
    </View>
)

const BusinessCard = ({ data }) => {

    const {
        name,
        description,
        category,
        email,
        phone,
        dialing_code,
        website,
        address,
        image_url,
        logo_url,
        status,
        verified,
        active,
    } = data


    const status_theme = STATUS_THEME[status] ?? STATUS_THEME.pending
    const phone_label = formatPhone(dialing_code, phone)
    const website_label = formatWebsite(website)
    const location_label = address?.formatted
        ?? [address?.city, address?.state].filter(Boolean).join(", ")

    const detail_items = [
        location_label && { icon: "map-pin", label: location_label },
        phone_label && { icon: "phone", label: phone_label },
        email && { icon: "mail", label: email },
        website_label && { icon: "globe", label: website_label },
    ].filter(Boolean)

    return (
        <View style={styles.container}>
            <View style={styles.cover_wrapper}>
                <Image source={{ uri: image_url }} style={styles.cover} />

                <LinearGradient
                    colors={["transparent", "rgba(0, 0, 0, 0.35)"]}
                    style={styles.cover_overlay}
                />

                <Row align="center" gap={8} style={styles.badges_row}>
                    {!active ? (
                        <Badge
                            type="secondary"
                            label="Inactive"
                            background="rgba(255, 255, 255, 0.94)"
                        />
                    ) : null}
                    <Badge
                        type="dot"
                        label={status_theme.label}
                        color={status_theme.color}
                    />
                </Row>
            </View>

            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.logo_frame}>
                        <Icon
                            rounded="full"
                            source={{ uri: logo_url }}
                            size={54}
                            resize="cover"
                        />
                    </View>

                    <View style={styles.title_block}>
                        <Row align="center" gap={6} style={styles.name_row}>
                            <Text size={17} weight="bold" lines={1} style={styles.name}>
                                {name}
                            </Text>
                            {verified ? (
                                <Icon name="badge-check" size={18} color={colors.primary} />
                            ) : null}
                        </Row>

                        {
                            category?.name ? (
                                <View style={styles.category_chip}>
                                    <Text size={11} weight="semibold" color={colors.primary}>
                                        {category.name}
                                    </Text>
                                </View>
                            ) : null
                        }
                    </View>
                </View>

                {
                    description ? (
                        <Text size={13} color={colors.dark_gray} lines={2}>
                            {description}
                        </Text>
                    ) : null
                }

                {
                    detail_items.length ? (
                        <View style={styles.details_grid}>
                            {
                                detail_items.map((item) => (
                                    <DetailChip
                                        key={item.icon}
                                        icon={item.icon}
                                        label={item.label}
                                    />
                                ))
                            }
                        </View>
                    ) : null
                }
            </View>
        </View>
    )
}

export default memo(BusinessCard)

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
    },
    badges_row: {
        position: "absolute",
        top: heightPixel(12),
        right: widthPixel(12),
        width: "auto",
    },
    content: {
        gap: heightPixel(14),
        paddingHorizontal: widthPixel(18),
        paddingBottom: heightPixel(18),
    },
    header: {
        gap: heightPixel(10),
    },
    logo_frame: {
        alignSelf: "flex-start",
        marginTop: heightPixel(-28),
        padding: heightPixel(3),
        borderRadius: heightPixel(30),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
    title_block: {
        gap: heightPixel(8),
    },
    name_row: {
        width: "auto",
        maxWidth: "100%",
        alignSelf: "flex-start",
    },
    name: {
        flexShrink: 1,
    },
    category_chip: {
        alignSelf: "flex-start",
        paddingHorizontal: widthPixel(10),
        paddingVertical: heightPixel(5),
        borderRadius: heightPixel(8),
        backgroundColor: colors.lightest_primary,
    },
    details_grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: widthPixel(10),
    },
    detail_chip: {
        width: "47.5%",
        flexDirection: "row",
        alignItems: "center",
        gap: widthPixel(10),
        paddingHorizontal: widthPixel(10),
        paddingVertical: heightPixel(10),
        borderRadius: heightPixel(14),
        backgroundColor: colors.background,
    },
    detail_label: {
        flex: 1,
    },
})
