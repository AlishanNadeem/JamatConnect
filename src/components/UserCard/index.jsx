import { memo } from "react"
import { StyleSheet, View } from "react-native"
import colors from "../../helpers/colors"
import { formatDate } from "../../helpers/date"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import Icon from "../Icon"
import Row from "../Row"
import Text from "../Text"

const UserCard = ({ data, date_label, date_options = {}, onChat, onCall, onEmail }) => {

    const {
        name,
        email,
        image_url,
        date,
    } = data

    const has_actions = Boolean(onChat || onCall || onEmail)

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
                {date ? (
                    <Text size={12} color={colors.gray}>
                        {date_label ? `${date_label} ` : ""}{formatDate(date, date_options)}
                    </Text>
                ) : null}
            </View>
            {has_actions ? (
                <Row align="center" gap={8} style={styles.actions}>
                    {onCall ? (
                        <Icon
                            name="phone"
                            size={36}
                            space
                            rounded="half"
                            background={colors.lightest_primary}
                            color={colors.primary}
                            onPress={onCall}
                        />
                    ) : null}
                    {onEmail ? (
                        <Icon
                            name="mail"
                            size={36}
                            space
                            rounded="half"
                            background={colors.lightest_primary}
                            color={colors.primary}
                            onPress={onEmail}
                        />
                    ) : null}
                    {onChat ? (
                        <Icon
                            name="message-circle-more"
                            size={36}
                            space
                            rounded="half"
                            background={colors.lightest_primary}
                            color={colors.primary}
                            onPress={onChat}
                        />
                    ) : null}
                </Row>
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
    actions: {
        width: "auto",
    },
})
