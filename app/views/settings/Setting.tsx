import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Box from "../../components/Box";
import CustomText from "../../components/CustomText";
import CustomHeader from "../../components/CustomHeader";
import { ProfileProps } from "../../types/propTypes";
export default function Setting() {
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Setting" iconName="cog-outline" back />
      <ScrollView>
        <Box>
          <CustomText>Hello Rishabh</CustomText>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "#F4F4F4",
  },
});
