import { useRoute } from "@react-navigation/native"
import { useCallback, useState } from "react"
import { StyleSheet, View } from "react-native"
import Button from "../../components/Button"
import Input from "../../components/Input"
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper"
import Text from "../../components/Text"
import { useModal } from "../../contexts/ModalContext"
import colors from "../../helpers/colors"
import { formatDate, formatTime } from "../../helpers/date"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import {
    useConfirmSpecialRedemptionMutation,
    useVerifySpecialCodeMutation,
} from "../../redux/apis/Special"

const SpecialVerifyCode = () => {
    const { params } = useRoute()
    const business_id = params?.business_id
    const { showInfoModal } = useModal()

    const [code, setCode] = useState("")
    const [result, setResult] = useState(null)

    const [verify, { isLoading: is_verifying }] = useVerifySpecialCodeMutation()
    const [confirm, { isLoading: is_confirming }] = useConfirmSpecialRedemptionMutation()

    const onVerify = useCallback(async () => {
        const trimmed = code.trim().toUpperCase()
        if (!trimmed) {
            showInfoModal({
                title: "Code Required",
                message: "Enter the redemption code shown on the customer's voucher.",
            })
            return
        }

        try {
            const response = await verify({ code: trimmed }).unwrap()
            setResult(response?.data ?? null)
        } catch (error) {
            setResult(error?.data?.data ?? { status: "invalid" })
            showInfoModal({
                title: "Unable to Verify",
                message: error?.data?.message || "Invalid code.",
            })
        }
    }, [code, showInfoModal, verify])

    const onConfirm = useCallback(async () => {
        if (!result?.code) return

        try {
            const response = await confirm({ code: result.code }).unwrap()
            setResult(response?.data ?? null)
            showInfoModal({
                title: "Redeemed",
                message: "The code has been marked as used.",
            })
        } catch (error) {
            setResult(error?.data?.data ?? result)
            showInfoModal({
                title: "Unable to Confirm",
                message: error?.data?.message || "Something went wrong.",
            })
        }
    }, [confirm, result, showInfoModal])

    return (
        <PrimaryLayout header>
            <KeyboardAvoidingWrapper>
                <View style={styles.container}>
                    <View style={styles.fields}>
                        <Text size={14} color={colors.dark_gray}>
                            Enter the code from the customer's voucher
                            {business_id ? " for this business" : ""}.
                        </Text>
                        <Input
                            required
                            label="Redemption Code"
                            placeholder="e.g. AB12CD34"
                            autoCapitalize="characters"
                            value={code}
                            onChangeText={(value) => {
                                setCode(value.toUpperCase())
                                setResult(null)
                            }}
                        />
                        <Button onPress={onVerify} loading={is_verifying}>
                            Check Code
                        </Button>
                    </View>

                    {result ? (
                        <View style={styles.result_card}>
                            {result.status === "active" ? (
                                <>
                                    <Text size={13} weight="semibold" color={colors.success}>
                                        Valid code
                                    </Text>
                                    <Text size={18} weight="bold">
                                        {result.user_name}
                                    </Text>
                                    <Text size={14} color={colors.dark_gray}>
                                        {result.special_title}
                                    </Text>
                                    <Button onPress={onConfirm} loading={is_confirming}>
                                        Confirm Redemption
                                    </Button>
                                </>
                            ) : null}

                            {result.status === "used" ? (
                                <>
                                    <Text size={13} weight="semibold" color={colors.warning}>
                                        Already used
                                    </Text>
                                    <Text size={16} weight="bold">
                                        {result.user_name || "Customer"}
                                    </Text>
                                    <Text size={14} color={colors.dark_gray}>
                                        Redeemed on {formatDate(result.redeemed_at)} at {formatTime(result.redeemed_at)}
                                    </Text>
                                </>
                            ) : null}

                            {result.status === "expired" ? (
                                <>
                                    <Text size={13} weight="semibold" color={colors.danger}>
                                        Expired
                                    </Text>
                                    <Text size={14} color={colors.dark_gray}>
                                        This code expired after 3 days
                                        {result.expires_at ? ` (${formatDate(result.expires_at)})` : ""}.
                                    </Text>
                                </>
                            ) : null}

                            {result.status === "invalid" ? (
                                <>
                                    <Text size={13} weight="semibold" color={colors.danger}>
                                        Invalid
                                    </Text>
                                    <Text size={14} color={colors.dark_gray}>
                                        Code not found, or it belongs to another business.
                                    </Text>
                                </>
                            ) : null}
                        </View>
                    ) : null}
                </View>
            </KeyboardAvoidingWrapper>
        </PrimaryLayout>
    )
}

export default SpecialVerifyCode

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: heightPixel(24),
    },
    fields: {
        gap: heightPixel(16),
    },
    result_card: {
        gap: heightPixel(10),
        paddingHorizontal: widthPixel(16),
        paddingVertical: heightPixel(16),
        borderRadius: heightPixel(16),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
})
