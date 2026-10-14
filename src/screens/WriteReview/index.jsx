import { ActivityIndicator, StyleSheet, View } from "react-native"
import Button from "../../components/Button"
import Icon from "../../components/Icon"
import Input from "../../components/Input"
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper"
import Row from "../../components/Row"
import Text from "../../components/Text"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useWriteReviewController from "./useWriteReviewController"

const WriteReview = () => {

    const { values, functions } = useWriteReviewController()

    if (values.is_loading) {
        return (
            <PrimaryLayout header>
                <View style={styles.loader}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>
            </PrimaryLayout>
        )
    }

    if (values.is_error) {
        return (
            <PrimaryLayout header>
                <View style={styles.loader}>
                    <Text align="center" color={colors.dark_gray}>
                        This review link is invalid or no longer available.
                    </Text>
                </View>
            </PrimaryLayout>
        )
    }

    if (values.is_owner) {
        return (
            <PrimaryLayout header>
                <View style={styles.loader}>
                    <Text align="center" color={colors.dark_gray}>
                        You cannot review your own business.
                    </Text>
                </View>
            </PrimaryLayout>
        )
    }

    return (
        <PrimaryLayout header>
            <KeyboardAvoidingWrapper>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Icon
                            rounded="full"
                            source={values.logo_url ? { uri: values.logo_url } : undefined}
                            name={values.logo_url ? undefined : "store"}
                            size={64}
                            resize="cover"
                            background={colors.lightest_primary}
                            color={colors.primary}
                        />
                        <Text size={20} weight="bold" align="center">
                            {values.business_name}
                        </Text>
                        <Text size={14} color={colors.dark_gray} align="center">
                            {values.is_edit
                                ? "Update your review for this business."
                                : "Share your experience with the community."}
                        </Text>
                    </View>

                    <View style={styles.rating_block}>
                        <Text size={14} weight="semibold" align="center">
                            Your rating
                        </Text>
                        <Row align="center" justify="center" gap={8}>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <Icon
                                    key={value}
                                    name="star"
                                    size={36}
                                    color={value <= values.rating ? colors.yellow : colors.light_gray}
                                    onPress={() => functions.onSelectRating(value)}
                                />
                            ))}
                        </Row>
                        {values.rating_error ? (
                            <Text size={12} color={colors.danger} align="center">
                                {values.rating_error}
                            </Text>
                        ) : null}
                    </View>

                    <Input
                        label="Comment"
                        placeholder="Tell others about your experience (optional)"
                        type="textarea"
                        value={values.comment}
                        onChangeText={functions.onChangeComment}
                    />

                    <Button onPress={functions.onSubmit} loading={values.is_submitting}>
                        {values.is_edit ? "Update Review" : "Submit Review"}
                    </Button>
                </View>
            </KeyboardAvoidingWrapper>
        </PrimaryLayout>
    )
}

export default WriteReview

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: heightPixel(24),
    },
    header: {
        alignItems: "center",
        gap: heightPixel(10),
    },
    rating_block: {
        gap: heightPixel(12),
        paddingVertical: heightPixel(18),
        paddingHorizontal: widthPixel(16),
        borderRadius: heightPixel(16),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
    loader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: widthPixel(24),
    },
})
