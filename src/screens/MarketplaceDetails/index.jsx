import { ActivityIndicator, StyleSheet, View } from "react-native"
import Badge from "../../components/Badge"
import Button from "../../components/Button"
import Empty from "../../components/Empty"
import Icon from "../../components/Icon"
import Image from "../../components/Image"
import Row from "../../components/Row"
import Text from "../../components/Text"
import colors from "../../helpers/colors"
import { formatDate } from "../../helpers/date"
import { GLOBAL_HORIZONTAL_PADDING, heightPixel, widthPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useMarketplaceDetailsController from "./useMarketplaceDetailsController"

const MarketplaceDetails = () => {

    const { values, functions } = useMarketplaceDetailsController()

    if (values.is_loading) {
        return (
            <PrimaryLayout header>
                <View style={styles.loader}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>
            </PrimaryLayout>
        )
    }

    if (values.is_error || (values.expired && !values.is_mine)) {
        return (
            <PrimaryLayout header>
                <Empty
                    title={values.expired ? "Listing Expired" : "Listing Not Found"}
                    description={
                        values.expired
                            ? "This listing automatically expired after 30 days."
                            : "This marketplace listing is no longer available."
                    }
                />
            </PrimaryLayout>
        )
    }

    return (
        <PrimaryLayout scrollable header padding_horizontal={false}>
            <Image source={{ uri: values.data.image_url }} style={styles.cover} />
            <View style={styles.content}>
                <Row align="center" justify="space-between" gap={8}>
                    {values.data.category?.name ? (
                        <Badge
                            label={values.data.category.name}
                            mode="primary"
                        />
                    ) : null}
                    <Row gap={8} style={styles.badges_row}>
                        {
                            values.data.is_expired ? (
                                <Badge
                                    type="dot"
                                    label="Expired"
                                    mode="danger"
                                />
                            ) : null
                        }
                        <Badge
                            type="dot"
                            label={values.data.active ? "Active" : "Inactive"}
                            mode={values.data.active ? "success" : "muted"}
                        />
                    </Row>
                </Row>

                <Text size={22} weight="bold">
                    {values.data.name}
                </Text>

                {values.data.formatted_price ? (
                    <Text size={20} weight="bold" color={colors.primary}>
                        {values.data.formatted_price}
                    </Text>
                ) : null}

                {values.data.createdAt ? (
                    <Text size={12} color={colors.gray}>
                        Posted {formatDate(values.data.createdAt)}
                        {values.data.expires_at ? ` · Expires ${formatDate(values.data.expires_at)}` : ""}
                    </Text>
                ) : null}

                {values.data.description ? (
                    <View style={styles.section}>
                        <Text weight="bold">
                            Description
                        </Text>
                        <Text size={14} color={colors.dark_gray}>
                            {values.data.description}
                        </Text>
                    </View>
                ) : null}

                {values.data.user ? (
                    <View style={styles.section}>
                        <Text weight="bold">
                            Seller Info
                        </Text>
                        <Row align="center" gap={12}>
                            <Icon
                                rounded="full"
                                source={{ uri: values.data.user.image_url }}
                                size={44}
                                resize="cover"
                                background={colors.white}
                            />
                            <View style={styles.seller_info}>
                                <Text size={15} weight="semibold">
                                    {values.data.user.name}{values?.is_mine ? " (You)" : ""}
                                </Text>
                                {values.data.phone_label ? (
                                    <Text
                                        size={13}
                                        color={colors.dark_gray}
                                        onPress={
                                            values.data.phone_url
                                                ? () => functions.onOpenLink(values.phone_url)
                                                : undefined
                                        }
                                    >
                                        {values.data.phone_label}
                                    </Text>
                                ) : null}
                                {values.data.user.email ? (
                                    <Text
                                        size={13}
                                        color={colors.dark_gray}
                                        onPress={
                                            values.data.email_url
                                                ? () => functions.onOpenLink(values.email_url)
                                                : undefined
                                        }
                                    >
                                        {values.data.user.email}
                                    </Text>
                                ) : null}
                            </View>
                        </Row>
                    </View>
                ) : null}

                {
                    values.is_mine ? (
                        <View style={styles.actions}>
                            <Button
                                type={values.data.active ? "secondary" : "primary"}
                                onPress={functions.onToggleActive}
                                loading={values.is_toggling}
                            >
                                {values.data.active ? "Mark as Inactive" : "Mark as Active"}
                            </Button>
                            <Row gap={12}>
                                <View style={styles.action_button}>
                                    {
                                        values.data.is_expired ? (
                                            <Button onPress={functions.onRenew} loading={values.is_renewing}>
                                                Renew
                                            </Button>
                                        ) : (
                                            <Button onPress={functions.onEdit}>
                                                Edit
                                            </Button>
                                        )
                                    }
                                </View>
                                <View style={styles.action_button}>
                                    <Button
                                        type="danger"
                                        onPress={functions.onDelete}
                                        loading={values.is_deleting}
                                    >
                                        Delete
                                    </Button>
                                </View>
                            </Row>
                        </View>
                    ) : (
                        <View style={styles.disclaimer}>
                            <Row align="center" gap={12}>
                                <Icon
                                    name="shield-alert"
                                    size={40}
                                    space
                                    rounded="half"
                                    background={colors.lightest_primary}
                                    color={colors.primary}
                                />
                                <View style={styles.disclaimer_heading}>
                                    <Text size={15} weight="bold">
                                        Stay Safe
                                    </Text>
                                    <Text size={12} color={colors.gray}>
                                        Follow these tips before you buy or meet.
                                    </Text>
                                </View>
                            </Row>
                            <View style={styles.disclaimer_tips}>
                                <Text size={13} color={colors.dark_gray}>
                                    1. Meet in a public place
                                </Text>
                                <Text size={13} color={colors.dark_gray}>
                                    2. Inspect the item before paying
                                </Text>
                                <Text size={13} color={colors.dark_gray}>
                                    3. Never send money or share personal details in advance
                                </Text>
                            </View>
                            <Text size={10} color={colors.danger}>
                                Jamat Connect does not guarantee listings or transactions.
                            </Text>
                        </View>
                    )
                }
            </View>
        </PrimaryLayout>
    )
}

export default MarketplaceDetails

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    cover: {
        width: "100%",
        height: heightPixel(240),
        backgroundColor: colors.white,
    },
    content: {
        gap: heightPixel(10),
        paddingHorizontal: GLOBAL_HORIZONTAL_PADDING,
        paddingVertical: heightPixel(20),
    },
    badges_row: {
        width: "auto",
    },
    section: {
        gap: heightPixel(12),
    },
    seller_info: {
        flex: 1,
        gap: heightPixel(2),
    },
    actions: {
        gap: heightPixel(12),
        marginTop: heightPixel(24),
    },
    action_button: {
        flex: 1,
    },
    disclaimer: {
        gap: heightPixel(14),
        marginTop: heightPixel(24),
        padding: widthPixel(14),
        borderRadius: heightPixel(16),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
    disclaimer_heading: {
        flex: 1,
        gap: heightPixel(2),
    },
    disclaimer_tips: {
        gap: heightPixel(10),
    },
})
