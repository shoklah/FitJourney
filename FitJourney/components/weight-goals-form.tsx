import React, { useState } from 'react';
import { StyleSheet, TextInput, Pressable, Text } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { type Goals } from '@/storage/weightGoalsStorage';

type WeightGoalsFormProps = {
  initialGoals?: Goals;
  onSubmit: (goals: Goals) => void | Promise<void>;
  submitButtonText?: string;
};

export function WeightGoalsForm({ 
  initialGoals, 
  onSubmit, 
  submitButtonText = 'Save' 
}: WeightGoalsFormProps) {
  const [startingWeightText, setStartingWeightText] = useState(
    initialGoals?.startingWeight?.toString() ?? ''
  );
  const [goalWeightText, setGoalWeightText] = useState(
    initialGoals?.goalWeight?.toString() ?? ''
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const startingWeight = parseFloat(startingWeightText.replace(',', '.'));
    const goalWeight = parseFloat(goalWeightText.replace(',', '.'));

    if (isNaN(startingWeight) || startingWeight <= 0) {
      setError('Please enter a valid starting weight greater than 0.');
      return;
    }

    if (isNaN(goalWeight) || goalWeight <= 0) {
      setError('Please enter a valid goal weight greater than 0.');
      return;
    }

    setError(null);
    await onSubmit({ startingWeight, goalWeight });
  };

  return (
    <>
      <ThemedText style={styles.label}>Starting Weight (kg)</ThemedText>
      <TextInput
        style={styles.input}
        keyboardType="decimal-pad"
        placeholder="Enter starting weight"
        value={startingWeightText}
        onChangeText={setStartingWeightText}
      />

      <ThemedText style={styles.label}>Goal Weight (kg)</ThemedText>
      <TextInput
        style={styles.input}
        keyboardType="decimal-pad"
        placeholder="Enter goal weight"
        value={goalWeightText}
        onChangeText={setGoalWeightText}
      />

      {!!error && <Text style={styles.error}>{error}</Text>}

      <Pressable style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>{submitButtonText}</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  error: {
    color: '#d33',
    marginTop: 8,
    marginBottom: 8,
  },
  btn: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
