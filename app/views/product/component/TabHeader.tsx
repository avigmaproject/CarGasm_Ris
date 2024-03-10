import { View, StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../../components/CustomText";
import colors from "../../../utils/color";
export default function TabHeader({
  title,
  cancel,
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
              size={17}
              color={colors.appblack}
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
        {cancel && (
          <TouchableOpacity style={styles.cancelButton}>
            <AntDesign
              onPress={onCancel}
              name={"close"}
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
    paddingHorizontal: 15,
    height: "12%",
  },
  backButton: {
    backgroundColor: "#fff",
    height: 30,
    width: 30,
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
  cancelButton: {
    padding: 10,
  },
  buttonText: {
    color: "#fff",
  },
});
