import { StyleSheet } from "react-native";
import React from "react";
import { ThemedView } from "@/components/themed-view";
import { Stack, useRouter } from "expo-router";
import LoginForm from "@/components/login-form";


export default function LoginScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{ title: "Login" }}
      />
      <ThemedView>
        <LoginForm
            title="Login to FitJourney"
            fields={[
                { name: "username", label: "Username", type: "text" },
                { name: "password", label: "Password", type: "password" },
            ]}
        >
        </LoginForm>        
      </ThemedView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { textAlign: "center", marginBottom: 30 },
});
