import { View, Text } from "react-native";
import React, { useContext } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import GlobalContext from "../../contexts/GlobalContext";
import { deleteUserToken } from "../../utils/localStorage";

export default function Subscription() {
  const { setAuthenticated } = useContext(GlobalContext);

  function onLogout() {
    setAuthenticated(false);
    deleteUserToken();
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Work in Progress</Text>
      <PrimaryButton label="Log out" onPress={onLogout} />
    </View>
  );
}
