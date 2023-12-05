import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { DB, FIREBASE_AUTH } from "../../firebaseInit";
import { collection, getDocs } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { generateChatRoomId } from "../components/utils";
import { translation } from "../lang_model/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserSelectionScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLang, setSelectedLang] = useState(0);

  useEffect(() => {
    getLang();
  }, []);
  const getLang = async () => {
    setSelectedLang(parseInt(await AsyncStorage.getItem("LANG")));
  };

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
      setError("Error fetching users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserSelection = async (selectedUser) => {
    const chatRoomId = generateChatRoomId(
      FIREBASE_AUTH.currentUser.uid,
      selectedUser.id
    );
    navigation.navigate("ChatRoom", {
      selectedUser,
      chatRoomId,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#000" />}
      {!loading && !error && (
        <>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={32} color="black" />
          </TouchableOpacity>
          <View style={{ alignItems: "center", marginTop: 150 }}>
            <Text style={styles.title}>
              {" "}
              {selectedLang == 0
                ? translation[84].English
                : selectedLang == 1
                ? translation[84].Sinhala
                : null}
            </Text>
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
        </>
      )}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default UserSelectionScreen;
