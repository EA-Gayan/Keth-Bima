import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { FIREBASE_AUTH } from './firebaseInit';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/navigation/Routes';

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      setUser(authUser);
      if (initializing) {
        setInitializing(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (initializing) {
    // Show a loading screen or component while initializing
    return null;
  }

  return (
    <NavigationContainer>
      <Routes user={user} />
    </NavigationContainer>
  );
}

export default App;
