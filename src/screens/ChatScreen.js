import React, { useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { Avatar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { FIREBASE_AUTH, DB } from "../../firebaseInit";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerTitle: () => (
        <Text style={styles.headerTitle}>{route.params.chatName}</Text>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 15 }}
          onPress={navigation.goBack}
        >
          <Ionicons name="chevron-back" size={30} color="#1D51EF" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity>
          <Ionicons
            name="ellipsis-vertical"
            size={20}
            color="#1D51EF"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, messages]);

  const sendMessage = () => {
    Keyboard.dismiss();

    DB.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: new Date(),
      message: input,
      displayName: FIREBASE_AUTH.currentUser.displayName,
      email: FIREBASE_AUTH.currentUser.email,
      photoURL: FIREBASE_AUTH.currentUser.photoURL,
    });

    setInput("");
  };

  useLayoutEffect(() => {
    const unsubscribe = DB.collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    return unsubscribe;
  }, [route]);

  return (
    <>
      <StatusBar style="light" />

      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {messages.map(({ id, data }) =>
                data.email === FIREBASE_AUTH.currentUser.email ? (
                  <View key={id} style={styles.reciever}>
                    <Text style={styles.recieverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View style={styles.containerSender}>
                    <Avatar rounded size={30} source={{ uri: data.photoURL }} />

                    <View key={id} style={styles.sender}>
                      <Text style={styles.senderText}>{data.message}</Text>
                    </View>
                  </View>
                )
              )}
            </ScrollView>

            <View style={styles.footer}>
              <TextInput
                placeholder="Message"
                style={styles.textInput}
                value={input}
                onChangeText={(text) => setInput(text)}
                placeholderTextColor="gray"
              />

              <TouchableOpacity
                style={styles.buttonSendMessage}
                activeOpacity={0.5}
                onPress={sendMessage}
              >
                <Ionicons name="send" size={20} color="#1D51EF" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    color: "#C7C6CD",
    fontWeight: "700",
  },
  container: {
    flex: 1,
    backgroundColor: "#24222F",
  },
  reciever: {
    padding: 10,
    backgroundColor: "#1D51EF",
    alignSelf: "flex-end",
    borderRadius: 6,
    marginRight: 15,
    marginBottom: 5,
    maxWidth: "80%",
    position: "relative",
  },
  recieverText: {
    color: "#C7C6CD",
    fontWeight: "500",
  },
  containerSender: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginLeft: 15,
  },
  sender: {
    padding: 10,

    backgroundColor: "#312E3E",
    alignSelf: "flex-start",
    borderRadius: 6,
    marginLeft: 5,
    maxWidth: "80%",
    position: "relative",
  },
  senderText: {
    color: "#C7C6CD",
    fontWeight: "500",
  },
  senderName: {
    fontSize: 10,
    color: "white",
  },
  buttonSendMessage: {
    backgroundColor: "#1D1B25",
    width: 40,
    height: 40,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 45,
    flex: 1,
    marginRight: 8,
    borderColor: "transparent",
    backgroundColor: "#1D1B25",
    borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 6,
  },
});
export default ChatScreen;
