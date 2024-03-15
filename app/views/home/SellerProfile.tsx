import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  Platform,
  RefreshControl,
  FlatList,
  ListRenderItemInfo
} from "react-native"
import React, { useState, useEffect } from "react"
import { getHomeDataList } from "../../redux/ducks/home"
import { FlashList } from "@shopify/flash-list"
import Box from "../../components/Box"
import PrimaryButton from "../../components/PrimaryButton"

import CustomText from "../../components/CustomText"
import CustomHeader from "../../components/CustomHeader"
import { ProfileProps } from "../../types/propTypes"
import { Dimensions } from "react-native"
import colors from "../../utils/color"
import Card from "./component/Card"
import { HomeProps } from "../../types/propTypes"
import PostedItemsPage from "../profile/components/PostedItemsPage"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen"
import { useAppSelector } from "../../utils/hooks"
const height = Dimensions.get("window").height
const width = Dimensions.get("window").width

export default function SellerProfile({ ...props }: HomeProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [title, setTitle] = useState(props.route.params.title)
  const [imgth, setImgpath] = useState(props.route.params.imagpath)
  const selectHomeData = useAppSelector((state) => state.home)
  const [homeData, setHomeData] = useState<HOME_LIST[]>([])
  console.log("homeeeeeee444444", homeData)
  function onGetProductDetails(
    id: number,
    imagpath: string,
    title: string,
    location: string,
    price: string
  ) {
    console.log("id", imagpath)
  }
  useEffect(() => {
    if (selectHomeData.called) {
      setHomeData(selectHomeData["0"])
    }
  }, [selectHomeData])

  function onLike(pId: number, uId: number) {}
  const renderItem = ({ item }: ListRenderItemInfo<HOME_LIST>) => {
    console.log("222222homedata", item)
    return (
      <Card data={item} onPress={onGetProductDetails} onPressLike={onLike} />
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Seller Profile"
        iconName="heart-outline"
        isSecondIcon
        isSellerprofile
        back
      />

      <Box style={styles.profileHeader}>
        <Pressable style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={{
              uri: imgth
            }}
            style={{ height: 160, width: 160, borderRadius: 130 }}
          />
        </Pressable>
        <Box style={styles.name}>
          <CustomText
            fontFamily="Inter-SemiBold"
            fontSize={20}
            color={colors.textColor}
            lineHeight={24}
          >
            {title}
          </CustomText>
          <CustomText
            fontFamily="Inter-Regular"
            fontSize={16}
            color={"#677294"}
            lineHeight={22}
          >
            {"Lorem Ipsum has been the industry's standard dummy text ever."}
          </CustomText>
        </Box>
        <Box style={{ marginLeft: 20, marginTop: 20 }}>
          <CustomText
            fontFamily="Inter-SemiBold"
            fontSize={18}
            color={colors.textColor}
            lineHeight={22}
          >
            {"Recently sold items"}
          </CustomText>
        </Box>
        <Box style={styles.flat}>
          <FlatList
            data={homeData}
            renderItem={renderItem}
            numColumns={2}
            showsVerticalScrollIndicator={false}

            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
          />
        </Box>
        <Box ph={20} mt={30}>
          <PrimaryButton label="Send message to seller" />
        </Box>
      </Box>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "#F4F4F4"
  },
  flat: {
    height: "45%",

    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  name: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  profileHeader: {
    position: "absolute",
    top: 100,
    height: "80%"
  },

  onScroll: {
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("6%")
  }
})
