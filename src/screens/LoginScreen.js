import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../assets/constants/Colors";
import { FIREBASE_AUTH } from "../../firebaseInit";
import { signInWithEmailAndPassword } from "@firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { translation } from "../lang_model/utils";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, sethidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;
  const provider = new GoogleAuthProvider();

  const [selectedLang, setSelectedLang] = useState(0);
  useEffect(() => {
    getLang();
  }, []);
  const getLang = async () => {
    setSelectedLang(parseInt(await AsyncStorage.getItem("LANG")));
  };

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      // console.log(response);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      const email = error.customData?.email; // Use optional chaining
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    }
  };

  //common component changes
  const LogInWithIcon = ({ iconName, onPress, buttonTitle }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          width: "40%",
          paddingHorizontal: 12,
          paddingVertical: 24,
          backgroundColor: "#caf299",
          borderWidth: 2,
          borderColor: Colors.white,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={onPress}
      >
        <Ionicons
          name={iconName}
          style={{
            fontSize: 26,
            color: Colors.black,
            marginBottom: 4,
          }}
        />
        <Text
          style={{
            fontSize: 14,
            color: Colors.black,
            marginBottom: 4,
          }}
        >
          {buttonTitle}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
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
            left: 10,
            zIndex: 100,
          }}
        >
          <Ionicons name="arrow-back-outline" size={32} color="black" />
        </TouchableOpacity>

        <View style={{ alignItems: "center", marginTop: 150 }}>
          <Image
            source={require("../../assets/images/keth-bima-logo.png")}
            style={{
              width: 250,
              height: 250,
            }}
          />
        </View>
        <View
          style={{
            width: "80%",
            marginLeft: 40,
          }}
        >
          <View
            style={{
              width: "100%",
              marginBottom: 20,
            }}
          >
            <TextInput
              placeholder={
                selectedLang == 0
                  ? translation[4].English
                  : selectedLang == 1
                  ? translation[4].Sinhala
                  : null
              }
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                fontSize: 14,
                color: "#000000",
                borderRadius: 20,
                backgroundColor: Colors.white,
                borderColor: "darkgray",
                borderWidth: 2,
              }}
            />
            {/* {error.email && <Text>{error.email}</Text>} */}
          </View>
          <View
            style={{
              width: "100%",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                borderRadius: 10,
                backgroundColor: Colors.white,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TextInput
                placeholder={
                  selectedLang == 0
                    ? translation[5].English
                    : selectedLang == 1
                    ? translation[5].Sinhala
                    : null
                }
                value={password}
                secureTextEntry={hidePassword ? true : false}
                onChangeText={(e) => setPassword(e)}
                maxLength={8}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  fontSize: 14,
                  color: "#000000",
                  flex: 1,
                  borderRadius: 20,
                  borderColor: "darkgray",
                  borderWidth: 2,
                  marginTop: 10,
                }}
              />
              {password.length > 0 && (
                <TouchableOpacity
                  onPress={() => sethidePassword(!hidePassword)}
                  activeOpacity={0.9}
                  style={{
                    paddingHorizontal: 10,
                    paddingRight: 14,
                  }}
                >
                  <Ionicons
                    name={hidePassword ? "eye-sharp" : "eye-off-sharp"}
                    style={{
                      fontSize: 20,
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>

            {/* {error.password && <Text>{error.password}</Text>} */}
          </View>

          <TouchableOpacity
            onPress={() => signIn()}
            activeOpacity={0.8}
            style={{
              width: "100%",
              paddingVertical: 14,
              paddingHorizontal: 20,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#009272",
              borderRadius: 10,
              elevation: 8,
              shadowColor: Colors.accent,
              marginTop: 30,
            }}
          >
            <Text style={{ color: "white" }}>
              {selectedLang == 0
                ? translation[3].English
                : selectedLang == 1
                ? translation[3].Sinhala
                : null}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LinearGradient
            colors={["#000000", "#000000", "#000090"]}
            style={{
              flex: 1,
              paddingVertical: 1.0,
              marginTop: 60,
            }}
          />
          <Text
            style={{
              fontSize: 14,
              opacity: 0.4,
              marginHorizontal: 18,
              marginTop: 60,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {selectedLang == 0
              ? translation[4].English
              : selectedLang == 1
              ? translation[4].Sinhala
              : null}
          </Text>
          <LinearGradient
            colors={["#000000", "#000000", "#000090"]}
            style={{
              flex: 1,
              paddingVertical: 1.0,
              marginTop: 60,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: 10,
            marginBottom: 25,
          }}
        ></View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("ForgotPassword")}
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: -10,
          }}
        >
          <Text
            style={{
              color: Colors.accent,
              marginTop: 0,
            }}
          >
            {selectedLang == 0
              ? translation[9].English
              : selectedLang == 1
              ? translation[9].Sinhala
              : null}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Register")}
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "400",
              color: Colors.black,
              alignItems: "center",
            }}
          >
            {selectedLang == 0
              ? translation[7].English
              : selectedLang == 1
              ? translation[7].Sinhala
              : null}
            <Text
              style={{
                color: Colors.accent,
                marginTop: 30,
              }}
            >
              {selectedLang == 0
                ? translation[8].English
                : selectedLang == 1
                ? translation[8].Sinhala
                : null}
            </Text>
          </Text>
        </TouchableOpacity>
        <View
          style={{
            height: 60,
            width: "100%",
          }}
        ></View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LoginScreen;
