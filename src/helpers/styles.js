import { StyleSheet } from "react-native";
import { BOTTOM_INSET, heightPixel } from "./metrics";

export const global_styles = StyleSheet.create({
    spacer: {
        flex: 0.9,
        minHeight: heightPixel(40),
    },
    padding_bottom: {
        paddingBottom: BOTTOM_INSET
    },
    auto_width: {
        width: "auto"
    }
})