import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
  ListRenderItemInfo,
  FlatList
} from "react-native"
import React, { useState, useEffect } from "react"
import Box from "../../components/Box"
import CustomText from "../../components/CustomText"
import CustomHeader from "../../components/CustomHeader"
import { pixelSizeVertical } from "../../utils/responsive"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import PrimaryButton from "../../components/PrimaryButton"
import QuaAns from "../home/component/QuaAns"
import colors from "../../utils/color"
export default function Details({ ...props }) {
  const [id, setId] = useState(props.route.params.id)
  const [price, setPrice] = useState(props.route.params.price)
  const [title, setTitle] = useState(props.route.params.title)
  const [imgth, setImgpath] = useState(props.route.params.imagpath)
  const [location, setLocation] = useState(props.route.params.location)
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
  console.log("props.route.params", id, price, location)
  const renderItem = ({ item }: ListRenderItemInfo<QA_LIST>) => {
    console.log("homedata", item)
    return <QuaAns data={item} />
  }
  return (
    <SafeAreaView style={{ flex: 1, flexGrow: 1 }}>
      <Box>
        <CustomHeader
          title="Product Details"
          iconName="heart-outline"
          isDetail
          back
          isSecondIcon
        />
        <ScrollView style={{ paddingHorizontal: 20 }}>
          <Box pv={20}>
            <Image source={{ uri: imgth }} style={styles.image} />
            <Box pv={20}>
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
                color={colors.textColor}
                lineHeight={22}
                style={{ marginTop: 10 }}
              >
                {
                  "Lorem Ipsum has been the industry's standard dummy text ever."
                }
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
                  {location}
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
                  {" Brand New"}
                </CustomText>
              </Box>
              <Box flexDirection="row" alignItems="center" mt={10}>
                <CustomText
                  fontFamily="Inter-Regular"
                  fontSize={16}
                  color={colors.textColor}
                  lineHeight={22}
                >
                  Price:{" "}
                </CustomText>
                <CustomText
                  fontFamily="Inter-Bold"
                  fontSize={16}
                  color={colors.primary}
                  lineHeight={22}
                >
                  ${Number(price).toFixed(2)}
                </CustomText>
              </Box>
            </Box>
          </Box>
          <Box>
            <CustomText
              fontFamily="Inter-SemiBold"
              fontSize={16}
              color={colors.textColor}
              lineHeight={22}
            >
              {"Q & A"}
            </CustomText>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={queans}
              renderItem={renderItem}
            />
          </Box>
          <Box style={styles.button}>
            <PrimaryButton label="Send message to seller" />
          </Box>
        </ScrollView>
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
    borderRadius: 8
  },
  button: {
    marginTop: "auto",
    marginBottom: 50
  }
})
