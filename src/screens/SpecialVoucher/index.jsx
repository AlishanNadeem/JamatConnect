import { useFocusEffect, useRoute } from "@react-navigation/native"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import Badge from "../../components/Badge"
import Empty from "../../components/Empty"
import Icon from "../../components/Icon"
import Row from "../../components/Row"
import Text from "../../components/Text"
import colors from "../../helpers/colors"
import { formatDate, formatTime } from "../../helpers/date"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import useScreenshotProtection from "../../hooks/useScreenshotProtection"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import { useGetMyVoucherQuery } from "../../redux/apis/Special"

dayjs.extend(duration)

const formatCountdown = (expires_at) => {
    const end = dayjs(expires_at)
    const now = dayjs()

    if (!end.isValid() || end.isBefore(now)) {
        return "Expired"
    }

    const diff = dayjs.duration(end.diff(now))
    const days = Math.floor(diff.asDays())
    const hours = diff.hours()
    const minutes = diff.minutes()
    const seconds = diff.seconds()

    if (days > 0) {
        return `${days}d ${hours}h ${minutes}m`
    }

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}

const SpecialVoucher = () => {
    const { params } = useRoute()
    const special_id = params?.special_id || params?._id

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useGetMyVoucherQuery(special_id, { skip: !special_id })

    const voucher = data?.data
    const is_active = voucher?.status === "active"
    const [countdown, setCountdown] = useState("")

    useScreenshotProtection(Boolean(voucher) && is_active)

    useFocusEffect(
        useCallback(() => {
            if (!special_id) return undefined
            refetch()
            return undefined
        }, [refetch, special_id]),
    )

    useEffect(() => {
        if (!voucher?.expires_at || !is_active) {
            setCountdown(voucher?.status === "expired" ? "Expired" : "")
            return undefined
        }

        const tick = () => setCountdown(formatCountdown(voucher.expires_at))
        tick()
        const timer = setInterval(tick, 1000)
        return () => clearInterval(timer)
    }, [is_active, voucher?.expires_at, voucher?.status])

    const status_badge = useMemo(() => {
        if (voucher?.status === "used") return { label: "Used", mode: "muted" }
        if (voucher?.status === "expired") return { label: "Expired", mode: "danger" }
        return { label: "Active", mode: "success" }
    }, [voucher?.status])

    if (isLoading) {
        return (
            <PrimaryLayout header>
                <View style={styles.loader}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>
            </PrimaryLayout>
        )
    }

    if (isError || !voucher) {
        return (
            <PrimaryLayout header>
                <Empty
                    title="Voucher Unavailable"
                    description="We couldn't find a voucher for this special."
                />
            </PrimaryLayout>
        )
    }

    return (
        <PrimaryLayout header>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Row align="center" justify="space-between">
                        <Text size={13} weight="semibold" color={colors.gray}>
                            Your Voucher
                        </Text>
                        <Badge type="dot" label={status_badge.label} mode={status_badge.mode} />
                    </Row>

                    <Text size={22} weight="bold">
                        {voucher.special?.title}
                    </Text>

                    {voucher.special?.business?.name ? (
                        <Row align="center" gap={8}>
                            <Icon
                                rounded="half"
                                source={{ uri: voucher.special.business.logo_url }}
                                size={36}
                                resize="cover"
                                background={colors.background}
                            />
                            <Text size={14} weight="semibold" color={colors.primary}>
                                {voucher.special.business.name}
                            </Text>
                        </Row>
                    ) : null}

                    {voucher.special?.discount ? (
                        <View style={styles.discount}>
                            <Text size={16} weight="bold" color={colors.danger}>
                                {voucher.special.discount}
                            </Text>
                        </View>
                    ) : null}

                    <View style={styles.code_box}>
                        <Text size={12} color={colors.gray} weight="semibold">
                            Redemption Code
                        </Text>
                        <Text size={28} weight="bold" style={styles.code}>
                            {voucher.code}
                        </Text>
                    </View>

                    {is_active ? (
                        <View style={styles.countdown_box}>
                            <Text size={12} color={colors.gray}>
                                Expires in
                            </Text>
                            <Text size={20} weight="bold" color={colors.primary}>
                                {countdown}
                            </Text>
                            <Text size={12} color={colors.dark_gray}>
                                Show this code at the business before it expires.
                            </Text>
                        </View>
                    ) : voucher.status === "used" ? (
                        <Text size={13} color={colors.dark_gray}>
                            Redeemed on {formatDate(voucher.redeemed_at)} at {formatTime(voucher.redeemed_at)}
                        </Text>
                    ) : (
                        <Text size={13} color={colors.danger}>
                            This code expired on {formatDate(voucher.expires_at)}.
                        </Text>
                    )}
                </View>
            </View>
        </PrimaryLayout>
    )
}

export default SpecialVoucher

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        paddingTop: heightPixel(8),
    },
    card: {
        gap: heightPixel(16),
        paddingHorizontal: widthPixel(16),
        paddingVertical: heightPixel(20),
        borderRadius: heightPixel(20),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
    discount: {
        alignSelf: "flex-start",
        paddingHorizontal: widthPixel(10),
        paddingVertical: heightPixel(6),
        borderRadius: heightPixel(10),
        backgroundColor: colors.light_danger,
    },
    code_box: {
        alignItems: "center",
        gap: heightPixel(8),
        paddingVertical: heightPixel(20),
        borderRadius: heightPixel(16),
        backgroundColor: colors.background,
        borderWidth: heightPixel(1),
        borderColor: colors.lightest_primary,
        borderStyle: "dashed",
    },
    code: {
        letterSpacing: 4,
    },
    countdown_box: {
        alignItems: "center",
        gap: heightPixel(4),
    },
})
