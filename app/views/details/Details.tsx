import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import Box from "../../components/Box";
import CustomText from "../../components/CustomText";
import CustomHeader from "../../components/CustomHeader";

export default function Details() {
  return (
    <SafeAreaView style={{ flex: 1, flexGrow: 1 }}>
      <Box>
        <CustomHeader
          title="Product Details"
          iconName="heart-outline"
          isDetail
          back
        />
        <ScrollView>
          <CustomText>Hello</CustomText>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
}
