import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  SafeAreaView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../assets/constants/Colors";
import { collection, addDoc } from "firebase/firestore";
import { DB, FIREBASE_AUTH } from "../../firebaseInit";
import { createUserWithEmailAndPassword } from "@firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, sethidePassword] = useState(true);
  const [username, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const auth = FIREBASE_AUTH;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const register = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const other = addDoc(collection(DB, "users"), {
        displayName: username,
        profileImage: image,
      });
      const registrationData = {
        response: response,
        other: other,
      };

      console.log(registrationData);

      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

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

        <Text
          style={{
            textAlign: "center",
            marginVertical: 20,
            fontSize: 28,
            color: "#000000",
            marginTop: 115,
            fontWeight: "500",
            letterSpacing: 2,
          }}
        >
          Register Here!
        </Text>
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
              marginTop: 100,
            }}
          >
            <View
              style={{
                width: "100%",
                marginBottom: 20,
              }}
            >
              <TextInput
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUserName(text)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  fontSize: 14,
                  color: "#000000",
                  borderRadius: 20,
                  borderColor: "darkgray",
                  borderWidth: 2,
                }}
              />
            </View>
            <TextInput
              placeholder="Email"
              value={email}
              keyboardType="email-address"
              onChangeText={(e) => setEmail(e)}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                fontSize: 14,
                color: "#000000",
                borderRadius: 20,
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
                placeholder="Password"
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
            onPress={() => pickImage()}
            activeOpacity={0.8}
            style={{
              width: "100%",
              marginTop: 20,
              paddingVertical: 14,
              paddingHorizontal: 20,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#009272",
              borderRadius: 15,
              elevation: 8,
              shadowColor: Colors.accent,
            }}
          >
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />
            ) : (
              <Text style={{ color: "white" }}>
                Choose profile photo (optional)
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => register()}
            activeOpacity={0.8}
            style={{
              width: "100%",
              marginTop: 20,
              paddingVertical: 14,
              paddingHorizontal: 20,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#009272",
              borderRadius: 15,
              elevation: 8,
              shadowColor: Colors.accent,
            }}
          >
            <Text style={{ color: "white" }}>Register</Text>
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
              marginTop: 30,
            }}
          />
          <Text
            style={{
              fontSize: 14,
              opacity: 0.4,
              marginHorizontal: 18,
              marginTop: 30,
            }}
          >
            Or continue With
          </Text>
          <LinearGradient
            colors={["#000000", "#000000", "#000090"]}
            style={{
              flex: 1,
              paddingVertical: 1.0,
              marginTop: 30,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: 20,
            marginBottom: 25,
          }}
        ></View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Login")}
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
            Already a member ?
            <Text
              style={{
                color: Colors.accent,
              }}
            >
              Login Now
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

export default RegisterScreen;
