import { StyleSheet, View } from "react-native"
import { heightPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"

const Home = () => {
    return (
        <PrimaryLayout bottom_tab scrollable background>
            <View style={styles.container} />
        </PrimaryLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: heightPixel(200),
    }
})

export default Home
