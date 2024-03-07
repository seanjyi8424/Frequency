import React from 'react';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name ="Chatrooms" 
          options={{ 
            headerShown: true, 
            headerStyle: {
              backgroundColor: '#f4511e',
            }, 
          }}/>
        <Tabs.Screen name="Favorite" />
        <Tabs.Screen name="Music" />
        <Tabs.Screen name="Artists" />
        <Tabs.Screen name="Upcoming" />
        <Tabs.Screen name="Live" options={{ href: null }}/>
        <Tabs.Screen name="ComingSoon" options={{ href: null }}/>
    </Tabs>
  );
}