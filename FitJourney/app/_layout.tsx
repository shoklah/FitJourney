import useAuth from "@/authentication/authenticationState";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);
  const { user, initializing } = useAuth();

  useEffect(() => {
    async function isLoggedIn() {
      if (initializing) {
        return null;
      }

      if (!user) {
        SplashScreen.hide();
        router.navigate("/loginPage");
        return;
      }

      if (user) {
        SplashScreen.hide();
        router.navigate("/setGoalsPage");
        return;
      }
    }

    isLoggedIn();
  }, [user, initializing, router]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, headerBackTitle: "Back" }}
        />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
