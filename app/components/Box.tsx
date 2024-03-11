import React, { useMemo } from "react";
import { View, ViewProps } from "react-native";
import { BoxProps } from "../types/propTypes";

export default function Box({
  children,
  mv,
  justifyContent,
  alignItems,
  alignSelf,
  flexDirection,
  pv,
  ph,
  mt,
  mb,
  ...props
}: BoxProps & ViewProps) {
  const height = useMemo(() => {
    return props.height;
  }, [props.height]);

  return (
    <View
      style={[
        {
          height,
          marginVertical: mv,
          justifyContent,
          alignItems,
          alignSelf,
          flexDirection,
          paddingVertical: pv,
          paddingHorizontal: ph,
          marginTop: mt,
          marginBottom: mb,
        },
        props.style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
