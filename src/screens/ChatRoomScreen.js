import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ChatRoomScreen = ({ route }) => {
  const { selectedUser } = route.params;

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
      {/* Add your chat components here */}
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
});

export default ChatRoomScreen;
