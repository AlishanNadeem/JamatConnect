import { StyleSheet, View } from "react-native";
import Touchable from "../Touchable";

const Row = ({
    children,
    align = "flex-start",
    justify = "flex-start",
    gap = 0,
    style = {},
    onPress
}) => {

    let Component = onPress ? Touchable : View

    return (
        <Component
            onPress={onPress}
            style={[
                styles.row,
                { alignItems: align, justifyContent: justify, gap },
                style
            ]}
        >
            {children}
        </Component>
    );

};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        width: "100%",
    }
});

export default Row;