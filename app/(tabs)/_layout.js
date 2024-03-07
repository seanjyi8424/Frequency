import React from 'react';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="Chatrooms" />
        <Tabs.Screen name="Favorite" />
        <Tabs.Screen name="Music" />
        <Tabs.Screen name="Artists" />
        <Tabs.Screen name="Upcoming" />
    </Tabs>
  );
}