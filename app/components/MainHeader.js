import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Platform
} from "react-native"
import Label from "./Label"
import LinearGradient from "react-native-linear-gradient"
import AntDesign from "react-native-vector-icons/AntDesign"
import { useNavigation } from "@react-navigation/native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import colors from "../utils/color"
import CustomText from "./CustomText"
export default function Header({ title, cancel, back }) {
  const navigation = useNavigation()

  return (
    <LinearGradient
      colors={["rgba(9, 240, 185, 0.5)", "#4E6AFF"]}
      style={styles.header}
    >
      <View>
        {back && (
          <TouchableOpacity style={styles.backButton}>
            <AntDesign
              onPress={() => navigation.goBack()}
              name={"left"}
              size={20}
              color={"#000"}
            />
          </TouchableOpacity>
        )}
      </View>
      <View>
        {title && (
          <CustomText
            fontSize={22}
            lineHeight={27}
            fontFamily="Inter-Bold"
            color={colors.secondary}
          >
            {title}
          </CustomText>
        )}
      </View>
      {/* <Text style={styles.title}>{title}</Text> */}
      <View>
        {cancel && (
          <TouchableOpacity style={styles.cancelButton}>
            <AntDesign
              // onPress={() => navigation.goBack()}
              name={"close"}
              size={30}
              color={"#fff"}
            />
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  )
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    height: "15%"
  },
  backButton: {
    backgroundColor: "#fff",
    height: 30,
    width: 30,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    flex: 1
  },
  cancelButton: {
    padding: 10
  },
  buttonText: {
    color: "#fff"
  }
})
