import {
  Dimensions,
  ListRenderItemInfo,
  Platform,
  RefreshControl,
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
import Loader from "../../components/Loader";
import { HomeProps } from "../../types/propTypes";
import { onUpdateLike } from "../../redux/ducks/updateLikes";
import { onGlobalChange } from "../../redux/ducks/global";

export default function Home({ navigation }: HomeProps) {
  const dispatch = useDispatch<any>();
  const selectHomeData = useAppSelector((state) => state.home);
  const [homeData, setHomeData] = useState<HOME_LIST[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("homedata", homeData);
    navigation.addListener("focus", onFocus);
    return () => {
      navigation.removeListener("focus", onFocus);
    };
  }, []);

  function onFocus() {
    setLoading(true);
    dispatch(onGlobalChange({ showBottomTabs: false }));
    dispatch(getHomeDataList(1, 0, "string", 1, 100, "string", 0));
  }

  useEffect(() => {
    if (selectHomeData.called) {
      setLoading(false);
      setRefreshing(false);
      setHomeData(selectHomeData["0"]);
    }
  }, [selectHomeData]);

  function onRefresh() {
    setRefreshing(true);
    dispatch(getHomeDataList(1, 0, "string", 1, 100, "string", 0));
  }

  function onGetProductDetails(id: number) {
    navigation.navigate("Details", { Id: id });
  }

  function onLike(pId: number, uId: number) {
    dispatch(onUpdateLike(0, "string", pId, uId, true, false, 1, 0));
  }

  const renderItem = ({ item }: ListRenderItemInfo<HOME_LIST>) => {
    console.log("homedata", item);
    return (
      <Card data={item} onPress={onGetProductDetails} onPressLike={onLike} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Box>
        <Header />
      </Box>
      {loading && <Loader />}
      <Box style={styles.flat}>
        <FlashList
          data={homeData}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          estimatedItemSize={200}
          numColumns={2}
          contentContainerStyle={{
            paddingBottom: Platform.OS === "android" ? 100 : 70,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
    flex: 1,
    height: "100%",
    width: Dimensions.get("screen").width,
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});
