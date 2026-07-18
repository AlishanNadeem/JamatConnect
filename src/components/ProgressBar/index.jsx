import {
    View
} from 'react-native';
import colors from '../../helpers/colors';
import { heightPixel } from '../../helpers/metrics';

const ProgressBar = ({
    progress = 0,
    height = 6,
    background_color = colors.light_primary,
    track_color = colors.white,
    style = {}
}) => {

    const border_radius = heightPixel(4)

    const clamped_progress = Math.max(0, Math.min(100, progress));

    const track_style = {
        width: '100%',
        height: height,
        borderRadius: border_radius,
        backgroundColor: track_color,
        overflow: 'hidden',
    };

    const fill_style = {
        height: "100%",
        width: `${clamped_progress}%`,
        backgroundColor: background_color,
        borderRadius: border_radius,
    }

    return (
        <View style={style}>
            <View style={track_style}>
                <View style={fill_style} />
            </View>
        </View>
    );
};

export default ProgressBar;