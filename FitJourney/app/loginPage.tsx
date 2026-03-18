import LoginForm from "@/components/login-form";
import { ThemedView } from "@/components/themed-view";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "@react-native-firebase/auth";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = async (values: Record<string, any>) => {
    const { username, password } = values;
    try {
      await signInWithEmailAndPassword(getAuth(), username, password);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: "Login" }} />
      <ThemedView>
        <LoginForm
          title="Login to FitJourney"
          fields={[
            { name: "username", label: "Username", type: "text" },
            { name: "password", label: "Password", type: "password" },
          ]}
          onSubmit={handleLogin}
        ></LoginForm>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { textAlign: "center", marginBottom: 30 },
});
