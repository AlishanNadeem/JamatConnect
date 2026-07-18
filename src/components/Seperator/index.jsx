import { View } from "react-native"
import { heightPixel, widthPixel } from "../../helpers/metrics"

const Separator = ({ horizontal = false, size = 10 }) => {
    return (
        <View
            style={
                horizontal
                    ? { width: widthPixel(size) }
                    : { height: heightPixel(size) }
            }
        />
    )
}

export default Separator