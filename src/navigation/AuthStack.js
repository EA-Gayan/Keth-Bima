import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import HomeScreen from "../screens/HomeScreen";
import { FIREBASE_AUTH } from "../../firebaseInit";
import { onAuthStateChanged } from "@firebase/auth";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import SettingScreen from "../screens/SettingScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
  const [showLogin, setShowLogin] = React.useState(true);

  React.useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        // User is signed in, navigate to Home screen and hide Login screen
        setShowLogin(false);
      } else {
        // User is not signed in, show Login screen
        setShowLogin(true);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Stack.Navigator>
      {showLogin && (
        <>
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
