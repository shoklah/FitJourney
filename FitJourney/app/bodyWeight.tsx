import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Stack } from 'expo-router';
import { InputForm } from '@/components/input-form';

export default function BodyWeightScreen() {
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerBackTitle: 'Back' }} />
      <InputForm labels={['Weight (kg)', 'Height (cm)']} />
      <ThemedText type="title">Body Weight</ThemedText>
      <ThemedText>Your body weight content will go here.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
