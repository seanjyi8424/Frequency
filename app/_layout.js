import { Stack } from 'expo-router';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const Layout = () => {
    const [fontsLoaded] = useFonts({
        RMMedium: require('../assets/fonts/Roboto-Medium.ttf'),
        RMBold: require('../assets/fonts/Roboto-Bold.ttf')
    })

    const onLayoutRootView = useCallback(async () => {
        if(fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded])

    if(!fontsLoaded) return null;

    return <Stack 
        screenOptions={{
            headerShown: false
        }}
        onLayout={onLayoutRootView}
    />;
}

export default Layout;