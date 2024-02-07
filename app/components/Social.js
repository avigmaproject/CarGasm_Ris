import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import React from "react";
import google from "../assets/images/google.png";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { appleAuth } from "@invertase/react-native-apple-authentication";
export default function Social(props) {
  const [show, setshow] = React.useState(false);

  React.useEffect(() => {
    setshow(true);
  }, []);
  return (      
      <View style={styles.containerIcon}>
        {/* <View style={styles.circle}>
        <MaterialCommunityIcons
          onPress={props.onClickFB}
          name={"facebook"}
          size={35}
          color="#3B5998"
        />
      </View> */}
        <View style={styles.circle}>
          <TouchableOpacity onPress={props.onClickGmail}>
            <Image source={google} style={styles.google} />
          </TouchableOpacity>
        </View>
        {Platform.OS === "ios" && show && (
          <View style={styles.circle}>
            <MaterialCommunityIcons
              onPress={props.onClickApple}
              name={"apple"}
              size={35}
              color="#000"
            />
          </View>
        )}
      </View>
  );
}
const styles = StyleSheet.create({
  containerIcon: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 18,
    alignSelf: "center",
    width: "90%",
  },

  google: {
    width: 34,
    height: 34,
  },
  app: {
    width: 23,
    height: 27,
  },
  circle: {
    backgroundColor: "#fff",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    padding: 10,
  },

});
