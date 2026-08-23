import { memo, useCallback, useEffect, useState } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Badge from "../Badge"
import BottomSheetModal from "../BottomSheetModal"
import Button from "../Button"
import Input from "../Input"
import Label from "../Label"

const EMPTY_FILTERS = {
    category: "",
    min_price: "",
    max_price: "",
}

const MarketplaceFilters = ({
    visible,
    onClose,
    onApply,
    onReset,
    filters = EMPTY_FILTERS,
    category_options = [],
    categories_loading = false,
}) => {

    const [category, setCategory] = useState(filters.category || "")
    const [min_price, setMinPrice] = useState(filters.min_price || "")
    const [max_price, setMaxPrice] = useState(filters.max_price || "")

    useEffect(() => {
        if (!visible) return
        setCategory(filters.category || "")
        setMinPrice(filters.min_price || "")
        setMaxPrice(filters.max_price || "")
    }, [visible, filters.category, filters.min_price, filters.max_price])

    const handleSelectCategory = useCallback((value) => {
        const next = value ? String(value) : ""
        setCategory((current) => (current === next ? "" : next))
    }, [])

    const handleApply = useCallback(() => {
        onApply?.({
            category,
            min_price,
            max_price,
        })
        onClose?.()
    }, [category, max_price, min_price, onApply, onClose])

    const handleReset = useCallback(() => {
        setCategory("")
        setMinPrice("")
        setMaxPrice("")
        onReset?.()
        onClose?.()
    }, [onClose, onReset])

    return (
        <BottomSheetModal
            visible={visible}
            onClose={onClose}
            title="Filters"
            subtitle="Refine marketplace listings"
            initial_height={480}
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
                <View style={styles.price_row}>
                    <View style={styles.price_input}>
                        <Input
                            type="number"
                            label="Min price"
                            placeholder="0"
                            value={min_price}
                            onChangeText={setMinPrice}
                        />
                    </View>
                    <View style={styles.price_input}>
                        <Input
                            type="number"
                            label="Max price"
                            placeholder="Any"
                            value={max_price}
                            onChangeText={setMaxPrice}
                        />
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

export default memo(MarketplaceFilters)

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
    price_row: {
        flexDirection: "row",
        gap: widthPixel(10),
    },
    price_input: {
        flex: 1,
    },
    actions: {
        flexDirection: "row",
        gap: widthPixel(10),
    },
    action: {
        flex: 1,
    },
})
