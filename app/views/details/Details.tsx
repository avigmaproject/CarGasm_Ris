import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet
} from "react-native"
import React, { useEffect, useState } from "react"
import Box from "../../components/Box"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen"
import CustomText from "../../components/CustomText"
import CustomHeader from "../../components/CustomHeader"
import { useDispatch } from "react-redux"
import { getPostedItemsList } from "../../redux/ducks/getPostedItems"
import { DetailsProps } from "../../types/propTypes"
import { useAppSelector } from "../../utils/hooks"
import { pixelSizeHorizontal, pixelSizeVertical } from "../../utils/responsive"
import colors from "../../utils/color"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import PrimaryButton from "../../components/PrimaryButton"
import { dummyProfileUrl } from "../../utils/constant"

export default function Details({ route, navigation }: DetailsProps) {
  const selectProductDetail = useAppSelector((state) => state.getPostedItems)
  const dispatch = useDispatch<any>()
  const [detailsData, setDetailsData] = useState<POSTED_ITEMS>()
  const [queans, setQuaAns] = useState([
    {
      no: 1,
      que: "What is Lorem Ipsum?",
      ans: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    },
    { no: 2, que: "Where does it come from?", ans: "U.S.A" },
    {
      no: 3,
      que: "What is Lorem Ipsum?",
      ans: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    },
    { no: 4, que: "Where does it come from?", ans: "U.S.A" }
  ])

  useEffect(() => {
    dispatch(
      getPostedItemsList(2, route.params.Id, 1, "string", 1, 100, "string", 0)
    )
  }, [])

  useEffect(() => {
    if (selectProductDetail.called) {
      setDetailsData(selectProductDetail[0][0][0])
    }
  }, [selectProductDetail])
  console.log("detailllll", detailsData?.User_Image_Path)
  return (
    <SafeAreaView style={styles.container}>
      <Box>
        <CustomHeader
          title="Product Details"
          iconName="heart-outline"
          isDetail
          back
          isSecondIcon
        />
        <ScrollView style={styles.onScroll}>
          <Box style={styles.imageBox}>
            <Image
              source={{ uri: detailsData?.UP_ImagePath }}
              style={styles.image}
            />
          </Box>
          <Box pv={10}>
            <CustomText
              fontSize={20}
              lineHeight={24}
              color={colors.textColor}
              fontFamily="Inter-SemiBold"
            >
              {detailsData?.UP_Title}
            </CustomText>
            <CustomText
              fontSize={16}
              lineHeight={22}
              color={colors.appblack}
              fontFamily="Inter-Regular"
              style={{ marginTop: 10 }}
            >
              {detailsData?.UP_Coll_Desc}
            </CustomText>
            <Box flexDirection="row" alignItems="center" mt={10}>
              <Icon
                name="map-marker-outline"
                size={25}
                color={colors.appblack}
                style={{ right: 3 }}
              />

              <CustomText
                fontFamily="Inter-Regular"
                fontSize={12}
                color={colors.textColor}
                lineHeight={18}
              >
                {detailsData?.UP_Location}
              </CustomText>
            </Box>
            <Box flexDirection="row" alignItems="center" mt={10}>
              <CustomText
                fontFamily="Inter-Regular"
                fontSize={16}
                color={colors.textColor}
                lineHeight={22}
              >
                Conditon:{" "}
              </CustomText>
              <CustomText
                fontFamily="Inter-SemiBold"
                fontSize={16}
                color={colors.textColor}
                lineHeight={22}
              >
                Brand New
              </CustomText>
            </Box>
            <Box flexDirection="row" alignItems="center" mt={10}>
              <Image
                source={{
                  uri: detailsData?.User_Image_Path
                    ? detailsData?.User_Image_Path
                    : dummyProfileUrl
                }}
                style={styles.userImage}
              />
              <CustomText
                fontFamily="Inter-Regular"
                fontSize={16}
                color={colors.appblack}
                lineHeight={22}
                style={{ left: 10 }}
              >
                {detailsData?.User_Name}
              </CustomText>
            </Box>
            <Box flexDirection="row" alignItems="center" mt={15}>
              <CustomText
                fontFamily="Inter-Regular"
                fontSize={18}
                color={colors.textColor}
                lineHeight={22}
              >
                Price:{" "}
              </CustomText>
              <CustomText
                fontFamily="Inter-Bold"
                fontSize={18}
                color={colors.primary}
                lineHeight={22}
              >
                ${Number(detailsData?.UP_Price).toFixed(2)}
              </CustomText>
            </Box>
            <Box mt={20}>
              <CustomText
                fontFamily="Inter-SemiBold"
                fontSize={16}
                color={colors.appblack}
                lineHeight={22}
              >
                Q & A
              </CustomText>
            </Box>
          </Box>
        </ScrollView>
      </Box>
      <Box style={styles.button}>
        <PrimaryButton
          label="Send Message to Seller"
          onPress={() =>
            navigation.navigate("SellerProfile", { detailsdata: detailsData })
          }
        />
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
  image: {
    height: pixelSizeVertical(200),
    width: "100%",
    borderRadius: 4
  },
  imageBox: {
    borderWidth: 1,
    alignItems: "center",
    padding: 5,
    borderColor: colors.borderColor,
    borderRadius: 4,
    backgroundColor: colors.secondary
  },
  onScroll: {
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("2%")
  },
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 25
  },
  button: {
    marginTop: "auto",
    padding: 20,
    backgroundColor: colors.secondary,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  }
})
