import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthStack from "./AuthStack";
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import { Ionicons } from "react-native-vector-icons";
import ModelScreen from "../screens/ModelScreen";
import HarvestScreen from "../screens/HarvestScreen";
import CommunityScreen from "../screens/CommunityScreen";
import BarChartScreen from "../screens/BarChartScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="AuthStack"
      component={AuthStack}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const tabBarIcons = {
  Home: "home-outline",
  Profile: "person-circle-outline",
};

const HomeTabScreen = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={tabBarIcons.Home} color={color} size={size} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={tabBarIcons.Profile} color={color} size={size} />
        ),
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);

const Routes = ({ user }) => {
  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen
          name="HomeTab"
          component={HomeTabScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="AuthStackRoot"
          component={AuthStackScreen}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen
        name="Model"
        component={ModelScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Harvest"
        component={HarvestScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BarChart"
        component={BarChartScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
