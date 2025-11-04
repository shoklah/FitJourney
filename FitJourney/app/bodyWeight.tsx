import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Stack } from 'expo-router';
import { InputForm } from '@/components/input-form';

export default function BodyWeightScreen() {
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerBackTitle: 'Back' }} />
      <ThemedText type="title" style={styles.title}>Edit Weight</ThemedText>
      <InputForm fields={[{label: 'Weight (kg)', type: 'numeric', placeholder: 'Enter weight'}, {label: 'Date', type: 'date', placeholder: 'Select date'}]} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
});
