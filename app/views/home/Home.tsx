import {
  Dimensions,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Box from "../../components/Box";
import Header from "./component/Header";
import { useDispatch } from "react-redux";
import { getHomeDataList } from "../../redux/ducks/home";
import { useAppSelector } from "../../utils/hooks";
import { FlashList } from "@shopify/flash-list";
import CustomText from "../../components/CustomText";
import Card from "./component/Card";

export default function Home() {
  const dispatch = useDispatch<any>();
  const selectHomeData = useAppSelector((state) => state.home);
  const [homeData, setHomeData] = useState<HOME_LIST[]>([]);

  useEffect(() => {
    dispatch(getHomeDataList(1, 0, "string", 1, 100, "string", 0));
  }, []);

  useEffect(() => {
    if (selectHomeData.called) {
      setHomeData(selectHomeData["0"]);
    }
  }, [selectHomeData]);

  const renderItem = ({ item }: ListRenderItemInfo<HOME_LIST>) => {
    return <Card data={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Box>
        <Header />
      </Box>
      <Box style={styles.flat}>
        <FlashList
          data={homeData}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          estimatedItemSize={200}
          numColumns={2}
          // refreshing={refresh}
          // onRefresh={Refresh}
        />
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "#F4F4F4",
  },
  flat: {
    height: "100%",
    width: Dimensions.get("screen").width,
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});
