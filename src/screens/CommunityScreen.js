import React, { useState, useEffect, useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import CustomListItem from "../components/CutomListItem";
import { app } from "../../firebaseInit";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const CommunityScreen = ({ navigation }) => {
  const currentUser = app.auth().currentUser;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = app
      .firestore()
      .collection("messages")
      .doc(getChatRoomId(currentUser.uid, userId))
      .collection("chats")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            _id: doc.id,
            text: data.text,
            createdAt: data.createdAt.toDate(),
            user: {
              _id: data.user._id,
              name: data.user.name,
              avatar: data.user.avatar,
            },
            image: data.image,
          };
        });
        setMessages(messages);
      });

    return () => {
      unsubscribe();
    };
  }, [currentUser.uid, userId]);

  const getChatRoomId = (userId1, userId2) => {
    return userId1 < userId2
      ? `${userId1}-${userId2}`
      : `${userId2}-${userId1}`;
  };

  const handleSend = async (newMessages) => {
    const text = newMessages[0].text;
    const image = newMessages[0].image;
    const createdAt = newMessages[0].createdAt;

    const chatRoomId = getChatRoomId(currentUser.uid, userId);

    await app
      .firestore()
      .collection("messages")
      .doc(chatRoomId)
      .collection("chats")
      .add({
        text,
        image,
        createdAt: app.firestore.FieldValue.serverTimestamp(),
        user: {
          _id: currentUser.uid,
          name: currentUser.displayName,
          avatar: currentUser.photoURL,
        },
      });
  };

  const handleUploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = app.storage().ref();
    const imageRef = storageRef.child(
      `images/${currentUser.uid}/${Date.now()}`
    );
    await imageRef.put(blob);
    const imageUrl = await imageRef.getDownloadURL();
    return imageUrl;
  };

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={handleSend}
//       user={{
//         _id: currentUser.uid,
//         name: currentUser.displayName,
//         avatar: currentUser.photoURL,
//       }}
//       onInputTextChanged={(text) => setTypingText(text)}
//       renderActions={(props) => (
//         <TouchableOpacity onPress={handleChooseImage}>
//           <Ionicons name="ios-camera" size={28} color="#666" />
//         </TouchableOpacity>
//       )}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     height: "100%",
//     backgroundColor: "#24222F",
//   },
//   buttonAddChat: {
//     height: 50,
//     width: 50,
//     backgroundColor: "#1D51EF",
//     position: "absolute",
//     bottom: 40,
//     right: 15,
//     borderRadius: 50,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonAddChatText: {
//     fontSize: 30,
//     color: "#fff",
//   },
// });
}
export default CommunityScreen;
