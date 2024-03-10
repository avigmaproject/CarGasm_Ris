import { View, Text, FlatList } from "react-native"
import React, { useState } from "react"
import Label from "../../components/Label"

export default function Posteditems() {
  const [userdata, setuserdata] = useState(["hiii"])
  const renderItem = ({ item, index }) => {
    return <View></View>
  }
  const ListEmptyComponent = () => {
    return (
      <View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: 400
          }}
        >
          <View style={{ marginTop: 10 }}>
            <Label fontSize={24} fontWeight="500" color={"white"}>
              {"No Record Found"}
            </Label>
          </View>
        </View>
      </View>
    )
  }
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={userdata}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        // }
        // ListFooterComponent={() => <View style={{height: 200}}></View>}
      />
    </View>
  )
}
