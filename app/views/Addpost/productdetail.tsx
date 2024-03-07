import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";
import Box from "../../components/Box";
import MainHeader from "../../components/MainHeader";
import Input from "../../components/Input";
import PrimaryButton from "../../components/PrimaryButton";

export default function productdetail({navigation}) {
  const [form, setForm] = useState<any>({});
  const { title, price, desc, location, condition } = form;

  const handleOnChangeText = (value: string, fieldName: string) =>
    setForm({ ...form, [fieldName]: value });

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader title={"product detail"} cancel />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Box height="80%">
          <ScrollView
            keyboardShouldPersistTaps="handled"
            scrollEnabled={true}
            style={{ paddingHorizontal: 20, marginTop: 20 }}
          >
            <Box mt={10}>
              <Input
                label="Item Title"
                value={title}
                onChangeText={(value: string) =>
                  handleOnChangeText(value, "title")
                }
                // error={nameError}
              />
            </Box>
            <Box mt={10}>
              <Input
                label="Item Price"
                value={price}
                onChangeText={(value: string) =>
                  handleOnChangeText(value, "price")
                }
                // error={nameError}
              />
            </Box>
            <Box mt={10}>
              <Input
                label="Description"
                multiline={true}
                numberOfLines={4}
                input={{ height: 150, paddingTop: 20 }}
                value={desc}
                onChangeText={(value: string) =>
                  handleOnChangeText(value, "desc")
                }
              />
            </Box>
            <Box mt={10}>
              <Input
                label="Location"
                value={location}
                onChangeText={(value: string) =>
                  handleOnChangeText(value, "location")
                }
                // error={nameError}
              />
            </Box>
            <Box mt={10}>
              <Input
                label="Condition"
                value={condition}
                onChangeText={(value: string) =>
                  handleOnChangeText(value, "condition")
                }
                // error={nameError}
              />
            </Box>
            <Box mt={20}>
              <PrimaryButton label="Next" onPress={() =>
              navigation.navigate('categories')

            }/>
            </Box>
          </ScrollView>
        </Box>
      </KeyboardAvoidingView>
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
