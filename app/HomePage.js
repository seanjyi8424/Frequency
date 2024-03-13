import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';

const backgroundImage = require('../assets/images/concert.jpeg'); // New image for backdrop

const Homepage = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
                <View style={styles.overlay}> {/* Adding an overlay to ensure text readability */}
                    <View style={styles.contentView}>
                        <Text style={styles.title}>Explore Fresh Beats,</Text>
                        <Text style={styles.title}>Curate Your Music Collections.</Text>
                        <Text style={styles.subtitle}>Connect and vibe with your music community.</Text>
                        <TouchableOpacity
                            onPress={() => navigation.replace('TabsRedirect')}
                            style={styles.enterButton}>
                            <Text style={styles.enterText}>DIVE INTO THE SOUND</Text>
                        </TouchableOpacity>
                    </View>
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
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.45)', // Overlay color to make the text more legible
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentView: {
        paddingHorizontal: 30,
        alignItems: 'center',      
    },
    title: {
        textAlign: 'center',
        fontFamily: 'AvenirNext-DemiBold', // Professional-looking font
        fontSize: 32, // Larger font size
        color: '#FFFFFF',
        marginBottom: 12,
    },
    subtitle: {
        textAlign: 'center',
        fontFamily: 'AvenirNext-Regular',
        fontSize: 24, // Slightly larger subtitle
        color: '#FFFFFF',
        marginBottom: 20,
    },
    enterButton: {
        backgroundColor: '#cf5906', // A gold color button for a pop of color
        padding: 18,
        borderRadius: 12,
        marginTop: 35, 
    },
    enterText: {
        fontFamily: 'AvenirNext-Bold',
        textAlign: 'center',
        fontSize: 18,
        color: '#000' // Dark text for contrast
    }
});

export default Homepage;
