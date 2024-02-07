import { View, Text } from 'react-native'
import React from 'react'

export default function Label(props) {
  return (
    <View>
      <Text
      numberOfLines={props.numberOfLines ? props.numberOfLines : 2}
      onPress={props.onPress}
      ellipsizeMode= {props.ellipsizeMode ? props.ellipsizeMode : "tail"}
      allowFontScaling={false}
      style={{
        color: props.color ? props.color : "black",
        fontSize: props.fontSize,
        fontWeight: props.fontWeight ? props.fontWeight : "normal",
        fontFamily: props.fontFamily
          ?  props.fontFamily
          : "Inter-Regular",
        lineHeight: props.lineheight,
        textAlign: props.textAlign ? props.textAlign : "auto",
        width: props.width ? props.width : null,
        textTransform: props.textTransform ? props.textTransform : null,
        ...props.style
      }}
    >
      {props.label}
    </Text>
    </View>
  )
}