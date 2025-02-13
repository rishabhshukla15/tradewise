import React, { useEffect } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { useStore } from '../context/useStore';
import { appTheme } from '../styles/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();
  const user = useStore((state) => state.user);

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    
    if (!user && !inAuthGroup) {
      // Redirect to the sign-in page.
      router.replace('/login');
    } else if (user && inAuthGroup) {
      // Redirect to the home page.
      router.replace('/home');
    }
  }, [user, segments]);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={appTheme}>
        <Slot />
      </PaperProvider>
    </SafeAreaProvider>
  );
} 