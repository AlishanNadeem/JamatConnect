import { memo } from "react"
import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { formatDate } from "../../helpers/date"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Icon from "../Icon"
import Row from "../Row"
import Text from "../Text"

const UserCard = ({ data, date_label, onChat }) => {

    const {
        name,
        email,
        image_url,
        date,
    } = data

    return (
        <Row align="center" gap={14} style={styles.container}>
            <Icon
                rounded="full"
                source={{ uri: image_url }}
                size={52}
                resize="cover"
                border={colors.white}
            />
            <View style={styles.content}>
                <Text size={16} weight="semibold" lines={1}>
                    {name}
                </Text>
                {email ? (
                    <Text size={13} color={colors.gray} lines={1}>
                        {email}
                    </Text>
                ) : null}
                {date ? (
                    <Text size={12} color={colors.gray}>
                        {date_label ? `${date_label} ` : ""}{formatDate(date)}
                    </Text>
                ) : null}
            </View>
            {onChat ? (
                <Icon
                    name="message-circle"
                    size={40}
                    space
                    rounded="half"
                    color={colors.primary}
                    background={colors.lightest_primary}
                    onPress={onChat}
                />
            ) : null}
        </Row>
    )
}

export default memo(UserCard)

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: widthPixel(16),
        paddingVertical: heightPixel(16),
        borderRadius: heightPixel(16),
        backgroundColor: colors.white,
        borderWidth: heightPixel(1),
        borderColor: colors.light_gray,
    },
    content: {
        flex: 1,
        gap: heightPixel(4),
    },
})
