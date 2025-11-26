import { StyleSheet, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Stack, useRouter } from "expo-router";
import { getGoals, saveGoals, type Data } from "@/storage/storage";
import { InputForm } from "@/components/input-form";
import GeneralGoalForm, { GeneralGoalConfig } from "@/components/general-goal-form";
import { View } from "react-native/Libraries/Components/View/View";

export const weightGoalConfig: GeneralGoalConfig = {
    title: "Set your weight goal",
    fields: [
        {
            name: "goalWeight",
            label: "Goal Weight (kg)",
            type: "numeric",
            placeholder: " ",
        },
        {
            name: "currentWeight",
            label: "Current Weight (kg)",
            type: "numeric",
            placeholder: " ",
        }
        // Add date field for target date if needed
    ]
};


export default function SetYourGoalsScreen() {
  const router = useRouter();
  // const [currentGoals, setCurrentGoals] = useState<Goals>({
  //   goalWeight: null,
  //   goalCalories: null,
  //   goalWorkoutsPerWeek: null,
  // });

  // useEffect(() => {
  //   loadGoals();
  // }, []);

  // const loadGoals = async () => {
  //   const goals = await getGoals();
  //   setCurrentGoals(goals);
  // };

  const handleSubmit = async (values: Record<string, any>) => {
    const newGoals: Data = {
      goals: {
        weight: {
          goalWeight: values.goalWeight,
          currentWeight: values.currentWeight,
        }
      }
    };
    await saveGoals(newGoals);
    Alert.alert("Success", "Goals updated!");
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{ headerBackTitle: "Back", title: "Weight Goals" }}
      />
      <ThemedView>
        <GeneralGoalForm
          goals={weightGoalConfig}
          onSubmit={handleSubmit}
        >
        </GeneralGoalForm>        
      </ThemedView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { textAlign: "center", marginBottom: 30 },
});
