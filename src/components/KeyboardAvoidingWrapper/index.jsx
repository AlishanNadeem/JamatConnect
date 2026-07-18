import { Platform, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const KeyboardAvoidingWrapper = ({ children }) => {
    return (
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.content_container}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            extraScrollHeight={Platform.OS === "android" ? 150 : 80}
            enableAutomaticScroll={true}
            enableResetScrollToCoords={Platform.OS === "ios"}
            keyboardOpeningTime={Platform.OS === "ios" ? 250 : 0}
            bounces={false}
        >
            {children}
        </KeyboardAwareScrollView>
    );
};

export default KeyboardAvoidingWrapper;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    content_container: {
        flexGrow: 1,
        width: "100%",
    },
});