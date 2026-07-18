import { FlatList as RNFlatList, ActivityIndicator, View } from "react-native"
import { useCallback } from "react"
import Separator from "../Seperator"
import Empty from "../Empty"
import colors from "../../helpers/colors"
import { heightPixel } from "../../helpers/metrics"

const FlatList = ({
    data,
    renderItem,
    keyExtractor,
    onRefresh,
    refreshing = false,
    onEndReached,
    loading_more = false,
    separator = 13,
    empty,
    horizontal = false,
    ...rest
}) => {

    const _keyExtractor = useCallback((item) =>
        item.id?.toString() ?? Math.random().toString()
        , [])

    const renderSeparator = useCallback(() => (
        <Separator size={separator} horizontal={horizontal} />
    ), [separator, horizontal])

    const renderFooter = useCallback(() => {

        if (!loading_more) return null

        return (
            <View style={{ paddingVertical: heightPixel(16) }}>
                <ActivityIndicator color={colors.primary} />
            </View>
        )

    }, [loading_more])

    const renderEmpty = useCallback(() => (
        <Empty
            title={empty?.title}
            description={empty?.description}
            icon={empty?.icon}
        />
    ), [empty])

    return (
        <RNFlatList
            horizontal={horizontal}
            data={data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={keyExtractor ?? _keyExtractor}
            ItemSeparatorComponent={renderSeparator}
            ListEmptyComponent={renderEmpty}
            ListFooterComponent={renderFooter}
            onRefresh={onRefresh}
            refreshing={refreshing}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            removeClippedSubviews
            maxToRenderPerBatch={10}
            windowSize={10}
            initialNumToRender={10}
            {...rest}
        />
    )
}

export default FlatList