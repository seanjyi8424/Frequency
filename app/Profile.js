import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { auth, database } from './firebaseConfig'; 
import { ref, onValue } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // install @expo/vector-icons

const Profile = () => {
    const [profileData, setProfileData] = useState({});
    const navigation = useNavigation();

    useEffect(() => {
        const user = auth.currentUser;
        if (user) { // Ensures there is a user before attempting to fetch their profile
            setProfileData(previousData => ({
                ...previousData,
                email: user.email,
            }));

            const userProfileRef = ref(database, 'users/' + user.uid);
            const unsubscribe = onValue(userProfileRef, (snapshot) => {
                if (snapshot.exists()) {
                    // Assuming you're storing other user data in the Realtime Database
                    setProfileData(previousData => ({
                        ...previousData,
                        ...snapshot.val(),
                    }));
                } else {
                    console.log("No user data available in database");
                }
            });
            return () => unsubscribe(); // Detach listener on cleanup
        }
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
                onPress={() => navigation.goBack()} // Navigates back to the previous screen
                style={styles.leaveButton}
            >
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <View>
                <Text>Email: {profileData.email}</Text>
                <Text>Username: {profileData.username}</Text>
                {/* Display more profile data here as needed */}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    leaveButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        padding: 10,
    },
    profileInfo: {
        marginTop: 20, // Adjust spacing based on your design
    },
});

export default Profile;
