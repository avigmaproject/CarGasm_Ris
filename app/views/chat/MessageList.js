import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image
} from "react-native"
import React, { useEffect, useState } from "react"
import AntDesign from "react-native-vector-icons/AntDesign"
import Headerprofile from "../../CustomComponent/Headerprofile"
import {
  basecolor,
  white,
  blackopecity,
  appwhite,
  STATUSBAR_HEIGHT,
  black,
  baseopecity,
  dummyimage
} from "../../Utility/color"
import { SwipeListView } from "react-native-swipe-list-view"
import firestore from "@react-native-firebase/firestore"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import LinearGradient from "react-native-linear-gradient"
import Label from "../../CustomComponent/Label"
import { useDispatch, useSelector } from "react-redux"
import { useFocusEffect } from "@react-navigation/native"
import moment from "moment"
import { Icon } from "native-base"
import { setInitialroute, setInitialName } from "../../store/action/auth/action"
import { ReadNotifyMessage } from "../../store/action/passcode/action"
export default function MessageList({ navigation }) {
  const [loading, setloading] = useState(false)
  const [isview, setisview] = useState(false)
  const [messages, setMessages] = useState([])
  const [count, setcount] = useState(10)
  const [searchtext, setsearchtext] = useState("")
  const [filterdata, setfilterdata] = useState([])
  const [backupdata, setbackupdata] = useState([])

  const dispatch = useDispatch()
  const userprofile = useSelector((state) => state.authReducer.userprofile)
  React.useEffect(() => {
    getAllActiveUsers()
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      getAllActiveUsers()
    }, [])
  )

  const getAllActiveUsers = async () => {
    const userlistref = firestore()
      .collection("messagelist")
      .where("send", "array-contains", userprofile.User_Firebase_UID)
    if (userlistref) {
      userlistref.onSnapshot(async (querySnap) => {
        const getAllMessages = querySnap.docs.map((docSanp) => {
          const data = docSanp.data()
          if (data.read && userprofile.User_Firebase_UID !== data.sentBy) {
            dispatch(ReadNotifyMessage(false))
          }
          return data
        })
        let sorteddata = getAllMessages.sort((a, b) => {
          return b.createdAt - a.createdAt
        })
        setMessages(sorteddata)
        setfilterdata(sorteddata)
        setbackupdata(sorteddata)
      })
    }
  }

  const StartChat = async (item) => {
    await firestore()
      .collection("messagelist")
      .doc(`${userprofile.User_Firebase_UID}-${item.sentBy}`)
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          await firestore()
            .collection("messagelist")
            .doc(`${userprofile.User_Firebase_UID}-${item.sentBy}`)
            .update({
              read: true
            })
            .then(() => {
              console.log("chat history updated!")
            })
        } else {
          await firestore()
            .collection("messagelist")
            .doc(`${item.sentBy}-${userprofile.User_Firebase_UID}`)
            .get()
            .then(async (doc) => {
              if (doc.exists) {
                await firestore()
                  .collection("messagelist")
                  .doc(`${item.sentBy}-${userprofile.User_Firebase_UID}`)
                  .update({
                    read: true
                  })
                  .then(() => {
                    console.log("chat history updated!")
                  })
              }
            })
        }
      })
    getAllActiveUsers()
    //  return 0
    navigation.navigate("Chat", {
      name:
        userprofile.User_Firebase_UID === item.sentBy
          ? item.reciverusename
          : userprofile.User_Firebase_UID === item.sentTo
          ? item.senderusename
          : item.reciverusename,
      uid:
        userprofile.User_Firebase_UID === item.sentBy
          ? item.sentTo
          : userprofile.User_Firebase_UID === item.sentTo
          ? item.sentBy
          : item.sentTo,
      avatar:
        userprofile.User_Firebase_UID === item.sentBy
          ? item.reciveravatar
          : userprofile.User_Firebase_UID === item.sentTo
          ? item.senderavatar
          : item.reciveravatar,
      //  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg",
      token:
        userprofile.User_Firebase_UID === item.sentBy
          ? item.recivertoken
          : userprofile.User_Firebase_UID === item.sentTo
          ? item.senddertoken
          : item.recivertoken,
      userid:
        userprofile.User_Firebase_UID === item.sentBy
          ? item.reciveruserid
          : userprofile.User_Firebase_UID === item.sentTo
          ? item.senderuserid
          : item.reciveruserid
    })
  }
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => StartChat(item)}
        style={{
          flexDirection: "row",
          marginTop: 5,
          height: 80,
          backgroundColor: blackopecity,
          alignItems: "center",
          borderRadius: 5,
          paddingHorizontal: 10
        }}
      >
        <Image
          style={{ height: 50, width: 50, borderRadius: 50 }}
          source={{
            uri:
              userprofile.User_Firebase_UID === item.sentBy
                ? item.reciveravatar
                : userprofile.User_Firebase_UID === item.sentTo
                ? item.senderavatar
                : dummyimage
          }}
        />
        <View style={{ marginLeft: 20, width: "100%" }}>
          <View
            style={{
              width: "75%",
              flexDirection: "row",
              justifyContent: "flex-end",
              position: "absolute"
            }}
          >
            <Label
              fontSize={12}
              // fontWeight="500"
              text={moment(item.createdAt).fromNow()}
              lineheight={20}
              color={appwhite}
            />
          </View>

          <View>
            <Label
              capital={"capitalize"}
              fontSize={18}
              fontWeight="600"
              text={
                userprofile.User_Firebase_UID === item.sentBy
                  ? item.reciverusename
                  : userprofile.User_Firebase_UID === item.sentTo
                  ? item.senderusename
                  : "Unkonw"
              }
              color={appwhite}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                ...styles.boxtext1,
                fontWeight:
                  userprofile.User_Firebase_UID !== item.sentBy && !item.read
                    ? "bold"
                    : "normal",
                color:
                  !item.read && userprofile.User_Firebase_UID !== item.sentBy
                    ? basecolor
                    : white
              }}
            >
              {item.lastmsg}
            </Text>
          </View>
        </View>
        {!item.read && userprofile.User_Firebase_UID !== item.sentBy && (
          <View style={{ position: "absolute", right: 10, bottom: 10 }}>
            <Icon
              as={FontAwesome}
              name="circle"
              style={{ color: basecolor }}
              size={5}
            />
          </View>
        )}
      </TouchableOpacity>
    )
  }
  const searchview = () => {
    setisview(true)
  }
  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          height: 400
        }}
      >
        <Label
          fontSize={18}
          fontWeight="500"
          text={"No Chat"}
          lineheight={20}
          color={appwhite}
        />
      </View>
    )
  }
  const ClearTextBox = () => {
    setsearchtext("")
    setMessages(backupdata)
  }
  const BackArrow = () => {
    setMessages(backupdata)
    setsearchtext("")
    setisview(false)
  }
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../../Assets/bg.png")}
    >
      <SafeAreaView
        style={{
          flex: 1
        }}
      >
        {isview ? (
          <View
            style={{
              height: 45,
              marginTop: 30,
              borderColor: blackopecity,
              marginHorizontal: 10,
              borderRadius: 10,
              borderWidth: 1,
              // width: '100%',
              flexDirection: "row",
              marginBottom: 30
            }}
          >
            <View
              style={{
                width: "10%",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <AntDesign
                onPress={() => BackArrow()}
                name={"arrowleft"}
                size={20}
                color={appwhite}
              />
            </View>
            <View style={{ width: "75%" }}>
              <TextInput
                placeholderTextColor={appwhite}
                placeholder="Search Here"
                style={{
                  height: 48,
                  color: appwhite,
                  marginLeft: 20
                }}
                onChangeText={(text) => searchFilterFunction(text)}
                value={searchtext}
                cursorColor={basecolor}
                clearTextOnFocus={true}
              />
            </View>
            <View
              style={{
                width: "10%",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <AntDesign
                name={"close"}
                size={20}
                color={"#fff"}
                onPress={() => ClearTextBox()}
              />
            </View>
          </View>
        ) : (
          <Headerprofile title={"Chamber"} search searchbtn={searchview} />
        )}

        <View style={{ marginHorizontal: 10, flex: 1, paddingBottom: 10 }}>
          <FlatList
            data={messages}
            renderItem={renderItem}
            ListEmptyComponent={ListEmptyComponent}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  tinyLogo: {
    width: 30,
    height: 30
  }
})
