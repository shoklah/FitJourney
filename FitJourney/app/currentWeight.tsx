import { StyleSheet, View, Button } from "react-native";
import React, { useState } from "react";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Stack, useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { readEntries, clearEntries, appendEntry } from "@/storage/weightStorage";
import { getGoals, saveGoals, clearGoals, type Goals } from "@/storage/weightGoalsStorage";
import { InputForm } from "@/components/input-form";

export default function CurrentBodyWeight() {
  const router = useRouter();
  const [currentWeight, setCurrentWeight] = useState<number | null>(null);
  const [previousWeight, setPreviousWeight] = useState<number | null>(null);
  const [showGoalsForm, setShowGoalsForm] = useState(false);
  const [goals, setGoals] = useState<Goals>({
    startingWeight: null,
    goalWeight: null
  });

  useFocusEffect(
    React.useCallback(() => {
      loadWeightData();
    }, [])
  );

  async function loadWeightData() {
    // Uncomment these two lines to reset data during testing
    //  await clearEntries();
    // await clearGoals();

    const entries = await readEntries();
    const loadedGoals = await getGoals();

    setGoals(loadedGoals);

    if (loadedGoals.startingWeight === null || loadedGoals.goalWeight === null) {
      setShowGoalsForm(true);
      return;
    }

    if (entries.length > 0) {
      setCurrentWeight(entries[0].weight);
      if (entries.length > 1) {
        setPreviousWeight(entries[1].weight);
      }
    }
  }

  const handleGoalsSubmit = async (values: Record<string, any>) => {
    const newGoals: Goals = {
      startingWeight: values.startingWeight,
      goalWeight: values.goalWeight
    };
    
    await saveGoals(newGoals);
    setGoals(newGoals);
    
    const entries = await readEntries();
    if (entries.length === 0 && newGoals.startingWeight) {
      await appendEntry({
        weight: newGoals.startingWeight,
        date: new Date().toISOString()
      });
    }
    
    setShowGoalsForm(false);
    router.push('/currentWeight');
  };

  const weightChange =
    currentWeight && previousWeight ? currentWeight - previousWeight : 0;

  if (showGoalsForm) {
    return (
      <ThemedView style={styles.container}>
        <Stack.Screen options={{ headerBackTitle: "Back", title: "Set Your Goals" }} />
        <ThemedText type="title" style={styles.title}>
          First, let's set your goals
        </ThemedText>
        <InputForm
          fields={[
            {
              name: "startingWeight",
              label: "Starting Weight (kg)",
              type: "numeric",
              placeholder: "Enter starting weight",
            },
            {
              name: "goalWeight",
              label: "Goal Weight (kg)",
              type: "numeric",
              placeholder: "Enter goal weight",
            },
          ]}
          onSubmit={handleGoalsSubmit}
          submitButtonText="Continue"
          showCancelButton={false}
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerBackTitle: "Back" }} />

      <ThemedText type="subtitle">Current</ThemedText>
      <ThemedText type="title">{currentWeight || "--"} kg</ThemedText>

      <ThemedText
        style={[
          styles.change,
          { color: weightChange <= 0 ? "#4CAF50" : "#FF0000" },
        ]}
      >
        {weightChange < 0 ? "↓" : "↑"} {Math.abs(weightChange).toFixed(1)} kg
      </ThemedText>

      <View style={styles.labelsRow}>
        <ThemedText>Starting: {goals.startingWeight ?? '--'} kg</ThemedText>
        <ThemedText>Goal: {goals.goalWeight ?? '--'} kg</ThemedText>
      </View>

      <Button title="Update" onPress={() => router.push("/bodyWeight")} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  change: {
    fontSize: 16,
  },
  labelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});
