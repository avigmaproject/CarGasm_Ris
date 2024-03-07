import {
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";

import Box from "../../components/Box";
import Input from "../../components/Input";
import PrimaryButton from "../../components/PrimaryButton";
import { DetailsPageProps } from "../../types/propTypes";
import TabHeader from "./component/TabHeader";

export default function DetailsPage({ navigation }: DetailsPageProps) {
  const [form, setForm] = useState<any>({});
  const { title, price, desc, location, condition } = form;

  const handleOnChangeText = (value: string, fieldName: string) =>
    setForm({ ...form, [fieldName]: value });

  function onCancelTab() {
    console.log("Hello");
    navigation.navigate("HomeStack");
  }

  return (
    <SafeAreaView style={styles.container}>
      <TabHeader
        title="Post Product"
        cancel
        back={false}
        onCancel={onCancelTab}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          scrollEnabled={true}
          style={{ paddingHorizontal: 20, marginTop: 20 }}
        >
          <Box>
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
              input={{ height: 100, paddingTop: 20 }}
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
            <PrimaryButton
              label="Next"
              // onPress={() => navigation.navigate("categories")}
            />
          </Box>
        </ScrollView>
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
