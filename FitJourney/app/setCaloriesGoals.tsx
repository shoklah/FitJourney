import { StyleSheet, Alert } from "react-native";
import React from "react";
import { ThemedView } from "@/components/themed-view";
import { Stack, useRouter } from "expo-router";
import { saveGoals, type Data } from "@/storage/storage";
import GeneralGoalForm, { GeneralGoalConfig } from "@/components/general-goal-form";

export const calorieGoalConfig: GeneralGoalConfig = {
    title: "Set your calories goal",
    fields: [
        {
            name: "goalCalories",
            label: "Goal Calories (kcal)",
            type: "numeric",
            placeholder: " ",
            category: 'calories',
            key: 'goalCalories'
        },
        {
            name: "proteinIntake",
            label: "Protein Intake (g)",
            type: "numeric",
            placeholder: " ",
            category: 'calories',
            key: 'proteinIntake'
        },
        {
            name: "fatIntake",
            label: "Fat Intake (g)",
            type: "numeric",
            placeholder: " ",
            category: 'calories',
            key: 'fatIntake'
        },
        {
            name: "carbIntake",
            label: "Carbohydrate Intake (g)",
            type: "numeric",
            placeholder: " ",
            category: 'calories',
            key: 'carbIntake'
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
        options={{ headerBackTitle: "Back", title: "Calorie Goals" }}
      />
      <ThemedView>
        <GeneralGoalForm
          goals={calorieGoalConfig}
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
