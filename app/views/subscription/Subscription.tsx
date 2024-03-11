import {
  FlatList,
  StyleSheet,
  ListRenderItemInfo,
  Platform,
StatusBar
} from "react-native";
import React, { useContext, useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import Box from "../../components/Box";
import Header from "../../components/Header";
import SuscriptionButton from "../../components/SuscriptionButton";
import { SubscriptionProps } from "../../types/propTypes";
import GlobalContext from "../../contexts/GlobalContext";

export default function Subscription({ navigation }: SubscriptionProps) {
  const [subscriptionsData, setSubscriptionsData] = useState([
    {
      id: 1,
      title: "Standard Membership",
      price: "$1 ",
      selected: false,
      per: "/per post",
      points: [
        "Look at all the items for sale",
        "Private message seller",
        "Post item for sale for $1",
        "Watch items to buy later",
        "10 free questions to post on Q&A",
      ],
    },
    {
      id: 2,
      title: "Premium Membership",
      price: "$10 ",
      selected: false,
      per: "/per month",
      points: [
        "20 Free post (.50 cents each post after first 20)",
        "Receive notification when new item is posted that is being watched",
        "Read sellers review",
        "How many of the same item is for sale",
        "Unlimited questions to post on Q&A",
      ],
    },
    {
      id: 3,
      title: "Platinum Membership",
      price: "$20 ",
      selected: false,
      per: "/month",
      points: ["Unlimited posts"],
    },
  ]);
  const [selectedSub, setSelectedSub] = useState("");
  const { setFromLogin } = useContext(GlobalContext);

  function renderItem({ item }: ListRenderItemInfo<subscriptionType>) {
    return (
      <SuscriptionButton data={item} onPress={() => onSelectItem(item.id)} />
    );
  }

  function onSelectItem(id: number) {
    setSelectedSub(id.toString());
    let temp = subscriptionsData;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].id === id) {
        temp[i].selected = true;
      } else {
        temp[i].selected = false;
      }
    }
    setSubscriptionsData([...temp]);
  }

  function onContinuePayment() {
    setFromLogin(true);
  }

  return (

    <Box style={styles.container}>
  <StatusBar backgroundColor="transparent" translucent={true} />
      <Box ph={20} pv={Platform.OS === "ios" ? 50 : 20}>
        <Header back title="Subscriptions" />

        <FlatList
          data={subscriptionsData}
          keyExtractor={(_, index: number) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
 ListFooterComponent={() => <Box style={{height: 100}}></Box>}
        />
      </Box>
      {selectedSub && (
        <Box style={styles.button}>
          <PrimaryButton label="Continue Payment" onPress={onContinuePayment} />
        </Box>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "#F4F4F4",
  },
  button: {
    padding: 15,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    marginTop: "auto",
    backgroundColor: "#FFFFFF",
    paddingBottom: Platform.OS === "ios" ? 30 : 20,
  },
});
