import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import type { WeightEntry } from '@/storage/weightFileStorage';

type Props = {
  entries: WeightEntry[];
  unit?: 'kg' | 'lb';
};

export default function WeightHistory({ entries, unit = 'kg' }: Props) {
  if (!entries?.length) {
    return <ThemedText style={{ marginTop: 16, opacity: 0.6 }}>No entries yet.</ThemedText>;
  }

  return (
    <FlatList
      data={entries}
      keyExtractor={(item, idx) => `${item.date}-${idx}`}
      contentContainerStyle={{ paddingTop: 8 }}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <ThemedText style={styles.date}>
            {new Date(item.date).toLocaleDateString()}
          </ThemedText>
          <ThemedText style={styles.weight}>
            {item.weight} {unit}
          </ThemedText>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e6e6e6',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: { fontSize: 14, opacity: 0.8 },
  weight: { fontSize: 16, fontWeight: '600' },
});
