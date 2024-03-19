import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  Switch,
  Pressable,
  TouchableOpacity
} from "react-native"
import React, { useState } from "react"
import Box from "../../components/Box"
import CustomText from "../../components/CustomText"
import colors from "../../utils/color"
import CustomHeader from "../../components/CustomHeader"
import { ProfileProps } from "../../types/propTypes"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
const height = Dimensions.get("window").height
const width = Dimensions.get("window").width
export default function Setting() {
  const [isEnabled, setIsEnabled] = useState<boolean>(false)

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState)
  }
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Setting" iconName="cog-outline" back />
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <Box mt={20} mb={20}>
          <CustomText
            fontSize={22}
            color={colors.textColor}
            fontFamily="Inter-Medium"
          >
            Notification Setting
          </CustomText>
        </Box>
        <Box mt={20} style={styles.box1}>
          <CustomText fontSize={22} color={colors.appblack}>
            All Inapp notification
          </CustomText>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#767577" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </Box>
        <Box mt={20}>
          <TouchableOpacity style={styles.box1}>
            <CustomText fontSize={22} color={colors.appblack}>
              Terms and conditions
            </CustomText>
            <Icon name="chevron-right" size={30} color={colors.appblack} />
          </TouchableOpacity>
        </Box>
        <Box mt={20}>
          <TouchableOpacity style={styles.box1}>
            <CustomText fontSize={22} color={colors.appblack}>
              Privacy policy
            </CustomText>
            <Icon name="chevron-right" size={30} color={colors.appblack} />
          </TouchableOpacity>
        </Box>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "#F4F4F4"
  },
  box1: {
    height: height * 0.1,
    borderRadius: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between"
  }
})
