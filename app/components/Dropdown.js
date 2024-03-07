import { View, Text, TextInput, TextInputProps, StyleSheet } from "react-native"
import React from "react"
import colors from "../utils/color"
import CustomText from "./CustomText"
import { TextInProps } from "../types/propTypes"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen"

export default function DropDown() {
  const { label, items } = props
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  return (
    <View>
      <CustomText
        color={colors.appblack}
        fontSize={14}
        lineHeight={17}
        fontFamily="Inter-Medium"
      >
        {label}
      </CustomText>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        // placeholder={""}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    height: 50,
    backgroundColor: colors.secondary,
    borderRadius: 8,
    borderColor: "rgba(103, 114, 148, 0.16)",
    marginTop: 10,
    paddingHorizontal: wp("5%"),
    color: "#333B4B",
    fontFamily: "Inter-Medium",
    fontSize: 16
  },
  error: {
    borderColor: "red",
    borderWidth: 1.5
  }
})
