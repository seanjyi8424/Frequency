import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, Link } from 'expo-router';

const Homepage = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ paddingHorizontal: 25 }}>
                <Text style={{
                    textAlign: 'center',
                    fontFamily: 'RMMedium',
                    fontSize: 28, fontWeight: '500',
                    color: '#333', marginBottom: 30,
                }}>
                    Welcome!
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.replace('TabsRedirect')}
                    style={{
                        backgroundColor: '#AD40AF',
                        padding: 20,
                        borderRadius: 10,
                        marginBottom: 30
                    }}>
                    <Text style={{
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: 16,
                        color: '#fff'
                    }}>
                        Spotify Rankings
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Homepage;
