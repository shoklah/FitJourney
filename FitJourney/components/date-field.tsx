import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

type Props = {
  label?: string;
  value: Date;
  onChange: (d: Date) => void;
  locale?: string;
  placeholder?: string;
};

export default function DateField({
  label = 'Date',
  value,
  onChange,
  locale = 'en-US',
  placeholder = 'Select date',
}: Props) {
  const [open, setOpen] = useState(false);

  const formatted = value
    ? value.toLocaleDateString(locale)
    : placeholder;

  const onAndroidChange = (_: DateTimePickerEvent, selected?: Date) => {
    setOpen(false);
    if (selected) onChange(selected);
  };

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TouchableOpacity style={styles.field} onPress={() => setOpen(true)} activeOpacity={0.8}>
        <Text style={[styles.value, !value && styles.placeholder]}>{formatted}</Text>
      </TouchableOpacity>

      {Platform.OS === 'android' ? (
        open && (
          <DateTimePicker
            value={value || new Date()}
            mode="date"
            display="default"
            onChange={onAndroidChange}
          />
        )
      ) : (
        <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
          <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
            <View style={styles.sheet}>
              <DateTimePicker
                value={value || new Date()}
                mode="date"
                display="inline"
                onChange={(_, d) => d && onChange(d)}
                style={{ alignSelf: 'stretch' }}
              />
              <View style={styles.actions}>
                <Pressable style={[styles.btn, styles.cancel]} onPress={() => setOpen(false)}>
                  <Text style={styles.btnText}>Cancel</Text>
                </Pressable>
                <Pressable style={[styles.btn, styles.save]} onPress={() => setOpen(false)}>
                  <Text style={[styles.btnText, { color: '#fff' }]}>Done</Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: { marginBottom: 6, fontSize: 14, fontWeight: '600', color: '#222' },
  field: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  value: { fontSize: 16, color: '#111' },
  placeholder: { color: '#888' },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    padding: 20,
  },
  sheet: {
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#fff',
    paddingBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    paddingHorizontal: 12,
    paddingTop: 6,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  cancel: { backgroundColor: '#eee' },
  save: { backgroundColor: '#2f80ed' },
  btnText: { fontSize: 15, fontWeight: '600' },
});
