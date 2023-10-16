import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../assets/constants/Colors";
import { FIREBASE_AUTH } from "../../firebaseInit";
import { createUserWithEmailAndPassword } from "@firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, sethidePassword] = useState(true);
  const [username, setUserName] = useState("");
  const auth = FIREBASE_AUTH;

  const register = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update the user's display name with the provided username
      await updateProfile(auth.currentUser, { displayName: username });

      // Create a combined object with response and username
      const registrationData = {
        response: response,
        username: username,
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
      <LinearGradient
        colors={["#FFFEFE", "#FFFEFE", "#99ff99"]}
        style={{ width: "100%", height: "100%" }}
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
            onPress={() => register()}
            activeOpacity={0.8}
            style={{
              width: "100%",
              paddingVertical: 14,
              paddingHorizontal: 20,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f3d69a",
              borderRadius: 10,
              elevation: 8,
              shadowColor: Colors.accent,
            }}
          >
            <Text>Register</Text>
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
              marginTop: 20,
            }}
          />
          <Text
            style={{
              fontSize: 14,
              opacity: 0.4,
              marginHorizontal: 18,
              marginTop: 20,
            }}
          >
            Or continue With
          </Text>
          <LinearGradient
            colors={["#000000", "#000000", "#000090"]}
            style={{
              flex: 1,
              paddingVertical: 1.0,
              marginTop: 20,
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
        >
          <LogInWithIcon
            iconName="logo-google"
            onPress={() => console.log("google")}
            buttonTitle="Google"
          />
        </View>
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
              {" "}
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
      </LinearGradient>
    </SafeAreaView>
  );
};

export default RegisterScreen;
