import { Image, View } from 'react-native'
import colors from '../../helpers/colors'
import { heightPixel } from '../../helpers/metrics'
import Text from '../Text'

const Avatar = ({
    source,
    size = 48,
    initials,
    border = false
}) => {

    const new_size = heightPixel(size)
    const border_radius = new_size / 2

    const container_style = {
        width: new_size,
        height: new_size,
        borderRadius: border_radius,
        borderWidth: border ? heightPixel(1.5) : 0,
        borderColor: border ? colors.white : colors.transparent,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    }

    return (
        <View style={container_style}>
            {source ? (
                <Image
                    source={source}
                    style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "cover",
                    }}
                />
            ) : (
                <Text>{initials}</Text>
            )}
        </View>
    )
}

export default Avatar