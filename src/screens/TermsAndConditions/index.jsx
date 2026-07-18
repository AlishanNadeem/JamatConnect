import { StyleSheet, View } from "react-native"
import Text from "../../components/Text"
import { LOREM } from "../../helpers/data"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"

const TermsAndConditions = () => {
    return (
        <PrimaryLayout scrollable header>
            <View style={styles.container}>
                <Text size={16}>{LOREM}</Text>
                <Text size={16}>{LOREM}</Text>
                <Text size={16}>{LOREM}</Text>
                <Text size={16}>{LOREM}</Text>
            </View>
        </PrimaryLayout>
    )
}

export default TermsAndConditions

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(18)
    }
})