import { memo } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Error from "../Error"
import Icon from "../Icon"
import Image from "../Image"
import Label from "../Label"
import Text from "../Text"
import Touchable from "../Touchable"

// Row of photo thumbnails with an add tile. The first photo is the cover.
const MultiImageUploader = ({
    label = "Photos",
    required,
    images = [],
    max = 10,
    onAdd,
    onRemove,
    error,
    hint,
}) => {

    const can_add = images.length < max

    return (
        <View style={styles.container}>
            <Row label={label} required={required} count={images.length} max={max} />
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.row}
            >
                {images.map((image, index) => (
                    <View key={`${image.uri}-${index}`} style={styles.tile}>
                        <Image source={{ uri: image.uri }} style={styles.preview} resize="cover" />
                        {index === 0 ? (
                            <View style={styles.cover_tag}>
                                <Text size={9} weight="bold" color={colors.white}>
                                    COVER
                                </Text>
                            </View>
                        ) : null}
                        <View style={styles.remove}>
                            <Icon
                                name="x"
                                size={22}
                                color={colors.white}
                                rounded="full"
                                space
                                background={colors.dark_primary}
                                onPress={() => onRemove?.(index)}
                            />
                        </View>
                    </View>
                ))}
                {can_add ? (
                    <Touchable onPress={onAdd} style={[styles.tile, styles.add_tile]}>
                        <Icon name="camera" size={22} color={colors.gray} />
                        <Text size={11} color={colors.gray}>
                            Add photo
                        </Text>
                    </Touchable>
                ) : null}
            </ScrollView>
            {hint ? (
                <Text size={12} color={colors.gray}>
                    {hint}
                </Text>
            ) : null}
            <Error error={error} />
        </View>
    )
}

const Row = ({ label, required, count, max }) => (
    <View style={styles.label_row}>
        <Label label={label} required={required} />
        <Text size={12} color={colors.gray}>
            {count} of {max}
        </Text>
    </View>
)

export default memo(MultiImageUploader)

const TILE = widthPixel(92)

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(10),
    },
    label_row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    row: {
        gap: widthPixel(10),
        paddingTop: heightPixel(6),
        paddingRight: widthPixel(6),
    },
    tile: {
        width: TILE,
        height: TILE,
        borderRadius: heightPixel(12),
        backgroundColor: colors.white,
    },
    preview: {
        width: "100%",
        height: "100%",
        borderRadius: heightPixel(12),
    },
    add_tile: {
        borderWidth: 1.4,
        borderStyle: "dashed",
        borderColor: colors.gray,
        alignItems: "center",
        justifyContent: "center",
        gap: heightPixel(4),
    },
    cover_tag: {
        position: "absolute",
        left: widthPixel(6),
        bottom: heightPixel(6),
        backgroundColor: "rgba(0,0,0,0.55)",
        borderRadius: widthPixel(5),
        paddingHorizontal: widthPixel(6),
        paddingVertical: heightPixel(2),
    },
    remove: {
        position: "absolute",
        top: -heightPixel(6),
        right: -widthPixel(6),
    },
})
