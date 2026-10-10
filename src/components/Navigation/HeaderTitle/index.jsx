import { memo } from "react"
import { StyleSheet, View } from "react-native"
import images from "../../../assets/images"
import { GLOBAL_HORIZONTAL_PADDING, heightPixel, widthPixel } from "../../../helpers/metrics"
import Image from "../../Image"
import Text from "../../Text"

const HeaderTitle = ({ title, type = "primary", has_back_button = false }) => {

    if (type === "logo") {
        return (
            <View style={styles.logo_container}>
                <Image
                    source={images.logo_horizontal}
                    style={styles.logo}
                    resize="contain"
                />
            </View>
        )
    }

    return (
        <Text
            size={20}
            weight="semibold"
            style={has_back_button ? styles.title_with_back : undefined}
        >
            {title}
        </Text>
    )

}

export default memo(HeaderTitle)

const styles = StyleSheet.create({
    logo_container: {
        justifyContent: "center",
    },
    logo: {
        width: widthPixel(160),
        height: heightPixel(36),
    },
    title_with_back: {
        paddingLeft: GLOBAL_HORIZONTAL_PADDING / 2,
    },
})
