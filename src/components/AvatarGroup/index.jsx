import { View } from 'react-native'
import Avatar from '../Avatar'
import { heightPixel } from '../../helpers/metrics'

const AvatarGroup = ({
    avatars,
    size = 40,
    max_avatars = 4,
    border = false,
}) => {

    const displayed_avatars = avatars.slice(0, max_avatars)
    const remaining_count = Math.max(0, avatars.length - max_avatars)

    const container_style = {
        flexDirection: 'row',
        alignItems: 'center',
    }

    const avatar_container_style = {
        marginRight: -heightPixel(14),
    }

    // const badge_style = {
    //     width: size,
    //     height: size,
    //     borderRadius: size / 2,
    //     backgroundColor: badge_background_color,
    //     borderColor: border_color,
    //     borderWidth: border_width,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     marginRight: spacing,
    // }

    // const badge_text_style = {
    //     fontSize: size * 0.35,
    //     fontWeight: '700',
    //     color: badge_text_color,
    // }

    return (
        <View style={container_style}>
            {
                displayed_avatars.map((avatar) => (
                    <View key={avatar.id} style={avatar_container_style}>
                        <Avatar
                            source={avatar.source}
                            initials={avatar.initials}
                            size={size}
                            border={border}
                        />
                    </View>
                ))
            }

            {/* {
                remaining_count > 0 && (
                    <View style={badge_style}>
                        <Text style={badge_text_style}>+{remaining_count}</Text>
                    </View>
                )
            } */}

        </View>
    )
}

export default AvatarGroup