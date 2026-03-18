import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { getUserData, saveUserData } from '@/storage/userDataStorage';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import useAuth from '@/authentication/authenticationState';

export const unstable_settings = {
  anchor: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);
  const { user, initializing } = useAuth();
  

  useEffect(() => {
    // async function isFirstTimeUser() {
    //   try {
    //     var userDataStorage = await getUserData();
    //     if (userDataStorage.firstTimeUser === false) {
    //       SplashScreen.hide();
    //       router.push('/loginPage');
    //       return;
    //     }
    //     userDataStorage.firstTimeUser = false;
    //     await saveUserData(userDataStorage);
    //     SplashScreen.hide();
    //     router.push('/setGoalsPage');
    //   } catch (e) {
    //     console.warn(e);
    //   } finally {
    //     setIsReady(true);
    //   }
    // }

    // isFirstTimeUser();
    async function isFirstTimeUser() {
      if (initializing ) {
        return null;
      }

      if (!user) {
        SplashScreen.hide();
        router.navigate('/loginPage');
        return;
      }

      if (user) {
        SplashScreen.hide();
        router.navigate('/setGoalsPage');
        return;
      }
    }
    
    isFirstTimeUser();
  }, [user]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, headerBackTitle: 'Back' }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
