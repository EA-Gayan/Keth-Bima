import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { DB } from "../../firebaseInit";
import { collection, getDocs } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";

const UserSelectionScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const snapshot = await getDocs(collection(DB, "users"));
      const users = [];
      snapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserSelection = (selectedUser) => {
    navigation.navigate("ChatRoom", { selectedUser });
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="chevron-back" size={32} color="black" />
      </TouchableOpacity>
      <View style={{ alignItems: "center", marginTop: 150 }}>
        <Text style={styles.title}>Chats</Text>
      </View>
      {users.map((user) => (
        <TouchableOpacity
          key={user.id}
          onPress={() => handleUserSelection(user)}
          style={styles.userItem}
        >
          {user.profileImage ? (
            <Image
              source={{ uri: user.profileImage }}
              style={styles.profilePic}
            />
          ) : (
            <Image
              source={require("../../assets/images/chat.png")}
              style={styles.profilePic}
            />
          )}
          <Text style={styles.username}>{user.displayName}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    backgroundColor: "white",
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    position: "absolute",
    top: 50,
    left: 2,
    zIndex: 100,
  },
  title: {
    marginTop: -30,
    fontSize: 22,
    color: "black",
    fontWeight: "bold",
    marginBottom: 30,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    width: "95%",
    marginLeft: 10,
    backgroundColor: "#c1c9b5",
    borderRadius: 15,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
  },
});
export default UserSelectionScreen;
