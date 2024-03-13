import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  Actions,
  Avatar,
  Time,
} from 'react-native-gifted-chat';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {
  basecolor,
  white,
  blackopecity,
  dummyimage,
  STATUSBAR_HEIGHT,
  black,
  baseopecity,
  appwhite,
} from '../../Utility/color.js';
import Label from '../../CustomComponent/Label.js';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export function Chat({navigation, route}) {
  const {getParent} = useNavigation();
  const [messages, setMessages] = useState([]);
  const [keyboardOffset, setkeyboardOffset] = useState(-33);
  const [iskeyboardopen, setiskeyboardopen] = useState(false);
  const [deleteicon, setdeleteicon] = useState(false);
  const [messageid, setmessageid] = useState('');
  const userprofile = useSelector(state => state.authReducer.userprofile);
  const {uid, name, avatar, token, userid} = route.params;
  // console.log('route.params', uid, name, avatar, token, userid);
  const isFocused = useIsFocused();
  // console.log(userprofile);
  useFocusEffect(
    React.useCallback(() => {
      getAllMessages();
    }, []),
  );
  useEffect(() => {
    // Fetch user data from an API or database when the screen comes into focus
    if (isFocused) {
      getAllMessages();
    }
  }, [isFocused]);
  useEffect(() => {
    const parent = getParent();
    parent?.setOptions({
      tabBarStyle: {display: 'none'},
    });
    getAllMessages();
    return () => {
      parent?.setOptions({
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          height: Platform.OS === 'android' ? 50 : 80,
          position: 'absolute',
          borderTopWidth: 0,
          bottom: 0,
        },
      });
    };
  }, [isFocused]);
  useFocusEffect(
    React.useCallback(() => {
      getAllMessages();
    }, []),
  );
  useEffect(() => {
    const docid =
      uid > userprofile.User_Firebase_UID
        ? userprofile.User_Firebase_UID + '-' + uid
        : uid + '-' + userprofile.User_Firebase_UID;
    const messageRef = firestore()
      .collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    const unSubscribe = messageRef.onSnapshot(querySnap => {
      const allmsg = querySnap.docs.map(docSanp => {
        const data = docSanp.data();
        if (data.createdAt) {
          return {
            ...docSanp.data(),
            createdAt: docSanp.data().createdAt.toDate(),
          };
        } else {
          return {
            ...docSanp.data(),
            createdAt: new Date(),
          };
        }
      });
      setMessages(allmsg);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const _keyboardDidShow = event => {
    setkeyboardOffset(event.endCoordinates.height);
    setiskeyboardopen(true);
  };

  const _keyboardDidHide = () => {
    setiskeyboardopen(false);
    setkeyboardOffset(-33);
  };
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      _keyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      _keyboardDidHide,
    );

    return () => {
      keyboardDidShowListener, keyboardDidHideListener;
    };
  }, []);
  const onProfile = () => {
    navigation.navigate('ViewProfile', {
      uid: uid,
      name: name,
      avatar: avatar,
      token: token,
      userid: userid,
      count: null,
      email: null,
    });
  };
  const OnMessageDelete = async messageid => {
    const docid =
      uid > userprofile.User_Firebase_UID
        ? userprofile.User_Firebase_UID + '-' + uid
        : uid + '-' + userprofile.User_Firebase_UID;
    console.log(docid);
    await firestore()
      .collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .doc(messageid)
      .delete()
      .then(() => {
        MessageListUpdated(messages);

        setdeleteicon(false);
      })
      .catch(e => console.log('Error deleting posst.', e));
    await getAllMessages();
  };
  const MessageListUpdated = async messages => {
    if (messages && messages[0] && messages[0]._id) {
      console.log('MessageListUpdated messages', messages[0]._id);
      await firestore()
        .collection('messagelist')
        .doc(`${userprofile.User_Firebase_UID}-${uid}`)
        .get()
        .then(async doc => {
          if (doc.exists) {
            await firestore()
              .collection('messagelist')
              .doc(`${userprofile.User_Firebase_UID}-${uid}`)
              .update({
                senderusename: userprofile.User_Name,
                reciverusename: name,
                lastmsg: messages[0].text,
                read: false,
                createdAt: Date.now(),
                sentBy: userprofile.User_Firebase_UID,
                sentTo: uid,
                send: [uid, userprofile.User_Firebase_UID],
                recivertoken: token,
                senddertoken: userprofile.User_Token_val,
                senderavatar: userprofile.User_Image_Path
                  ? userprofile.User_Image_Path
                  : dummyimage,
                reciveravatar: avatar ? avatar : dummyimage,
                senderuserid: userprofile.User_PkeyID,
                reciveruserid: userid,
              })
              .then(() => {
                console.log('chat history updated!');
              });
          } else {
            await firestore()
              .collection('messagelist')
              .doc(`${uid}-${userprofile.User_Firebase_UID}`)
              .update({
                senderusename: userprofile.User_Name,
                reciverusename: name,
                lastmsg: messages[0].text,
                read: false,
                createdAt: Date.now(),
                sentBy: userprofile.User_Firebase_UID,
                sentTo: uid,
                send: [uid, userprofile.User_Firebase_UID],
                senderuserid: userprofile.User_PkeyID,
                reciveruserid: uid,
                recivertoken: token,
                senddertoken: userprofile.User_Token_val,
                senderavatar: userprofile.User_Image_Path
                  ? userprofile.User_Image_Path
                  : dummyimage,
                reciveravatar: avatar ? avatar : dummyimage,
              })
              .then(() => {
                console.log('chat history created!');
              });
          }
        });
    }
  };
  const onSend = async messageArray => {
    console.log('messageArray', messageArray, token);
    var mymsg;
    var msg;

    msg = messageArray[0];
    mymsg = {
      ...msg,
      sentBy: userprofile.User_Firebase_UID,
      sentTo: uid,
      createdAt: new Date(),
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));
    if (token !== '' || token !== undefined) {
      fetch('https://fcm.googleapis.com/fcm/send', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            'key=AAAAiqIyoeg:APA91bE7ZPnqWPZnRpkP648KOt62wTXUsnTUXRKfzjRuk08rucNRUNeKws6mhn7JWKE_SH1lW4r4pj7rGh-WDjyubNrz-TDaJw6FFLVd8ypp0_fUE5aj_Ni9zht6ml84ldfI-GMY9K7c',
        },
        method: 'POST',
        body: JSON.stringify({
          priority: 'high',
          critical: true,
          volume: 1,
          data: {
            title: 'New Message',
            image:
              'https://feelmotifiles.s3.amazonaws.com/feelmoti%2FIMG_0026.PNG',
            message: msg.text,
            _id: userprofile.User_Firebase_UID,
            pushToken: userprofile.User_Token_val,
            name: userprofile.User_Name,
            key1: '2',
          },
          notification: {
            title: userprofile.User_Name,
            body: `sent you a message: ${msg.text}`,
            sound: 'default',
          },
          to: token,
        }),
      })
        .then(res => res.json())
        .then(res => {
          console.log('res>>>>>', token, res);
        })
        .catch(err => {
          console.log('err>>>>>', err);
        });
    }
    const docid =
      uid > userprofile.User_Firebase_UID
        ? userprofile.User_Firebase_UID + '-' + uid
        : uid + '-' + userprofile.User_Firebase_UID;
    await firestore()
      .collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .doc(messageArray[0]._id)
      .set({...mymsg, createdAt: firestore.FieldValue.serverTimestamp()});
    await firestore()
      .collection('messagelist')
      .doc(`${userprofile.User_Firebase_UID}-${uid}`)
      .get()
      .then(async doc => {
        if (doc.exists) {
          await firestore()
            .collection('messagelist')
            .doc(`${userprofile.User_Firebase_UID}-${uid}`)
            .update({
              senderusename: userprofile.User_Name,
              reciverusename: name,
              lastmsg: msg.text,
              read: false,
              createdAt: Date.now(),
              sentBy: userprofile.User_Firebase_UID,
              sentTo: uid,
              send: [uid, userprofile.User_Firebase_UID],
              recivertoken: token,
              senddertoken: userprofile.User_Token_val,
              senderavatar: userprofile.User_Image_Path
                ? userprofile.User_Image_Path
                : dummyimage,
              reciveravatar: avatar ? avatar : dummyimage,
              senderuserid: userprofile.User_PkeyID,
              reciveruserid: userid,
            })
            .then(() => {
              console.log('chat history updated!');
            });
        } else {
          await firestore()
            .collection('messagelist')
            .doc(`${uid}-${userprofile.User_Firebase_UID}`)
            .get()
            .then(async doc => {
              if (doc.exists) {
                await firestore()
                  .collection('messagelist')
                  .doc(`${uid}-${userprofile.User_Firebase_UID}`)
                  .update({
                    senderusename: userprofile.User_Name,
                    reciverusename: name,
                    lastmsg: msg.text,
                    read: false,
                    createdAt: Date.now(),
                    sentBy: userprofile.User_Firebase_UID,
                    sentTo: uid,
                    send: [uid, userprofile.User_Firebase_UID],
                    recivertoken: token,
                    senddertoken: userprofile.User_Token_val,
                    senderavatar: userprofile.User_Image_Path
                      ? userprofile.User_Image_Path
                      : dummyimage,
                    reciveravatar: avatar ? avatar : dummyimage,
                    senderuserid: userprofile.User_PkeyID,
                    reciveruserid: userid,
                  })
                  .then(() => {
                    console.log('chat history updated!');
                  });
              } else {
                await firestore()
                  .collection('messagelist')
                  .doc(`${uid}-${userprofile.User_Firebase_UID}`)
                  .set({
                    senderusename: userprofile.User_Name,
                    reciverusename: name,
                    lastmsg: msg.text,
                    read: false,
                    createdAt: Date.now(),
                    sentBy: userprofile.User_Firebase_UID,
                    sentTo: uid,
                    send: [uid, userprofile.User_Firebase_UID],
                    senderuserid: userprofile.User_PkeyID,
                    reciveruserid: uid,
                    recivertoken: token,
                    senddertoken: userprofile.User_Token_val,
                    senderavatar: userprofile.User_Image_Path
                      ? userprofile.User_Image_Path
                      : dummyimage,
                    reciveravatar: avatar ? avatar : dummyimage,
                  })
                  .then(() => {
                    console.log('chat history created!');
                  });
              }
            });
        }
      });
  };
  const onLongPress = (id, context, message) => {
    if (message.user._id === userprofile.User_Firebase_UID) {
      setdeleteicon(true);
      setmessageid(id);
    }
  };
  const getAllMessages = async () => {
    const docid =
      uid > userprofile.User_Firebase_UID
        ? userprofile.User_Firebase_UID + '-' + uid
        : uid + '-' + userprofile.User_Firebase_UID;
    const querySanp = await firestore()
      .collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .get();
    const allmsg = querySanp.docs.map(docSanp => {
      return {
        ...docSanp.data(),
        createdAt: docSanp.data().createdAt.toDate(),
      };
    });
    querySanp.docs.map((docSanp) => {
      const stringid = uid.toString();
      firestore()
        .collection("chatrooms")
        .doc(docid)
        .collection("messages")
        .get();
      querySanp.docs.map((docSanp) => {
        if (docSanp.data().sentBy === stringid) {
          firestore()
            .collection("chatrooms")
            .doc(docid)
            .collection("messages")
            .doc(docSanp.ref._documentPath._parts[3])
            .update({
              user: {
                _id: uid,
                avatar: avatar,
                name: name,
              },
            });
        } else {
          firestore()
            .collection("chatrooms")
            .doc(docid)
            .collection("messages")
            .doc(docSanp.ref._documentPath._parts[3])
            .update({
              user: {
                _id: userprofile.User_Firebase_UID,
                avatar: userprofile.User_Image_Path,
                name: userprofile.User_Name,
              },
            });
        }
      });
    });
    setMessages(allmsg);
    if (allmsg.length === 0) {
      await firestore()
        .collection('messagelist')
        .doc(`${userprofile.User_Firebase_UID}-${uid}`)
        .get()
        .then(async doc => {
          if (doc.exists) {
            await firestore()
              .collection('messagelist')
              .doc(`${userprofile.User_Firebase_UID}-${uid}`)
              .delete()
              .then(() => {
                console.log('deleting posst.');
              })
              .catch(e => console.log('Error deleting posst.', e));
          } else {
            await firestore()
              .collection('messagelist')
              .doc(`${uid}-${userprofile.User_Firebase_UID}`)
              .delete()
              .then(() => {
                console.log('deleting posst.');
              })
              .catch(e => console.log('Error deleting posst.', e));
          }
        });
    }
  };
  const renderBubble = props => {
    return (
      <View style={{}}>
        {deleteicon && messageid === props.currentMessage._id && (
          <TouchableOpacity
            onPress={() => OnMessageDelete(messageid)}
            style={{alignItems: 'flex-end', top: 20, zIndex: 1}}>
            <AntDesign name="delete" size={20} color={'red'} />
          </TouchableOpacity>
        )}
        <Bubble
          {...props}
          textStyle={{
            right: {
              color: white,
              fontSize: 16,
              fontWeight: '400',
            },
            left: {
              color: white,
              fontSize: 16,
              fontWeight: '400',
            },
          }}
          wrapperStyle={{
            right: {
              backgroundColor: baseopecity,
              right: -40,
              marginTop: 40,
              padding: 10,
              top: -20,
            },
            left: {
              backgroundColor: blackopecity,
              left: -30,
              marginTop: 10,
              padding: 5,
              marginBottom: 40,
            },
          }}
          timeTextStyle={{
            right: {
              fontSize: 14,
              fontWeight: '400',
              color: white,
            },
            left: {
              fontSize: 14,
              fontWeight: '400',
              color: white,
            },
          }}
        />
      </View>
    );
  };
  const renderInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          borderTopWidth: 1.5,
          borderTopColor: blackopecity,
          backgroundColor: black,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
        textInputStyle={{color: white, marginVertical: 5}}
      />
    );
  };
  const renderAvatar = props => {
    return (
      <Avatar
        {...props}
        containerStyle={{
          left: {
            borderWidth: 2,
            borderColor: basecolor,
            borderRadius: 50,
          },
          right: {
            borderWidth: 1.5,
            borderColor: basecolor,
            borderRadius: 50,
          },
        }}
      />
    );
  };

  const renderTime = props => {
    return (
      <Time
        {...props}
        containerStyle={{
          left: {
            position: 'absolute',
            top: 30,
          },
          right: {
            position: 'absolute',
            top: 10,
          },
        }}
      />
    );
  };
  const renderSend = props => {
    return (
      <Send
        {...props}
        containerStyle={{
          borderTopWidth: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          right: 5,
        }}>
        <View
          style={{
            height: 30,
            width: 30,
            borderRadius: 50,
            backgroundColor: basecolor,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Feather name="send" style={{fontSize: 18}} color={white} />
        </View>
      </Send>
    );
  };

  const onPressAvatar = item => {
    if (item._id !== userprofile.User_Firebase_UID)
      navigation.navigate('ViewProfile', {
        uid: uid,
        name: item.name,
        avatar: item.avatar,
        token: token,
        userid: userid,
        count: null,
        email: null,
        chat: true,
      });
  };
  return (
    <ImageBackground style={{flex: 1}} source={require('../../Assets/bg.png')}>
      {/* <StatusBar backgroundColor="transparent" /> */}
      <KeyboardAvoidingView
        style={{
          flex: 1,
          marginHorizontal: 10,
        }}>
        <SafeAreaView
          style={{
            flex: 1,
            marginTop: Platform.OS === 'android' ? STATUSBAR_HEIGHT : 0,
          }}>
          <View style={styles.headermainview}>
            <View style={{width: '30%'}}>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 40,
                  width: 40,
                  borderRadius: 8,
                  backgroundColor: blackopecity,
                }}>
                <AntDesign
                  onPress={() => navigation.goBack()}
                  name={'left'}
                  size={35}
                  color={white}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => onProfile()}
              style={{width: '10%'}}>
              <Image
                resizeMode="stretch"
                style={{height: 40, width: 40, borderRadius: 50}}
                source={{
                  uri: avatar,
                }}
              />
            </TouchableOpacity>
            <View style={{marginLeft: 20}}>
              <Label
                fontSize={22}
                fontWeight="600"
                text={name}
                capital={'capitalize'}
                // lineheight={35}
              />
            </View>
          </View>
          <View
            style={{
              height: iskeyboardopen ? '90%' : '93%',
              marginHorizontal: -10,
            }}>
            <GiftedChat
              messages={messages}
              onSend={text => onSend(text)}
              user={{
                _id: userprofile.User_Firebase_UID,
                name: userprofile.User_Name,
                avatar: userprofile.User_Image_Path
                  ? userprofile.User_Image_Path
                  : dummyimage,
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
              onPressAvatar={avater => onPressAvatar(avater)}
              onLongPress={(context, message) =>
                onLongPress(message._id, context, message)
              }
            />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  headermainview: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
  },
});
