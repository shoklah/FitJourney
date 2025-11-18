import { StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Stack } from 'expo-router';
import { InputForm } from '@/components/input-form';
import WeightHistory from '@/components/weight-history';
import { appendEntry, readEntries, type WeightEntry, getFileUri } from '@/storage/weightStorage';
import CurrentBodyWeight from './currentWeight';

export default function BodyWeightScreen() {
    const [entries, setEntries] = useState<WeightEntry[]>([]);

    const load = async () => setEntries(await readEntries());

    useEffect(() => {
        load();
    }, []);

    const handleSubmit = async (values: Record<string, any>) => {
      if (!values.weight || !values.date) return;

      const entry: WeightEntry = {
        weight: values.weight,
        date: values.date.toISOString(),
      };

    await appendEntry(entry);
    await load();

       Alert.alert('Saved', `Stored to JSON file:\n${getFileUri()}`);
    };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerBackTitle: 'Back' }} />
      <CurrentBodyWeight />
      {/* <ThemedText type="title" style={styles.title}>Edit Weight</ThemedText> */}
      {/* <InputForm 
        fields={[
          { name: 'weight', label: 'Weight (kg)', type: 'numeric', placeholder: 'Enter weight' },
          { name: 'date', label: 'Date', type: 'date', placeholder: 'Select date' }
        ]}
        onSubmit={handleSubmit}
      /> */}
      <ThemedText type="subtitle" style={styles.historyTitle}>History</ThemedText>
      <WeightHistory entries={entries} unit="kg" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { textAlign: 'center', marginBottom: 20 },
  historyTitle: { marginTop: 24, fontWeight: 'bold' },
  entry: { marginTop: 4 },
});
