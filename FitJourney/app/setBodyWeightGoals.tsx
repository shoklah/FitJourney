import { StyleSheet } from "react-native";
import React from "react";
import { ThemedView } from "@/components/themed-view";
import { Stack, useRouter } from "expo-router";
import GeneralGoalForm, { GeneralGoalConfig } from "@/components/general-goal-form";

export const weightGoalConfig: GeneralGoalConfig = {
    title: "Set your weight goal",
    fields: [
        {
          name: "goalWeight",
          label: "Goal Weight (kg)",
          type: "numeric",
          placeholder: " ",
          category: 'weight',
          key: 'goalWeight'
        },
        {
          name: "currentWeight",
          label: "Current Weight (kg)",
          type: "numeric",
          placeholder: " ",
          category: 'weight',
          key: 'currentWeight'
        }
        // Add date field for target date if needed
    ],
    route: './setCaloriesGoals'
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
        options={{ headerBackTitle: "Back", title: "Weight Goals" }}
      />
      <ThemedView>
        <GeneralGoalForm
          goals={weightGoalConfig}
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
