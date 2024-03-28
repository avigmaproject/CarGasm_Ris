import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  Image
} from "react-native"
import React, { useState, useEffect } from "react"
import Box from "../../components/Box"
import CustomText from "../../components/CustomText"
import CustomHeader from "../../components/CustomHeader"
import { ProfileProps } from "../../types/propTypes"
import { Dimensions } from "react-native"
import colors from "../../utils/color"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { getUserMasterList } from "../../redux/ducks/getUserMasterData"
import { dummyProfileUrl } from "../../utils/constant"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen"
import LikedItemsPage from "./components/LikedItemsPage"
import PostedItemsPage from "./components/PostedItemsPage"
import TopTabs from "../../components/TopTabs"
import { useAppSelector } from "../../utils/hooks"
import { useDispatch } from "react-redux"
const height = Dimensions.get("window").height
const width = Dimensions.get("window").width

export default function Profile(props: ProfileProps) {
  const dispatch = useDispatch<any>()
  const [activeIndex, setActiveIndex] = useState(0)
  const [userData, setUserData] = useState<GET_USER_LIST[]>([])
  const selectUserData = useAppSelector((state) => state.getUserMasterData)
  const tabs = [
    {
      title: "Posted Items",
      onPress: () => onChangeTab(0),
      icon: "form-select"
    },
    {
      title: "Liked Items",
      onPress: () => onChangeTab(1),
      icon: "heart-outline"
    }
  ]
  useEffect(() => {
    props.navigation.addListener("focus", onFocus)
    return () => {
      props.navigation.removeListener("focus", onFocus)
    }
  }, [])

  function onFocus() {
    dispatch(getUserMasterList(2, 1, 0, "string", 0, 0, "string", 0))
  }

  useEffect(() => {
    if (selectUserData.called) {
      setUserData(selectUserData["0"]["0"]["0"])
    }
  }, [selectUserData])
  console.log("userdata", userData)
  const onPressSetting = () => {
    props.navigation.navigate("Setting")
  }

  function onChangeTab(index: number) {
    setActiveIndex(index)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Box>
        <CustomHeader
          title="Profile"
          iconName="cog-outline"
          onPressIconName={onPressSetting}
          isSecondIcon
          isProfile
        />
        <Box style={styles.profileHeader}>
          <Box>
            <View style={{ borderWidth: 1, borderRadius: 35 }}>
              <Image
                source={{
                  uri: userData.User_Image_Path
                    ? userData.User_Image_Path
                    : dummyProfileUrl
                }}
                style={{
                  width: 65,
                  height: 65,
                  borderWidth: 1,
                  borderRadius: 35
                }}
              />
            </View>
          </Box>
          <Box style={{ right: 20 }}>
            <CustomText
              fontSize={16}
              lineHeight={24}
              color={colors.textColor}
              fontFamily="Inter-SemiBold"
            >
              {userData.User_Name}
            </CustomText>
            <CustomText
              fontSize={12}
              lineHeight={16}
              color="#171717"
              fontFamily="Inter-Regular"
            >
              {userData.User_Email}
            </CustomText>
          </Box>
          <Pressable
            style={styles.circle}
            onPress={() => props.navigation.navigate("UpdateProfile")}
          >
            <Icon
              name="pencil-outline"
              color={colors.primary}
              size={22}
              style={{ borderBottomWidth: 1, borderColor: colors.primary }}
            />
          </Pressable>
        </Box>
      </Box>
      <Box style={styles.onScroll}>
        <TopTabs tabs={tabs} activeIndex={activeIndex} />
        {activeIndex === 0 ? (
          <PostedItemsPage {...props} />
        ) : (
          <LikedItemsPage {...props} />
        )}
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
  profileHeader: {
    position: "absolute",
    bottom: -40,
    height: height * 0.11,
    width: width * 0.9,
    alignSelf: "center",
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: "#4F70B7",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  circle: {
    padding: 8,
    backgroundColor: colors.lightPrimary,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    right: 10
  },
  onScroll: {
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("6%")
  }
})
