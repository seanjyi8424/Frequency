import React from 'react';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="Artists" />
        <Tabs.Screen name="Chatrooms" />
        <Tabs.Screen name="SpotifyRankings" />
        <Tabs.Screen name="Upcoming" />
        <Tabs.Screen name="Beeps" />
    </Tabs>
  );
}