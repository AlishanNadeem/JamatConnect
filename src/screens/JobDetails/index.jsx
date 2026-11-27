import { ActivityIndicator, StyleSheet, View } from "react-native"
import Badge from "../../components/Badge"
import Button from "../../components/Button"
import Empty from "../../components/Empty"
import FlatList from "../../components/FlatList"
import Icon from "../../components/Icon"
// import JobCard from "../../components/JobCard" // used by the hidden "More Jobs Like This" section
import Row from "../../components/Row"
import Text from "../../components/Text"
import Touchable from "../../components/Touchable"
import UserCard from "../../components/UserCard"
import colors from "../../helpers/colors"
import { formatDate } from "../../helpers/date"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useJobDetailsController from "./useJobDetailsController"

const APPLICANT_DATE_OPTIONS = { format: "MMM D, YYYY hh:mm A" }

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

    const { data: job, business, is_mine, applicants } = values

    // Prototype apply bar: save toggle beside a full-width Apply button, fixed to the bottom.
    const apply_bar = !is_mine ? (
        <Row align="center" gap={10}>
            <Touchable
                onPress={() => functions.onToggleSave()}
                style={[styles.save_button, values.saved && styles.save_button_on]}
            >
                <Icon
                    name={values.saved ? "bookmark-check" : "bookmark"}
                    size={20}
                    color={colors.primary}
                />
            </Touchable>
            <View style={styles.apply_button}>
                <Button
                    type={job.applied || job.closed ? "muted" : "primary"}
                    disabled={job.applied || job.closed}
                    loading={values.is_applying}
                    onPress={functions.onApply}
                >
                    {values.apply_label}
                </Button>
            </View>
        </Row>
    ) : null

    return (
        <PrimaryLayout scrollable header footer={apply_bar}>
            <View style={styles.content}>
                <View style={styles.card}>
                    {business ? (
                        <Icon
                            rounded="half"
                            source={{ uri: business.logo_url }}
                            size={56}
                            resize="cover"
                            background={colors.background}
                            onPress={functions.onViewBusiness}
                        />
                    ) : null}

                    <View style={styles.title_block}>
                        <Text size={24} weight="bold">
                            {job.title}
                        </Text>
                        {business ? (
                            <Touchable onPress={functions.onViewBusiness} style={styles.business_link}>
                                <Text size={15} weight="semibold" color={colors.primary} lines={1} style={styles.business_name}>
                                    {business.name}
                                </Text>
                            </Touchable>
                        ) : null}
                    </View>

                    {values.location_label ? (
                        <View style={styles.location_row}>
                            <Icon name="map-pin" size={16} color={colors.dark_gray} />
                            <Text size={14} color={colors.dark_gray} style={styles.location_text}>
                                {values.location_label}
                            </Text>
                        </View>
                    ) : null}

                    {job.createdAt ? (
                        <Text size={12} color={colors.gray}>
                            Posted {formatDate(job.createdAt, { show_time_ago: true })}
                        </Text>
                    ) : null}

                    <View style={styles.chips}>
                        {values.employment_type_label ? (
                            <Badge label={values.employment_type_label} mode="light_primary" />
                        ) : null}
                        {values.workplace_type_label ? (
                            <Badge label={values.workplace_type_label} mode="light_primary" />
                        ) : null}
                        {job.closed ? (
                            <Badge label="Closed" mode="danger" />
                        ) : null}
                    </View>

                </View>

                {is_mine ? (
                    <View style={styles.owner_actions}>
                        <Button
                            type={job.closed ? "primary" : "secondary"}
                            onPress={functions.onToggleClosed}
                            loading={values.is_closing}
                            disabled={values.is_deleting}
                        >
                            {job.closed ? "Reopen Job" : "Mark as Closed"}
                        </Button>
                        <Row gap={12}>
                            <View style={styles.action_button}>
                                <Button
                                    onPress={functions.onEdit}
                                    disabled={values.is_closing || values.is_deleting}
                                >
                                    Edit Job
                                </Button>
                            </View>
                            <View style={styles.action_button}>
                                <Button
                                    type="danger"
                                    onPress={functions.onDelete}
                                    loading={values.is_deleting}
                                    disabled={values.is_closing}
                                >
                                    Delete Job
                                </Button>
                            </View>
                        </Row>
                    </View>
                ) : null}

                {job.description ? (
                    <View style={[styles.card, styles.card_divided]}>
                        <Text weight="bold">About the job</Text>
                        <Text size={14} color={colors.dark_gray} style={styles.body_text}>
                            {job.description}
                        </Text>
                    </View>
                ) : null}

                {/* About the business (hidden for now)
                {business ? (
                    <View style={styles.card}>
                        <Text weight="bold">About the business</Text>
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
                */}

                {is_mine && applicants.length ? (
                    <View style={styles.section}>
                        <Text size={18} weight="semibold">
                            Applicants ({applicants.length})
                        </Text>
                        <FlatList
                            data={applicants}
                            scrollEnabled={false}
                            keyExtractor={(item) => String(item._id)}
                            renderItem={({ item }) => (
                                <UserCard
                                    data={item}
                                    date_label="Applied on"
                                    date_options={APPLICANT_DATE_OPTIONS}
                                    onCall={item.phone
                                        ? () => functions.onCallApplicant(item)
                                        : undefined}
                                    onEmail={item.email
                                        ? () => functions.onEmailApplicant(item)
                                        : undefined}
                                />
                            )}
                        />
                    </View>
                ) : null}

                {/* More Jobs Like This (hidden for now)
                {similar_jobs.length ? (
                    <View style={styles.section}>
                        <Text size={18} weight="semibold">
                            More Jobs Like This
                        </Text>
                        <FlatList
                            data={similar_jobs}
                            scrollEnabled={false}
                            keyExtractor={(item) => String(item._id)}
                            renderItem={({ item }) => (
                                <JobCard
                                    data={item}
                                    saved={values.saved_job_ids.includes(String(item._id))}
                                    onPress={() => functions.onSimilarJobPress(item)}
                                    onSave={() => functions.onToggleSave(item._id)}
                                />
                            )}
                        />
                    </View>
                ) : null}
                */}
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
    // Flat sections on the page background, as in the prototype.
    card: {
        gap: heightPixel(10),
        paddingVertical: heightPixel(4),
    },
    card_divided: {
        paddingTop: heightPixel(16),
        borderTopWidth: heightPixel(1),
        borderTopColor: colors.light_gray,
    },
    title_block: {
        gap: heightPixel(4),
    },
    business_link: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        maxWidth: "100%",
        paddingVertical: heightPixel(2),
    },
    business_name: {
        flexShrink: 1,
    },
    location_row: {
        flexDirection: "row",
        alignItems: "center",
        gap: widthPixel(6),
    },
    location_text: {
        flex: 1,
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
    action_button: {
        flex: 1,
    },
    save_button: {
        width: heightPixel(52),
        height: heightPixel(52),
        borderRadius: heightPixel(8),
        borderWidth: 1,
        borderColor: colors.light_gray,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
    },
    save_button_on: {
        borderColor: colors.primary,
        backgroundColor: colors.lightest_primary,
    },
    apply_button: {
        flex: 1,
    },
    owner_actions: {
        gap: heightPixel(10),
    },
    section: {
        gap: heightPixel(12),
    },
    body_text: {
        lineHeight: heightPixel(22),
    },
})
