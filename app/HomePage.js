import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';

const backgroundImage = require('../assets/music4.avif'); // replaceable image

const Homepage = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
                <View style={styles.contentView}>
                    <Text style={styles.title}>Discover new tracks,</Text>
                    <Text style={styles.title}>Save albums and songs you love .</Text>
                    <Text style={styles.subtitle}>Chat and share your tunes with friends.</Text>
                    <TouchableOpacity
                        onPress={() => navigation.replace('TabsRedirect')}
                        style={styles.enterButton}>
                        <Text style={styles.enterText}>FEEL THE MUSIC</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1, // The image will fill the entire space of the container
        width: '100%', // Set width to 100% of the container
        height: '100%', // Set height to 100% of the container
    },
    contentView: {
        
    },
    title: {
        textAlign: 'center',
        fontFamily: 'YourFontFamily', 
    },
    subtitle: {
        textAlign: 'center',
    },
    enterButton: {
        backgroundColor: '#AD40AF', 
    },
    enterText: {
        textAlign: 'center',
    }
});

export default Homepage;
