import { StyleSheet, View } from "react-native"
import Empty from "../../components/Empty"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"

const Jobs = () => {
    return (
        <PrimaryLayout scrollable bottom_tab header>
            <View style={styles.container}>
                <Empty
                    title="No Jobs Yet"
                    description="Job listings will appear here."
                />
            </View>
        </PrimaryLayout>
    )
}

export default Jobs

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: heightPixel(200),
    },
})
