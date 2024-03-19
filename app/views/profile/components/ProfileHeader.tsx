import { View, StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../../components/CustomText";
import colors from "../../../utils/color";
export default function TabHeader({
  title,
  setting,
  back,
  onBack,
  onCancel,
}: TabHeaderProps) {
  const navigation = useNavigation();
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
      <View>
        {setting && (
          <TouchableOpacity style={styles.settingButton}>
            <AntDesign
              onPress={onCancel}
              name={"setting"}
              size={30}
              color={"#fff"}
            />
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  position: "relative",
    flex: 0.2,
  },
  backButton: {
    backgroundColor: "#fff",
    height: 50,
    width: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    flex: 1,
  },
 settingButton: {
backgroundColor:'rgba(255, 255, 255,0.1)',
 height: 50,
    width: 50,
    padding: 10,
borderRadius:20
  },
  buttonText: {
    color: "#fff",
  },
});
