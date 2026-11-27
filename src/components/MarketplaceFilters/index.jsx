import { memo, useCallback, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import BottomSheetModal from "../BottomSheetModal"
import Button from "../Button"
import Input from "../Input"

const EMPTY_FILTERS = {
    min_price: "",
    max_price: "",
}

const MarketplaceFilters = ({
    visible,
    onClose,
    onApply,
    onReset,
    filters = EMPTY_FILTERS,
}) => {

    const [min_price, setMinPrice] = useState(filters.min_price || "")
    const [max_price, setMaxPrice] = useState(filters.max_price || "")

    useEffect(() => {
        if (!visible) return
        setMinPrice(filters.min_price || "")
        setMaxPrice(filters.max_price || "")
    }, [visible, filters.min_price, filters.max_price])

    const handleApply = useCallback(() => {
        onApply?.({
            min_price,
            max_price,
        })
        onClose?.()
    }, [max_price, min_price, onApply, onClose])

    const handleReset = useCallback(() => {
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
            subtitle="Filter listings by price"
            initial_height={300}
        >
            <View style={styles.fields}>
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
