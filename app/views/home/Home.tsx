import { View, Text } from "react-native";
import React, { useContext } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import GlobalContext from "../../contexts/GlobalContext";
import { deleteUserToken } from "../../utils/localStorage";

export default function Home() {
  const { setAuthenticated } = useContext(GlobalContext);

  const onLogout = () => {
    setAuthenticated(false);
    deleteUserToken();
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontWeight: "600", color: "black", fontSize: 20 }}>
        Under Construction
      </Text>
      <PrimaryButton label="Log Out" varient="Secondary" onPress={onLogout} />
    </View>
  );
}
