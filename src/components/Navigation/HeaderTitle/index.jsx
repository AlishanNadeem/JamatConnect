import { memo } from "react"
import { View } from "react-native"
import { useSelector } from "react-redux"
import { GLOBAL_HORIZONTAL_PADDING, widthPixel } from "../../../helpers/metrics"
import { selectUser } from "../../../redux/selectors"
import Icon from "../../Icon"
import Row from "../../Row"
import Text from "../../Text"

const HeaderTitle = ({ title, type = "primary" }) => {

    const user = useSelector(selectUser)
    const is_primary = type === "primary"

    if (is_primary) {
        return (
            <View style={{ paddingLeft: GLOBAL_HORIZONTAL_PADDING / 2 }}>
                <Text size={20} weight="semibold">{title}</Text>
            </View>
        )
    }

    return (
        <Row justify="center" gap={16} style={{ width: "auto", paddingLeft: widthPixel(17) }}>
            <Icon size={46} rounded={"full"} source={{ uri: user?.image_url }} resize="cover" />
            <View>
                <Text>Hi, {user?.name} 👋</Text>
                <Text size={19} weight="semibold">Welcome Back</Text>
            </View>
        </Row>
    )

}

export default memo(HeaderTitle)