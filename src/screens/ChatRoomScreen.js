import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { DB } from "../../firebaseInit";

const ChatRoomScreen = ({ route }) => {
  const { selectedUser } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(DB, "chatRooms", chatRoomId, "messages"),
      (querySnapshot) => {
        const messagesData = [];
        querySnapshot.forEach((doc) => {
          messagesData.push({ id: doc.id, ...doc.data() });
        });
        setMessages(messagesData);
      }
    );

    return () => unsubscribe();
  }, [chatRoomId]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== "" || image) {
      await addDoc(collection(DB, "chatRooms", chatRoomId, "messages"), {
        text: inputMessage,
        image: image,
        sender: "user",
      });
      setInputMessage("");
      setImage(null);
    }
  };
  const handleImagePick = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userDetails}>
        <Text style={styles.username}>{selectedUser.displayName}</Text>
        {selectedUser.profileImage && (
          <Image
            source={{ uri: selectedUser.profileImage }}
            style={styles.profilePic}
          />
        )}
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={
              item.sender === "user" ? styles.userMessage : styles.otherMessage
            }
          >
            {item.text && <Text>{item.text}</Text>}
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.messageImage} />
            )}
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputMessage}
          onChangeText={(text) => setInputMessage(text)}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity onPress={handleImagePick}>
          <Ionicons
            name="images"
            size={24}
            color="green"
            style={styles.imageIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSendMessage}>
          <Ionicons
            name="send"
            size={24}
            color="green"
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginTop: 65,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userMessage: {
    backgroundColor: "#DCF8C5",
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    alignSelf: "flex-end",
  },
  otherMessage: {
    backgroundColor: "#E0E0E0",
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  messageImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginTop: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "black",
    borderWidth: 1.5,
    borderRadius: 8,
    marginLeft: 1,
    paddingHorizontal: 8,
  },
  imageIcon: {
    marginLeft: 8,
  },
  sendIcon: {
    marginLeft: 8,
  },
});

export default ChatRoomScreen;
