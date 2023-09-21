import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Import createBottomTabNavigator
import AuthStack from './AuthStack';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import { Ionicons } from 'react-native-vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); // Create a bottom tab navigator

const AuthStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
  </Stack.Navigator>
);

// Define icons for each tab
const tabBarIcons = {
  Home: 'home-outline',
  Profile: 'person-circle-outline',
};
const HomeTabScreen = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" 
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={tabBarIcons.Home} color={color} size={size} />
        ),
      }}/>
    <Tab.Screen name="Settings" 
      component={SettingScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={tabBarIcons.Profile} color={color} size={size} />
        ),
      }}/>
  </Tab.Navigator>
);

const Routes = ({ user }) => {
  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen name="HomeTab" component={HomeTabScreen} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="AuthStackRoot" component={AuthStackScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}

export default Routes;
