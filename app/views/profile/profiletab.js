import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native"
import React, { useState } from "react"
import ProfileHeader from "./components/ProfileHeader"
import LinearGradient from "react-native-linear-gradient"
import AntDesign from "react-native-vector-icons/AntDesign"
import Posteditems from "./posteditems"
import Box from "../../components/Box"
import { dummyProfileUrl } from "../../utils/constant"
import CustomText from "../../components/CustomText"
import Button from "../../components/Button"
export default function Payment() {
  const [postedbtn, setPostedbtn] = useState("posted")

  const onPostedbtn = () => {
    setPostedbtn("posted")
  }
  const onLikedbtn = () => {
    setPostedbtn("liked")
  }
  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader setting title="Profile" />

      <Box style={styles.overlappingView}>
        <Box
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            height: "15%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10
          }}
        >
          <Box style={{}}>
            <Image
              source={{
                uri: dummyProfileUrl
              }}
              style={styles.profileimg}
            />
          </Box>

          <Box style={{ flexDirection: "column", marginLeft: 20 }}>
            <CustomText
              fontFamily="Inter-Bold"
              fontSize={16}
              color="black"
              style={styles.title}
            >
              Dianne Russell
            </CustomText>
            <CustomText
              fontFamily="Inter-Bold"
              fontSize={12}
              color="grey"
              style={styles.title}
            >
              Diannerussell@example.com
            </CustomText>
          </Box>
          <Box ml={40}>
            <TouchableOpacity style={styles.EditButton}>
              <AntDesign
                onPress={() => navigation.goBack()}
                name={"edit"}
                size={20}
                color={"#1E6CF3"}
              />
            </TouchableOpacity>
          </Box>
        </Box>

        <LinearGradient
          colors={["rgba(9, 240, 185, 0.5)", "#4E6AFF"]}
          style={styles.Secondview}
        >
          <Box style={styles.ButtonView}>
            <Box style={{ width: "49%" }}>
              <Button
                height={40}
                fontcolor={"black"}
                color={postedbtn === "posted" ? "white" : "transparent"}
                color1={postedbtn === "posted" ? "white" : "transparent"}
                title={"Posted Items"}
                fontWeight="500"
                onPress={() => onPostedbtn()}
                fontSize={14}
                image1={require("../../assets/images/posticon.png")}
                tintColor={"black"}
              />
            </Box>
            <Box style={{ width: "49%" }}>
              <Button
                height={40}
                fontcolor={"black"}
                color={postedbtn === "liked" ? "white" : "transparent"}
                color1={postedbtn === "liked" ? "white" : "transparent"}
                title={"Liked Items"}
                fontWeight="500"
                onPress={() => onLikedbtn()}
                fontSize={14}
                iconcolor={"black"}
              />
            </Box>
          </Box>
        </LinearGradient>
        <Box>
          <Posteditems />
        </Box>
      </Box>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  overlappingView: {
    position: "absolute",
    height: "80%",
    top: 120,
    left: 20,
    right: 20,

    borderRadius: 5
  },
  profileimg: {
    height: 70,
    width: 70,
    borderRadius: 55,
    backgroundColor: "#000"
  },
  EditButton: {
    backgroundColor: "rgba(30, 108, 243, 0.1)",
    height: 40,
    width: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  ButtonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center"
  },
  Secondview: {
    flexDirection: "row",
    paddingHorizontal: 20,

    marginTop: 10,
    height: "8%",
    borderRadius: 10
  }
})
