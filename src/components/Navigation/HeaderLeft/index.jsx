import { memo } from "react"
import Icon from "../../Icon"
import colors from "../../../helpers/colors"

const HeaderLeft = ({ icon, name, onPress, type = "primary" }) => {

    let props = {}

    if (type === "secondary") {
        props.background = colors.light_gray
        props.rounded = "half"
        props.space = true
    }

    return (
        <Icon source={icon} name={name} onPress={onPress} size={36} {...props} />
    )
}

export default memo(HeaderLeft)