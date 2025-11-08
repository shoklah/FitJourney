import { StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Stack, useRouter } from 'expo-router';
import { getGoals, saveGoals, type Goals } from '@/storage/weightGoalsStorage';
import { InputForm } from '@/components/input-form';

export default function WeightGoalScreen() {
  const router = useRouter();
  const [currentGoals, setCurrentGoals] = useState<Goals>({
    startingWeight: null,
    goalWeight: null
  });

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    const goals = await getGoals();
    setCurrentGoals(goals);
  };

  const handleSubmit = async (values: Record<string, any>) => {
    const newGoals: Goals = {
      startingWeight: values.startingWeight,
      goalWeight: values.goalWeight
    };
    await saveGoals(newGoals);
    Alert.alert('Success', 'Goals updated!');
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerBackTitle: 'Back', title: 'Weight Goals' }} />
      <ThemedText type="title" style={styles.title}>Set Your Goals</ThemedText>
      <InputForm
        fields={[
          {
            name: 'startingWeight',
            label: 'Starting Weight (kg)',
            type: 'numeric',
            placeholder: 'Enter starting weight',
            defaultValue: currentGoals.startingWeight ?? undefined
          },
          {
            name: 'goalWeight',
            label: 'Goal Weight (kg)',
            type: 'numeric',
            placeholder: 'Enter goal weight',
            defaultValue: currentGoals.goalWeight ?? undefined
          }
        ]}
        onSubmit={handleSubmit}
        showCancelButton={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { textAlign: 'center', marginBottom: 30 },
});
