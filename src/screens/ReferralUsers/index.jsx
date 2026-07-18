import PrimaryLayout from "../../layouts/PrimaryLayout"
import FlatList from "../../components/FlatList"
import ReferralUserCard from "../../components/ReferralUserCard"
import useReferralUsersController from "./useReferralUsersController"

const ReferralUsers = () => {

    const { values, functions } = useReferralUsersController()

    return (
        <PrimaryLayout header>
            <FlatList
                data={values.data}
                refreshing={values.refreshing}
                loading_more={values.loading_more}
                onRefresh={functions.onRefresh}
                onEndReached={functions.onLoadMore}
                renderItem={({ item }) => <ReferralUserCard data={item} />}
                empty={{
                    title: "No Referrals Yet",
                    description: "Users who join through your link will appear here.",
                }}
            />
        </PrimaryLayout>
    )
}

export default ReferralUsers
