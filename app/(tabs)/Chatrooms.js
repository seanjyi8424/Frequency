import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Live from './Live';
import ComingSoon from './ComingSoon';

import { Ionicons } from '@expo/vector-icons'; // npm install @expo/vector-icons 


const Tab = createMaterialTopTabNavigator();

export default function ChatRooms() {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate('Profile')}
      >
        <Ionicons name="person-circle" size={30} color="#8F929C"/>
      </TouchableOpacity>
      <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle:{backgroundColor: '#090A0C', borderTopWidth: 2, borderTopColor: '#202427'}, tabBarActiveTintColor: '#cf5906' }}>
        <Tab.Screen name="Live" component={Live} />
        <Tab.Screen name="ComingSoon" component={ComingSoon} />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  profileButton: {
    position: 'absolute',
    top: 10, // Adjust based on your UI needs
    right: 10,
    zIndex: 10,
  },
});
