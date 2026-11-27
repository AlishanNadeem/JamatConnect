import { memo } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Text from "../Text"
import Touchable from "../Touchable"

const CategoryPill = ({ label, selected, onPress }) => (
    <Touchable onPress={onPress} style={[styles.pill, selected && styles.pill_on]}>
        <Text size={12} weight="semibold" color={selected ? colors.white : colors.black}>
            {label}
        </Text>
    </Touchable>
)

// Horizontal category pills, "All" first, as in the prototype.
const CategoryPills = ({ options, selected, onSelect }) => (
    <View>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pills}
        >
            <CategoryPill label="All" selected={!selected} onPress={() => onSelect("")} />
            {options.map((option) => {
                const value = option?.value ? String(option.value) : ""
                if (!value) return null
                return (
                    <CategoryPill
                        key={value}
                        label={option.label}
                        selected={selected === value}
                        onPress={() => onSelect(value)}
                    />
                )
            })}
        </ScrollView>
    </View>
)

export default memo(CategoryPills)

const styles = StyleSheet.create({
    pills: {
        gap: widthPixel(7),
    },
    pill: {
        borderWidth: 1,
        borderColor: colors.light_gray,
        borderRadius: heightPixel(18),
        paddingHorizontal: widthPixel(13),
        paddingVertical: heightPixel(7),
        backgroundColor: colors.white,
    },
    pill_on: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
})
