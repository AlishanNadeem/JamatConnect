import { memo, useState } from "react"
import { StyleSheet, View } from "react-native"
import { customList } from "country-codes-list"
import BottomSheetModal from "../BottomSheetModal"
import Input from "../Input"
import FlatList from "../FlatList"
import Row from "../Row"
import Text from "../Text"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import useSearch from "../../hooks/useSearch"

const COUNTRIES = Object.entries(
    customList("countryCode", "{countryNameEn}|+{countryCallingCode}")
).map(([code, value]) => {
    const [name, calling_code] = value.split("|")
    return { code, name, calling_code }
})

const CountryPickerModal = ({ visible, onSelect, onClose }) => {

    const { search, debounced, onChange } = useSearch("")

    const filtered = COUNTRIES.filter(c =>
        c.name.toLowerCase().includes(debounced.toLowerCase()) ||
        c.calling_code.includes(debounced)
    )

    const handleSelect = (item) => {
        onSelect(item)
        onClose()
        onChange("")
    }

    return (
        <BottomSheetModal
            visible={visible}
            onClose={onClose}
            initial_height={600}
            title="Select Country"
            subtitle="Search and select your country code"
        >
            <Input
                placeholder="Search country..."
                value={search}
                onChangeText={onChange}
            />

            <FlatList
                data={filtered}
                keyExtractor={(item) => item.code}
                style={styles.list}
                keyboardShouldPersistTaps="handled"
                separator={0}
                renderItem={({ item }) => (
                    <Row
                        align="center"
                        justify="space-between"
                        onPress={() => handleSelect(item)}
                        style={styles.item}
                    >
                        <View style={styles.name}>
                            <Text weight="semibold" color={colors.black}>{item.name}</Text>
                        </View>
                        <Text color={colors.gray}>{item.calling_code}</Text>
                    </Row>
                )}
            />
        </BottomSheetModal>
    )
}

export default memo(CountryPickerModal)

const styles = StyleSheet.create({
    list: {
        marginTop: heightPixel(16),
    },
    item: {
        paddingVertical: heightPixel(14),
        paddingHorizontal: widthPixel(8),
        borderBottomWidth: heightPixel(1),
        borderBottomColor: colors.light_gray,
    },
    name: {
        flex: 1,
    },
})