import { StyleSheet, Alert } from "react-native";
import React from "react";
import { ThemedView } from "@/components/themed-view";
import { Stack, useRouter } from "expo-router";
import { saveGoals, type Data } from "@/storage/storage";
import GeneralGoalForm, { GeneralGoalConfig } from "@/components/general-goal-form";
import { readEntries } from "@/storage/weightStorage";

export const workoutsGoalConfig: GeneralGoalConfig = {
    title: "Set your workouts goal",
    fields: [
        {
          name: "workoutsFrequency",
          label: "Workouts Frequency (per week)",
          type: "numeric",
          placeholder: " ",
          category: 'workouts',
          key: 'workoutsFrequency'
        }
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


  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{ headerBackTitle: "Back", title: "Workouts Goals" }}
      />
      <ThemedView>
        <GeneralGoalForm
          goals={workoutsGoalConfig}
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
