import {
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  ScrollView,
  StyleSheet
} from "react-native"
import React, { useContext, useState, useEffect } from "react"

import Box from "../../components/Box"
import Input from "../../components/Input"
import PrimaryButton from "../../components/PrimaryButton"
import { DetailsPageProps } from "../../types/propTypes"
import TabHeader from "./component/TabHeader"
import { ProductContext } from "../../contexts/ProductTabContext"
import CustomAlertBox from "../../components/CustomAlertBox"

export default function DetailsPage({ navigation }: DetailsPageProps) {
  const {
    title,
    setTitle,
    price,
    setPrice,
    description,
    setDescription,
    location,
    setLocation,
    condition,
    setCondition,
    setBrand,
    setCateg,
    setSubCateg,
    setProductImage
  } = useContext(ProductContext)
  const [errors, setErrors] = useState<DetailsErrors>()
  const [showAlertBox, setShowAlertBox] = useState(false)

  function onCancelTab() {
    setShowAlertBox(true)
  }

  function onCloseAlertBox() {
    setShowAlertBox(false)
  }

  function validateInputs() {
    const tempErrors: DetailsErrors = {}
    if (title.length === 0) {
      tempErrors.titleError = "Enter a valid title"
    }
    if (price.length === 0) {
      tempErrors.priceError = "Select a valid price"
    }
    if (description.length === 0) {
      tempErrors.descError = "Select a valid description"
    }
    if (location.length === 0) {
      tempErrors.locationError = "Select a valid location"
    }
    if (condition.length === 0) {
      tempErrors.conditionError = "Select a valid condition"
    }
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }
  useEffect(() => {
    setBrand("")
    setTitle("")
    setDescription("")
    setPrice("")
    setCateg("")
    setSubCateg("")
    setLocation("")
    setCondition("")
    setProductImage([])
  }, [])

  const onNext = () => {
    const isValid = validateInputs()
    if (isValid) {
      navigation.navigate("Categories")
    }
  }

  const onCancel = () => {
    onCloseAlertBox()
  }

  const onSaveDraft = () => {
    onCloseAlertBox()
    navigation.navigate("HomeStack")
  }

  return (
    <SafeAreaView style={styles.container}>
      <TabHeader
        title="Post Product"
        cancel
        back={false}
        onCancel={onCancelTab}
      />
      <CustomAlertBox
        onClose={onCloseAlertBox}
        visible={showAlertBox}
        title="Your Draft, Your Choice"
        buttonLabel1="Save Draft"
        buttonLabel2="Cancel"
        onPressFirstButton={onSaveDraft}
        onPressSecondButton={onCancel}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={{ paddingHorizontal: 20, marginTop: 20, marginBottom: 100 }}
        >
          <Box>
            <Input
              label="Item Title"
              value={title}
              onChangeText={setTitle}
              error={errors?.titleError}
            />
          </Box>
          <Box mt={10}>
            <Input
              label="Item Price"
              value={price}
              onChangeText={setPrice}
              error={errors?.priceError}
              inputMode="numeric"
            />
          </Box>
          <Box mt={10}>
            <Input
              label="Description"
              multiline={true}
              numberOfLines={4}
              input={{ height: 100, paddingTop: 20 }}
              value={description}
              onChangeText={setDescription}
              error={errors?.descError}
            />
          </Box>
          <Box mt={10}>
            <Input
              label="Location"
              value={location}
              onChangeText={setLocation}
              error={errors?.locationError}
            />
          </Box>
          <Box mt={10}>
            <Input
              label="Condition"
              value={condition}
              onChangeText={setCondition}
              error={errors?.conditionError}
            />
          </Box>
          <Box mt={20}>
            <PrimaryButton label="Next" onPress={onNext} />
          </Box>
        </ScrollView>
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
