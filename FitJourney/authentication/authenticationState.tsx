import React, { useState, useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import auth, { getAuth, onAuthStateChanged, FirebaseAuthTypes } from '@react-native-firebase/auth';
import { getApp, initializeApp } from '@react-native-firebase/app';

function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // Handle user state changes
  function handleAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  
  if (Platform.OS === 'web') {

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
    const firebaseConfig = {
      apiKey: "AIzaSyBYwVXZZE5DiOOCxfMktgUvwP6IwRaAykk",
      authDomain: "fitjourney-at2023.firebaseapp.com",
      projectId: "fitjourney-at2023",
      storageBucket: "fitjourney-at2023.firebasestorage.app",
      messagingSenderId: "1182679697",
      appId: "1:1182679697:web:65ba706dbfa1691d7cf530",
      measurementId: "G-MJV87XYTQZ"
    };

    const app = initializeApp(firebaseConfig);
  };

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
}

export default App;
