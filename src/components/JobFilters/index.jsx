import { memo, useCallback, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Badge from "../Badge"
import BottomSheetModal from "../BottomSheetModal"
import Button from "../Button"
import Label from "../Label"

const EMPTY_FILTERS = {
    employment_type: "",
    workplace_type: "",
}

const JobFilters = ({
    visible,
    onClose,
    onApply,
    onReset,
    filters = EMPTY_FILTERS,
    employment_type_options = [],
    workplace_type_options = [],
}) => {

    const [employment_type, setEmploymentType] = useState(filters.employment_type || "")
    const [workplace_type, setWorkplaceType] = useState(filters.workplace_type || "")

    useEffect(() => {
        if (!visible) return
        setEmploymentType(filters.employment_type || "")
        setWorkplaceType(filters.workplace_type || "")
    }, [visible, filters.employment_type, filters.workplace_type])

    const handleSelectEmploymentType = useCallback((value) => {
        const next = value ? String(value) : ""
        setEmploymentType((current) => (current === next ? "" : next))
    }, [])

    const handleSelectWorkplaceType = useCallback((value) => {
        const next = value ? String(value) : ""
        setWorkplaceType((current) => (current === next ? "" : next))
    }, [])

    const handleApply = useCallback(() => {
        onApply?.({ employment_type, workplace_type })
        onClose?.()
    }, [employment_type, workplace_type, onApply, onClose])

    const handleReset = useCallback(() => {
        setEmploymentType("")
        setWorkplaceType("")
        onReset?.()
        onClose?.()
    }, [onClose, onReset])

    return (
        <BottomSheetModal
            visible={visible}
            onClose={onClose}
            title="Filters"
            subtitle="Refine job listings"
            initial_height={480}
        >
            <View style={styles.fields}>
                <View style={styles.section}>
                    <Label label="Employment Type" />
                    <View style={styles.chips}>
                        {employment_type_options.map((option) => {
                            const value = option?.value ? String(option.value) : ""
                            const selected = employment_type === value

                            return (
                                <Badge
                                    key={value}
                                    label={option.label}
                                    mode={selected ? "primary" : "muted"}
                                    onPress={() => handleSelectEmploymentType(value)}
                                />
                            )
                        })}
                    </View>
                </View>
                <View style={styles.section}>
                    <Label label="Workplace Type" />
                    <View style={styles.chips}>
                        {workplace_type_options.map((option) => {
                            const value = option?.value ? String(option.value) : ""
                            const selected = workplace_type === value

                            return (
                                <Badge
                                    key={value}
                                    label={option.label}
                                    mode={selected ? "primary" : "muted"}
                                    onPress={() => handleSelectWorkplaceType(value)}
                                />
                            )
                        })}
                    </View>
                </View>
            </View>
            <View style={styles.actions}>
                <View style={styles.action}>
                    <Button type="secondary" onPress={handleReset}>
                        Reset
                    </Button>
                </View>
                <View style={styles.action}>
                    <Button onPress={handleApply}>
                        Apply
                    </Button>
                </View>
            </View>
        </BottomSheetModal>
    )
}

export default memo(JobFilters)

const styles = StyleSheet.create({
    fields: {
        gap: heightPixel(16),
        marginTop: heightPixel(8),
        marginBottom: heightPixel(24),
    },
    section: {
        gap: heightPixel(10),
    },
    chips: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: widthPixel(8),
    },
    actions: {
        flexDirection: "row",
        gap: widthPixel(10),
    },
    action: {
        flex: 1,
    },
})
