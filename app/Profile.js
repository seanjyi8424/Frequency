import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { auth, database } from './firebaseConfig'; // Adjust the path as necessary
import { ref, onValue } from 'firebase/database';

const Profile = () => {
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        const user = auth.currentUser;
        if (user) { // Ensure there is a user before attempting to fetch their profile
            // Directly set the email from the user object
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
            <View>
                <Text>Email: {profileData.email}</Text>
                <Text>Username: {profileData.username}</Text>
                {/* Display more profile data here as needed */}
            </View>
        </SafeAreaView>
    );
};

export default Profile;
