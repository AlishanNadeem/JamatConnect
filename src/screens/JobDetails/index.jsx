import { ActivityIndicator, StyleSheet, View } from "react-native"
import Badge from "../../components/Badge"
import Button from "../../components/Button"
import Empty from "../../components/Empty"
import Icon from "../../components/Icon"
import JobCard from "../../components/JobCard"
import Text from "../../components/Text"
import Touchable from "../../components/Touchable"
import colors from "../../helpers/colors"
import { formatDate } from "../../helpers/date"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useJobDetailsController from "./useJobDetailsController"

const JobDetails = () => {

    const { values, functions } = useJobDetailsController()

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
                <Empty
                    title="Job Not Found"
                    description="This job posting is no longer available."
                />
            </PrimaryLayout>
        )
    }

    const job = values.data
    const business = values.business

    return (
        <PrimaryLayout scrollable header>
            <View style={styles.content}>
                <View style={styles.card}>
                    {business ? (
                        <Touchable onPress={functions.onViewBusiness} style={styles.company_row}>
                            <Icon
                                rounded="half"
                                source={{ uri: business.logo_url }}
                                size={56}
                                resize="cover"
                                background={colors.background}
                            />
                            <View style={styles.company_text}>
                                <Text size={15} weight="semibold" color={colors.primary} lines={1}>
                                    {business.name}
                                </Text>
                                {business.category?.name ? (
                                    <Text size={12} color={colors.gray} lines={1}>
                                        {business.category.name}
                                    </Text>
                                ) : null}
                            </View>
                        </Touchable>
                    ) : null}

                    <Text size={24} weight="bold">
                        {job.title}
                    </Text>

                    {values.location_label ? (
                        <Text size={14} color={colors.dark_gray}>
                            {values.location_label}
                        </Text>
                    ) : null}

                    {job.createdAt ? (
                        <Text size={12} color={colors.gray}>
                            Posted {formatDate(job.createdAt, { show_time_ago: true })}
                        </Text>
                    ) : null}

                    <View style={styles.chips}>
                        {values.employment_type_label ? (
                            <Badge label={values.employment_type_label} mode="muted" />
                        ) : null}
                        {values.workplace_type_label ? (
                            <Badge label={values.workplace_type_label} mode="muted" />
                        ) : null}
                    </View>

                    <View style={styles.button_wrap}>
                        <Button size="sm" style={styles.compact_button} onPress={functions.onApply}>
                            Apply for job
                        </Button>
                    </View>
                </View>

                {job.description ? (
                    <View style={styles.card}>
                        <Text size={18} weight="bold">
                            About the job
                        </Text>
                        <Text size={14} color={colors.dark_gray} style={styles.body_text}>
                            {job.description}
                        </Text>
                    </View>
                ) : null}

                {business ? (
                    <View style={styles.card}>
                        <Text size={18} weight="bold">
                            About the company
                        </Text>
                        {business.description ? (
                            <Text size={14} color={colors.dark_gray} style={styles.body_text}>
                                {business.description}
                            </Text>
                        ) : null}
                        <View style={styles.button_wrap}>
                            <Button
                                size="sm"
                                type="secondary"
                                style={styles.compact_button}
                                onPress={functions.onViewBusiness}
                            >
                                View company
                            </Button>
                        </View>
                    </View>
                ) : null}

                {values.similar_jobs.length ? (
                    <View style={styles.similar_section}>
                        <Text size={18} weight="bold">
                            More jobs like this
                        </Text>
                        <View style={styles.similar_list}>
                            {values.similar_jobs.map((item) => (
                                <JobCard
                                    key={item._id}
                                    data={item}
                                    onPress={() => functions.onSimilarJobPress(item)}
                                />
                            ))}
                        </View>
                    </View>
                ) : null}
            </View>
        </PrimaryLayout>
    )
}

export default JobDetails

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        gap: heightPixel(12),
        paddingVertical: heightPixel(8),
        paddingBottom: heightPixel(24),
    },
    card: {
        gap: heightPixel(10),
        padding: widthPixel(14),
        borderRadius: heightPixel(16),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
    company_row: {
        flexDirection: "row",
        alignItems: "center",
        gap: widthPixel(12),
    },
    company_text: {
        flex: 1,
        gap: heightPixel(2),
    },
    chips: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: widthPixel(8),
    },
    button_wrap: {
        alignSelf: "flex-end",
    },
    compact_button: {
        width: "auto",
        minWidth: widthPixel(120),
    },
    similar_section: {
        gap: heightPixel(12),
    },
    similar_list: {
        gap: heightPixel(10),
    },
    body_text: {
        lineHeight: heightPixel(22),
    },
})
