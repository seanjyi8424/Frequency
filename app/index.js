import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { View, ActivityIndicator } from 'react-native';

const StartPage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <ActivityIndicator />; // Or some other loading indicator
  }

  if (!user) {
    return <Redirect href="/Login" />;
  } else {
    return <Redirect href="/(tabs)" />; 
  }
};

export default StartPage;
