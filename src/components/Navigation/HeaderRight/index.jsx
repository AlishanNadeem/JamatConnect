import { memo } from "react"
import colors from "../../../helpers/colors"
import Icon from "../../Icon"

const HeaderRight = ({ icon, name, onPress, type = "secondary" }) => {

    let props = {
        color: colors.black,
        size: 22,
    }

    if (type === "secondary") {
        props = {
            ...props,
            size: 36,
            background: colors.lightest_primary,
            color: colors.primary,
            rounded: "half",
            space: true,
        }
    }

    return (
        <Icon source={icon} name={name} onPress={onPress} {...props} />
    )
}

export default memo(HeaderRight)
