import { View, Text } from "react-native"
import React, { useState, useEffect } from "react"
import CustomHeader from "../../components/CustomHeader"
import { dummyProfileUrl } from "../../utils/constant"
import { useAppSelector } from "../../utils/hooks"
import { getUserMasterList } from "../../redux/ducks/getUserMasterData"
import { useDispatch } from "react-redux"
import colors from "../../utils/color"
import Feather from "react-native-vector-icons/Feather"
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  Actions,
  Avatar,
  Time
} from "react-native-gifted-chat"
import firestore from "@react-native-firebase/firestore"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Chat({ navigation, ...props }) {
  const dispatch = useDispatch<any>()
  const [detailsData, setDetailsDatae] = useState(
    props.route.params.detailsdata
  )
  const [userData, setUserData] = useState<GET_USER_LIST[]>([])
  const selectUserData = useAppSelector((state) => state.getUserMasterData)
  const [messages, setMessages] = useState([])
  useEffect(() => {
    navigation.addListener("focus", onFocus)
    return () => {
      navigation.removeListener("focus", onFocus)
    }
  }, [])

  function onFocus() {
    dispatch(getUserMasterList(2, 1, 0, "string", 0, 0, "string", 0))
  }

  useEffect(() => {
    if (selectUserData.called) {
      setUserData(selectUserData["0"]["0"]["0"])
    }
  }, [selectUserData])

  const onSend = async (messageArray) => {
    console.log("messageArray", messageArray)
    var mymsg
    var msg

    msg = messageArray[0]
    mymsg = {
      ...msg,
      sentBy: userData.User_Firebase_UID,
      sentTo: detailsData.User_Firebase_UID,
      createdAt: new Date()
    }
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, mymsg)
    )

    const docid =
      detailsData.User_Firebase_UID > userData.User_Firebase_UID
        ? userData.User_Firebase_UID + "-" + detailsData.User_Firebase_UID
        : detailsData.User_Firebase_UID + "-" + userData.User_Firebase_UID
    await firestore()
      .collection("chatrooms")
      .doc(docid)
      .collection("messages")
      .doc(messageArray[0]._id)
      .set({ ...mymsg, createdAt: firestore.FieldValue.serverTimestamp() })
    await firestore()
      .collection("messagelist")
      .doc(`${userData.User_Firebase_UID}-${detailsData.User_Firebase_UID}`)
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          await firestore()
            .collection("messagelist")
            .doc(
              `${userData.User_Firebase_UID}-${detailsData.User_Firebase_UID}`
            )
            .update({
              senderusename: userData.User_Name,
              reciverusename: name,
              lastmsg: msg.text,
              read: false,
              createdAt: Date.now(),
              sentBy: userprofile.User_Firebase_UID,
              sentTo: detailsData.User_Firebase_UID,
              send: [
                detailsData.User_Firebase_UID,
                userprofile.User_Firebase_UID
              ],
              recivertoken: token,
              senddertoken: userprofile.User_Token_val,
              senderavatar: userprofile.User_Image_Path
                ? userprofile.User_Image_Path
                : dummyProfileUrl,
              reciveravatar: avatar ? avatar : dummyProfileUrl,
              senderuserid: userprofile.User_PkeyID,
              reciveruserid: userid
            })
            .then(() => {
              console.log("chat history updated!")
            })
        } else {
          await firestore()
            .collection("messagelist")
            .doc(
              `${detailsData.User_Firebase_UID}-${userprofile.User_Firebase_UID}`
            )
            .get()
            .then(async (doc) => {
              if (doc.exists) {
                await firestore()
                  .collection("messagelist")
                  .doc(
                    `${detailsData.User_Firebase_UID}-${userprofile.User_Firebase_UID}`
                  )
                  .update({
                    senderusename: userprofile.User_Name,
                    reciverusename: name,
                    lastmsg: msg.text,
                    read: false,
                    createdAt: Date.now(),
                    sentBy: userprofile.User_Firebase_UID,
                    sentTo: detailsData.User_Firebase_UID,
                    send: [
                      detailsData.User_Firebase_UID,
                      userprofile.User_Firebase_UID
                    ],
                    recivertoken: token,
                    senddertoken: userprofile.User_Token_val,
                    senderavatar: userprofile.User_Image_Path
                      ? userprofile.User_Image_Path
                      : dummyProfileUrl,
                    reciveravatar: avatar ? avatar : dummyProfileUrl,
                    senderuserid: userprofile.User_PkeyID,
                    reciveruserid: userid
                  })
                  .then(() => {
                    console.log("chat history updated!")
                  })
              } else {
                await firestore()
                  .collection("messagelist")
                  .doc(
                    `${detailsData.User_Firebase_UIDid}-${userprofile.User_Firebase_UID}`
                  )
                  .set({
                    senderusename: userprofile.User_Name,
                    reciverusename: name,
                    lastmsg: msg.text,
                    read: false,
                    createdAt: Date.now(),
                    sentBy: userprofile.User_Firebase_UID,
                    sentTo: detailsData.User_Firebase_UID,
                    send: [
                      detailsData.User_Firebase_UID,
                      userprofile.User_Firebase_UID
                    ],
                    senderuserid: userprofile.User_PkeyID,
                    reciveruserid: detailsData.User_Firebase_UID,
                    recivertoken: token,
                    senddertoken: userprofile.User_Token_val,
                    senderavatar: userprofile.User_Image_Path
                      ? userprofile.User_Image_Path
                      : dummyProfileUrl,
                    reciveravatar: avatar ? avatar : dummyProfileUrl
                  })
                  .then(() => {
                    console.log("chat history created!")
                  })
              }
            })
        }
      })
  }
  const renderBubble = (props) => {
    return (
      <View style={{}}>
        <Bubble
          {...props}
          textStyle={{
            right: {
              color: "#ffff",
              fontSize: 16,
              fontWeight: "400"
            },
            left: {
              color: '#ffff"',
              fontSize: 16,
              fontWeight: "400"
            }
          }}
          wrapperStyle={{
            right: {
              backgroundColor: "#EAE8F4",
              right: -40,
              marginTop: 40,
              padding: 10,
              top: -20
            },
            left: {
              backgroundColor: "#F2F2F2",
              left: -30,
              marginTop: 10,
              padding: 5,
              marginBottom: 40
            }
          }}
          timeTextStyle={{
            right: {
              fontSize: 14,
              fontWeight: "400",
              color: "#171717"
            },
            left: {
              fontSize: 14,
              fontWeight: "400",
              color: "#171717"
            }
          }}
        />
      </View>
    )
  }
  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          borderTopWidth: 1.5,
          borderTopColor: "#fff",
          backgroundColor: "#fff",
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          paddingHorizontal: 20,
          marginBottom: 30
        }}
        textInputStyle={{ color: '#ffff"', marginVertical: 5 }}
      />
    )
  }
  const renderAvatar = (props) => {
    return (
      <Avatar
        {...props}
        containerStyle={{
          left: {
            borderWidth: 2,
            borderColor: colors.secondary,
            borderRadius: 50
          },
          right: {
            borderWidth: 1.5,
            borderColor: colors.secondary,
            borderRadius: 50
          }
        }}
      />
    )
  }

  const renderTime = (props) => {
    return (
      <Time
        {...props}
        containerStyle={{
          left: {
            position: "absolute",
            top: 30
          },
          right: {
            position: "absolute",
            top: 10
          }
        }}
      />
    )
  }
  const renderSend = (props) => {
    return (
      <Send
        {...props}
        containerStyle={{
          borderTopWidth: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
          right: 5
        }}
      >
        <View
          style={{
            height: 30,
            width: 30,
            borderRadius: 50,
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Feather name="send" style={{ fontSize: 18 }} color={"white"} />
        </View>
      </Send>
    )
  }

  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <CustomHeader
        title={detailsData.User_Name}
        iconName="cog-outline"
        back
        ischat
        userimg={
          detailsData.User_Image_Path
            ? detailsData.User_Image_Path
            : dummyProfileUrl
        }
        ischaticon
      />
      <View
        style={{
          height: "90%",
          marginHorizontal: -10
        }}
      >
        <GiftedChat
          messages={messages}
          onSend={(text) => onSend(text)}
          user={{
            _id: userData.User_Firebase_UID,
            name: userData.User_Name,
            avatar: userData.User_Image_Path
              ? userData.User_Image_Path
              : dummyProfileUrl
          }}
          renderUsernameOnMessage={true}
          showUserAvatar={true}
          renderAvatarOnTop={true}
          showAvatarForEveryMessage={true}
          keyboardShouldPersistTaps="always"
          renderBubble={renderBubble}
          renderSend={renderSend}
          renderInputToolbar={renderInputToolbar}
          renderAvatar={renderAvatar}
          renderTime={renderTime}
        />
      </View>
    </SafeAreaView>
  )
}
