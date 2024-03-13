import { Stack } from 'expo-router';
import React, { useState, useEffect, useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Ensure this path is correct

import HomePage from './HomePage';
import Artists from './(tabs)/Artists'; // Adjust the path as needed
import Chatrooms from './(tabs)/Chatrooms'; // Adjust the path as needed
import Favorite from './(tabs)/Favorite'; // Adjust the path as needed
import Music from './(tabs)/Music'; // Adjust the path as needed
import Upcoming from './(tabs)/Upcoming'; // Adjust the path as needed
import Login from './Login';
import Register from './register';
import Profile from './Profile';

const Layout = () => {
  const [fontsLoaded] = useFonts({
    RMMedium: require('../assets/fonts/Roboto-Medium.ttf'),
    RMBold: require('../assets/fonts/Roboto-Bold.ttf')
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const authUnsubscribe = onAuthStateChanged(auth, setUser);
    return authUnsubscribe;
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && user) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, user]);

  if (!fontsLoaded) {
    return null;
  }

  return (
      <Stack onReady={onLayoutRootView} screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Artists" component={Artists} />
            <Stack.Screen name="Chatrooms" component={Chatrooms} />
            <Stack.Screen name="Favorite" component={Favorite} />
            <Stack.Screen name="Music" component={Music} />
            <Stack.Screen name="Upcoming" component={Upcoming} />
            {/* Additional screens for logged in users can be added here */}
            <Stack.Screen name="Profile" component={Profile} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            {/* Additional authentication screens can be added here */}
          </>
        )}
      </Stack>
  );
};

export default Layout;
