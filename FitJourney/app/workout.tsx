import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function WorkoutScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Workouts</ThemedText>
      <ThemedText>Your workout content will go here.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
