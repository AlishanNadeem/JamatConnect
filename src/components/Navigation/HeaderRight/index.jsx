import { memo } from "react"
import Icon from "../../Icon"

const HeaderRight = ({ icon, name, onPress }) => {
    return (
        <Icon source={icon} name={name} onPress={onPress} size={28} />
    )
}

export default memo(HeaderRight)