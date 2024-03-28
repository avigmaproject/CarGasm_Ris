import {
  View,
  StyleSheet,
  Platform,
  Image,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Text
} from "react-native"
import React, { useContext, useEffect, useState } from "react"
import LinearGradient from "react-native-linear-gradient"
import { dummyProfileUrl } from "../../utils/constant"
import CustomHeader from "../../components/CustomHeader"
import Box from "../../components/Box"
import { pixelSizeHorizontal, pixelSizeVertical } from "../../utils/responsive"
import { EditProfileProps } from "../../types/propTypes"
import Input from "../../components/Input"
import PrimaryButton from "../../components/PrimaryButton"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import colors from "../../utils/color"
import ActionSheet, {
  SheetManager,
  useSheetRef
} from "react-native-actions-sheet"
import ImagePicker from "../../components/ImagePicker"
import GlobalContext from "../../contexts/GlobalContext"
import { uploaddocumnetaws } from "../../utils/awsFile"
import Loader from "../../components/Loader"
import { useDispatch } from "react-redux"
import { updateProfile } from "../../redux/ducks/profile"
import { useAppSelector } from "../../utils/hooks"
import { snackBar } from "../../utils/helper"
import { isNameValid } from "../../utils/regex"
import { SafeAreaView } from "react-native-safe-area-context"
import { getUserMasterList } from "../../redux/ducks/getUserMasterData"
export default function UpdateProfile({ navigation }: EditProfileProps) {
  const [ActionSheetRef, setActionSheetRef] = useState(null)
  const selectUserData = useAppSelector((state) => state.getUserMasterData)
  const [selectedImage, setSelectedImage] = useState("")
  const [loading, setLoading] = useState(false)
  const [bio, setBio] = useState("")
  const [name, setName] = useState("")
  const dispatch = useDispatch<any>()
  const [imageName, setImageName] = useState("")
  const [nameError, setNameError] = useState("")
  const selectUpdateProfile = useAppSelector((state) => state.profile)
  const [userData, setUserData] = useState<GET_USER_LIST[]>([])
  // const userToken = getUserToken();
  console.log("//////", selectUserData)
  useEffect(() => {
    if (selectUserData.called) {
      setUserData(selectUserData["0"]["0"]["0"])
    }
  }, [selectUserData])
  console.log("userdata", userData)
  return (
    <SafeAreaView>
      <CustomHeader back title="Edit Profile" />

      <Box alignItems="center" mt={20}>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 55,
            borderColor: "#677294"
          }}
        >
          <Pressable
            style={{
              borderWidth: 1,
              position: "absolute",
              borderRadius: 20,
              padding: 5,
              bottom: 0,
              right: 0,
              zIndex: 100,
              backgroundColor: colors.secondary,
              borderColor: colors.appblack
            }}
            // onPress={onOpenImage}
          >
            <Icon name="camera-outline" size={20} color={colors.appblack} />
          </Pressable>
          <Image
            source={{
              uri: selectedImage.length !== 0 ? selectedImage : dummyProfileUrl
            }}
            style={{ height: 110, width: 110, borderRadius: 55 }}
          />
        </View>
      </Box>
      <Box ph={20} pv={20}>
        <Input
          label="User Name"
          value={name}
          onChangeText={setName}
          error={nameError}
        />
      </Box>
      <Box style={styles.button}>
        <PrimaryButton label="Update" />
      </Box>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1
  },
  header: {
    marginTop:
      Platform.OS === "ios" ? pixelSizeVertical(50) : pixelSizeVertical(20),
    paddingHorizontal: pixelSizeHorizontal(20)
  },
  button: {
    paddingHorizontal: wp(5),
    marginTop: 100,
    paddingBottom: hp(5)
  }
})
