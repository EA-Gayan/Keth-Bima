import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // You may need to import the correct icon library based on your project setup
import { FIREBASE_AUTH } from '../../firebaseInit';
import { LinearGradient } from 'expo-linear-gradient'

const ProfileScreen = ({ navigation }) => {
  const auth = FIREBASE_AUTH;
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate('Onboarding'); // Navigate to the login screen after logout
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LinearGradient
      colors={['#FFFEFE', '#99ff99', '#FFFEFE']}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <View style={styles.profileCard}>
        
        <View style={styles.header}>
          <Ionicons name="person-circle-outline" size={120} color="#007acc" />
          <Text style={styles.username}>{user.displayName}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailText}>Username: {user.displayName}</Text>
          <Text style={styles.detailText}>Email: {user.email}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 4,
  },
  header: {
    alignItems: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  details: {
    marginTop: 20,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ProfileScreen;
