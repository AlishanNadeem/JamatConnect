import { memo, useCallback } from "react"
import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { BOTTOM_INSET, heightPixel, widthPixel } from "../../helpers/metrics"
import BottomSheetModal from "../BottomSheetModal"
import FlatList from "../FlatList"
import Row from "../Row"
import Text from "../Text"

const DropDownModal = ({
  visible,
  onClose,
  onSelect,
  data = [],
  title = "Select",
  labelKey = "name",
  keyExtractor,
  initial_height = 500,
}) => {

  const getItemKey = useCallback((item, index) => {
    if (keyExtractor) {
      return keyExtractor(item, index)
    }

    if (item?.id != null) {
      return String(item.id)
    }

    if (item?.key != null) {
      return String(item.key)
    }

    return String(index)
  }, [keyExtractor])

  const getItemLabel = useCallback((item) => {
    if (typeof item === "string") {
      return item
    }

    return item?.[labelKey] ?? ""
  }, [labelKey])

  const handleSelect = useCallback((item) => {
    onSelect?.(item)
    onClose?.()
  }, [onClose, onSelect])

  return (
    <BottomSheetModal
      visible={visible}
      onClose={onClose}
      initial_height={initial_height}
      title={title}
    >
      <FlatList
        data={data}
        keyExtractor={getItemKey}
        style={styles.list}
        contentContainerStyle={{ paddingBottom: BOTTOM_INSET + heightPixel(20) }}
        keyboardShouldPersistTaps="handled"
        separator={0}
        renderItem={({ item }) => (
          <Row
            align="center"
            justify="space-between"
            onPress={() => handleSelect(item)}
            style={styles.item}
          >
            <View style={styles.label}>
              <Text weight="semibold" size={16} color={colors.black}>
                {getItemLabel(item)}
              </Text>
            </View>
          </Row>
        )}
      />
    </BottomSheetModal>
  )
}

export default memo(DropDownModal)

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
  label: {
    flex: 1,
  },
})
