import { memo } from "react"
import { StyleSheet } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Icon from "../Icon"
import Text from "../Text"
import Touchable from "../Touchable"

const CategoryCard = ({ data, onPress }) => {

    const { image_url, name } = data

    return (
        <Touchable onPress={onPress} style={styles.container}>
            <Icon
                source={{ uri: image_url }}
                size={88}
                rounded={"full"}
                background={colors.white}
                space
            />
            <Text
                size={11}
                weight="semibold"
                align="center"
                lines={2}
                style={styles.name}
            >
                {name}
            </Text>
        </Touchable>
    )
}

export default memo(CategoryCard)

const styles = StyleSheet.create({
    container: {
        width: widthPixel(88),
        alignItems: "center",
        gap: heightPixel(8),
    },
    name: {
        width: "100%",
    },
})
