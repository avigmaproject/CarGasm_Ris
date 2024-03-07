import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Dimensions
} from "react-native"
import Box from "../../components/Box"
import MainHeader from "../../components/MainHeader"
import Input from "../../components/Input"
import PrimaryButton from "../../components/PrimaryButton"
import DropDownPicker from "react-native-dropdown-picker"
export default function categories(navigation) {
  return (
    <SafeAreaView style={styles.container}>
      <MainHeader title={"product detail"} back />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Box ph={20}>
          <Box mt={10}>
            <Input
              label="Item Title"
              value={"Auto car"}
              // onChangeText={(value: string) =>
              //   handleOnChangeText(value, "title")
              // }
              // error={nameError}
            />
          </Box>

          <Box mt={20}>
            <PrimaryButton label="Next" />
          </Box>
        </Box>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "#F4F4F4"
  }
})
