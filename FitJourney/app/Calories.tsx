import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function CaloriesTrackerScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Calories Tracker</ThemedText>
      <ThemedText>Your calories tracker content will go here.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
