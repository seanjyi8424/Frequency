import { Stack, useRouting } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import HomePage from './HomePage';
import Artists from './(tabs)/Artists';
import Chatrooms from './(tabs)/Chatrooms';
import Favorite from './(tabs)/Favorite';
import Music from './(tabs)/Music';
import Upcoming from './(tabs)/Upcoming';
import Login from './Login';
import Register from './register';

const Layout = () => {
  const [fontsLoaded] = useFonts({
    RMMedium: require('../assets/fonts/Roboto-Medium.ttf'),
    RMBold: require('../assets/fonts/Roboto-Bold.ttf')
  });

  const [user, setUser] = useState(null);
  const { navigate } = useRouting(); 

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (fontsLoaded) {
        SplashScreen.hideAsync();
      }
    });

    return unsubscribe;
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    // This function can be used if you want to perform actions after layout is done
  }, []);

  if (!fontsLoaded || user === undefined) {
    return null; // Return null while checking authentication status and loading fonts
  }

  if (!user) {
    navigate('/Login'); // Navigate to Login if no user is found
    return null; // Return null to avoid rendering anything else while redirecting
  }

  // When fonts are loaded and a user is logged in, show the main app
  return (
    <Stack onLayout={onLayoutRootView} screenOptions={{ headerShown: false }}>
      {/* Define your Stack.Screen components for tabs and other screens */}
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="Artists" component={Artists} />
      <Stack.Screen name="Chatrooms" component={Chatrooms} />
      <Stack.Screen name="Favorite" component={Favorite} />
      <Stack.Screen name="Music" component={Music} />
      <Stack.Screen name="Upcoming" component={Upcoming} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      {/* Add other screens here as needed */}
    </Stack>
  );
};

export default Layout;
