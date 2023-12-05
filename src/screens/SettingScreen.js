import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { FIREBASE_AUTH, DB } from "../../firebaseInit";
import { Ionicons } from "@expo/vector-icons";
import LanguageModal from "../lang_model/LanguageModal";
import { translation } from "../lang_model/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation }) => {
  const auth = FIREBASE_AUTH;
  const user = auth.currentUser;
  const [langModalVisible, setLangModalVisible] = useState(false);
  const [selectedLang, setSelectedLang] = useState(0);
  const saveSelectedLang = async (index) => {
    await AsyncStorage.setItem("LANG", index + "");
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate("Onboarding");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ resizeMode: "cover", width: "100%", height: "100%" }}
        source={require("../../assets/images/bg3.jpg")}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: "white",
            width: 40,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 100,
            position: "absolute",
            top: 50,
            left: 2,
            zIndex: 100,
          }}
        >
          <Ionicons name="chevron-back" size={32} color="black" />
        </TouchableOpacity>
        <View style={styles.image9Stack}>
          <ImageBackground
            // source={require("../../assets/images/bg.jpg")}
            resizeMode="cover"
            style={styles.image9}
          >
            <Text style={styles.profile}>Profile</Text>
            <View style={styles.rect5}>
              <View style={styles.image2Row}>
                <Image
                  source={require("../../assets/images/profile.png")}
                  resizeMode="contain"
                  style={styles.image2}
                />
                <View style={styles.bittScottMangetColumn}>
                  <Text style={styles.name}>{user.displayName}</Text>
                  <Text style={styles.email}> {user.email}</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.rect}>
            <TouchableOpacity
              style={styles.rect2}
              onPress={() => {
                setLangModalVisible(!langModalVisible);
              }}
            >
              <View style={styles.image3Row}>
                <Ionicons
                  name="create-outline"
                  size={32}
                  style={{ marginLeft: 10, marginTop: 15 }}
                />
                <Text style={styles.editUserAccount}>
                  {selectedLang == 0
                    ? translation[2].English
                    : selectedLang == 1
                    ? translation[2].Sinhala
                    : null}
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={32}
                  color="black"
                  style={{ marginLeft: 38, marginTop: 15 }}
                />
              </View>
            </TouchableOpacity>
            <LanguageModal
              langModalVisible={langModalVisible}
              setLangModalVisible={setLangModalVisible}
              onSelectLang={(x) => {
                setSelectedLang(x);
                saveSelectedLang(x);
              }}
            />
            <TouchableOpacity style={styles.rect3}>
              <View style={styles.image3Row}>
                <Ionicons
                  name="call-outline"
                  size={32}
                  style={{ marginLeft: 10, marginTop: 15 }}
                />
                <Text style={styles.helpAndSupport}>
                  {selectedLang == 0
                    ? translation[22].English
                    : selectedLang == 1
                    ? translation[22].Sinhala
                    : null}
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={32}
                  color="black"
                  style={{ marginLeft: 40, marginTop: 15 }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rect4} onPress={handleLogout}>
              <View style={styles.image3Row}>
                <Ionicons
                  name="log-out-outline"
                  size={32}
                  style={{ marginLeft: 10, marginTop: 15 }}
                />
                <Text style={styles.logout}>
                  {selectedLang == 0
                    ? translation[23].English
                    : selectedLang == 1
                    ? translation[23].Sinhala
                    : null}
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={32}
                  color="black"
                  style={{ marginLeft: 100, marginTop: 15 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image9: {
    width: 416,
    height: 401,
  },
  profile: {
    color: "black",
    marginTop: 180,
    marginLeft: 183,
    fontSize: 24,
    fontWeight: "bold",
  },
  rect5: {
    width: 247,
    height: 78,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    marginTop: 25,
    marginLeft: 86,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  image2: {
    width: 50,
    height: 50,
    marginTop: 20,
  },
  name: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    color: "black",
    marginTop: 12,
    fontWeight: "bold",
  },
  bittScottMangetColumn: {
    width: 139,
    marginLeft: 13,
    marginBottom: 9,
  },
  image2Row: {
    height: 50,
    flexDirection: "row",
    marginTop: 34,
    marginLeft: 15,
    marginRight: 30,
  },
  rect: {
    marginTop: 380,
    left: 23,
    width: 360,
    height: 438,
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 27,
  },
  rect2: {
    width: 294,
    height: 78,
    backgroundColor: "white",
    borderRadius: 97,
    flexDirection: "row",
    marginTop: 63,
    marginLeft: 36,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },

  editUserAccount: {
    color: "#121212",
    marginLeft: 10,
    marginTop: 22,
    fontSize: 16,
  },
  image6: {
    width: 29,
    height: 58,
    marginLeft: 59,
  },

  rect3: {
    width: 294,
    height: 78,
    backgroundColor: "white",
    borderRadius: 100,
    flexDirection: "row",
    marginTop: 25,
    marginLeft: 38,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },

  helpAndSupport: {
    color: "#121212",
    marginLeft: 12,
    marginTop: 22,
    fontSize: 16,
  },
  image7: {
    width: 29,
    height: 58,
    marginLeft: 58,
  },

  rect4: {
    width: 294,
    height: 78,
    backgroundColor: "white",
    borderRadius: 100,
    flexDirection: "row",
    marginTop: 26,
    marginLeft: 36,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },

  logout: {
    color: "#121212",
    marginLeft: 14,
    marginTop: 20,
    fontSize: 16,
  },
  image8: {
    width: 29,
    height: 58,
    marginLeft: 124,
  },
  image3Row: {
    height: 58,
    flexDirection: "row",
    flex: 1,
    marginRight: 21,
    marginLeft: 26,
    marginTop: 10,
  },
  image9Stack: {
    width: 416,
    height: 745,
    marginTop: -74,
    marginLeft: -23,
  },
});
export default ProfileScreen;
