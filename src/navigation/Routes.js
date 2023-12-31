import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthStack from "./AuthStack";
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import { Ionicons } from "react-native-vector-icons";
import ModelScreen from "../screens/ModelScreen";
import HarvestScreen from "../screens/HarvestScreen";
import BarChartScreen from "../screens/BarChartScreen";
import WeatherScreen from "../screens/WeatherScreen";
import DiseaseListScreen from "../screens/DiseaseListScreen";
import DiseaseDetailedScreen from "../screens/DiseaseDetailedScreen";
import LeafBlight from "../screens/DiseaseScreens/LeafBlight";
import Hispa from "../screens/DiseaseScreens/Hispa";
import LeafBlast from "../screens/DiseaseScreens/LeafBlast";
import Healthy from "../screens/DiseaseScreens/Healthy";
import LeafScald from "../screens/DiseaseScreens/LeafScald";
import BrownSpot from "../screens/DiseaseScreens/BrownSpot";
import UserSelectionScreen from "../screens/UserSelectionScreen";
import AddChatScreen from "../screens/AddChatScreen";
import PredScreen from "../screens/PredScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";

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
  DiseaseList: "leaf-outline",
};

const HomeTabScreen = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: () => (
          <Ionicons name={tabBarIcons.Home} color={"#0f801b"} size={25} />
        ),
        headerShown: false,
      }}
    />
    {/* <Tab.Screen
      name="Diseases"
      component={DiseaseListScreen}
      options={{
        tabBarIcon: () => (
          <Ionicons
            name={tabBarIcons.DiseaseList}
            color={"#0f801b"}
            size={25}
          />
        ),
        headerShown: false,
      }}
    /> */}
    <Tab.Screen
      name="Profile"
      component={SettingScreen}
      options={{
        tabBarIcon: () => (
          <Ionicons name={tabBarIcons.Profile} color={"#0f801b"} size={25} />
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
        name="PredScreen"
        component={PredScreen}
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
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Weather"
        component={WeatherScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailedScreen"
        component={DiseaseDetailedScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Hispa"
        component={Hispa}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LeafBlight"
        component={LeafBlight}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LeafBlast"
        component={LeafBlast}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LeafScald"
        component={LeafScald}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Healthy"
        component={Healthy}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BrownSpot"
        component={BrownSpot}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserSelection"
        component={UserSelectionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddChat"
        component={AddChatScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
