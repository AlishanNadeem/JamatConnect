import { memo } from "react"
import { StyleSheet } from "react-native"
import colors from "../../../helpers/colors"
import { heightPixel, widthPixel } from "../../../helpers/metrics"
import { navigate } from "../../../helpers/navigation"
import { ROUTES } from "../../../helpers/routes"
import Icon from "../../Icon"
import Text from "../../Text"
import Touchable from "../../Touchable"

// Green "+ Sell" pill for the Marketplace header; opens Add Listing.
const SellButton = () => (
    <Touchable onPress={() => navigate(ROUTES.CREATE_LISTING)} style={styles.button}>
        <Icon name="plus" size={14} color={colors.white} />
        <Text size={12} weight="semibold" color={colors.white}>
            Sell
        </Text>
    </Touchable>
)

export default memo(SellButton)

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        alignItems: "center",
        gap: widthPixel(5),
        height: heightPixel(36),
        paddingHorizontal: widthPixel(14),
        borderRadius: heightPixel(8),
        backgroundColor: colors.primary,
    },
})
