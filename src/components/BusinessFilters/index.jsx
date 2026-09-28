import { memo, useCallback, useEffect, useState } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Badge from "../Badge"
import BottomSheetModal from "../BottomSheetModal"
import Button from "../Button"
import Label from "../Label"

const EMPTY_FILTERS = {
    category: "",
}

const BusinessFilters = ({
    visible,
    onClose,
    onApply,
    onReset,
    filters = EMPTY_FILTERS,
    category_options = [],
    categories_loading = false,
}) => {

    const [category, setCategory] = useState(filters.category || "")

    useEffect(() => {
        if (!visible) return
        setCategory(filters.category || "")
    }, [visible, filters.category])

    const handleSelectCategory = useCallback((value) => {
        const next = value ? String(value) : ""
        setCategory((current) => (current === next ? "" : next))
    }, [])

    const handleApply = useCallback(() => {
        onApply?.({ category })
        onClose?.()
    }, [category, onApply, onClose])

    const handleReset = useCallback(() => {
        setCategory("")
        onReset?.()
        onClose?.()
    }, [onClose, onReset])

    return (
        <BottomSheetModal
            visible={visible}
            onClose={onClose}
            title="Filters"
            subtitle="Refine business listings"
            initial_height={420}
        >
            <View style={styles.fields}>
                <View style={styles.category_section}>
                    <Label label="Category" />
                    {categories_loading ? (
                        <View style={styles.loading}>
                            <ActivityIndicator color={colors.primary} />
                        </View>
                    ) : (
                        <View style={styles.chips}>
                            {category_options.map((option) => {
                                const value = option?.value ? String(option.value) : ""
                                const selected = category === value

                                return (
                                    <Badge
                                        key={value}
                                        label={option.label}
                                        mode={selected ? "primary" : "muted"}
                                        onPress={() => handleSelectCategory(value)}
                                    />
                                )
                            })}
                        </View>
                    )}
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

export default memo(BusinessFilters)

const styles = StyleSheet.create({
    fields: {
        gap: heightPixel(16),
        marginTop: heightPixel(8),
        marginBottom: heightPixel(24),
    },
    category_section: {
        gap: heightPixel(10),
    },
    chips: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: widthPixel(8),
    },
    loading: {
        height: heightPixel(48),
        alignItems: "center",
        justifyContent: "center",
    },
    actions: {
        flexDirection: "row",
        gap: widthPixel(10),
    },
    action: {
        flex: 1,
    },
})
