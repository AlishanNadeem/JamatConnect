import { StyleSheet, View } from "react-native"
import Button from "../../components/Button"
import FlatList from "../../components/FlatList"
import Row from "../../components/Row"
import SpecialCard from "../../components/SpecialCard"
import Text from "../../components/Text"
import Touchable from "../../components/Touchable"
import colors from "../../helpers/colors"
import { heightPixel, widthPixel } from "../../helpers/metrics"
import PrimaryLayout from "../../layouts/PrimaryLayout"
import useBusinessSpecialsController from "./useBusinessSpecialsController"

const BusinessSpecials = () => {
    const { values, functions } = useBusinessSpecialsController()

    return (
        <PrimaryLayout header>
            <View style={styles.container}>
                <Row gap={10}>
                    <View style={styles.flex}>
                        <Button size="sm" onPress={functions.onCreate}>
                            Post Special
                        </Button>
                    </View>
                    <View style={styles.flex}>
                        <Button size="sm" type="secondary" onPress={functions.onVerifyCode}>
                            Verify Code
                        </Button>
                    </View>
                </Row>

                <FlatList
                    data={values.data}
                    refreshing={values.refreshing}
                    loading_more={values.loading_more}
                    onRefresh={functions.onRefresh}
                    loading={values.is_loading}
                    keyExtractor={(item) => String(item._id)}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <SpecialCard
                                data={item}
                                onPress={() => functions.onSpecialPress(item)}
                            />
                            <Row gap={12} style={styles.item_actions}>
                                <Touchable onPress={() => functions.onEdit(item)}>
                                    <Text size={12} weight="semibold" color={colors.primary}>
                                        Edit
                                    </Text>
                                </Touchable>
                                <Touchable onPress={() => functions.onToggleActive(item)}>
                                    <Text size={12} weight="semibold" color={colors.dark_gray}>
                                        {item.is_active ? "Deactivate" : "Activate"}
                                    </Text>
                                </Touchable>
                                <Touchable onPress={() => functions.onDelete(item)}>
                                    <Text size={12} weight="semibold" color={colors.danger}>
                                        Delete
                                    </Text>
                                </Touchable>
                            </Row>
                        </View>
                    )}
                    empty={values.empty}
                    style={styles.list}
                />
            </View>
        </PrimaryLayout>
    )
}

export default BusinessSpecials

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: heightPixel(12),
    },
    flex: {
        flex: 1,
    },
    list: {
        flex: 1,
    },
    item: {
        gap: heightPixel(8),
        marginBottom: heightPixel(4),
    },
    item_actions: {
        paddingHorizontal: widthPixel(4),
    },
})
