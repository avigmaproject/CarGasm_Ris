import { View, Text } from "react-native"
import React from "react"
import MessageList from "../../views/chat/MessageList"
import { createStackNavigator } from "@react-navigation/stack"

export default function MessageStack() {
  const MessageStackNav = createStackNavigator()
  return (
    <MessageStackNav.Navigator>
      <MessageStackNav.Screen
        component={MessageList}
        options={() => {
          return {
            headerShown: false
          }
        }}
        name="MessageList"
      />
    </MessageStackNav.Navigator>
  )
}
