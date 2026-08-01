import { StyleSheet, View } from "react-native"
import Empty from "../../components/Empty"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"

const Businesses = () => {
    return (
        <PrimaryLayout scrollable bottom_tab header>
            <View style={styles.container}>
                <Empty
                    title="No Businesses Yet"
                    description="Business listings will appear here."
                />
            </View>
        </PrimaryLayout>
    )
}

export default Businesses

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: heightPixel(200),
    },
})
