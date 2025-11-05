import React, {useState} from 'react';
import { TextInput, type TextInputProps, Button } from 'react-native';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import DateField from '@/components/date-field';

export type InputFieldProps = {
  label: string;
  type: 'text' | 'numeric' | 'date';
  placeholder?: string;
};

export type InputFormProps = {
  fields: InputFieldProps[];
  onSubmit?: (values: { weight?: number; date?: Date }) => void;
  onCancel?: () => void;
};

export function InputForm({ fields, onSubmit, onCancel }: InputFormProps) {
  const [weightText, setWeightText] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    const includesWeight = fields.some(f => f.type === 'numeric');
    const result: { weight?: number; date?: Date } = { date };

    if (includesWeight) {
      const parsed = parseFloat(weightText.replace(',', '.'));
      if (isNaN(parsed) || parsed <= 0) {
        setError('Please enter a valid number greater than 0.');
        return;
      }
      result.weight = parsed;
    }

    setError(null);
    onSubmit?.(result);
  };

  const handleCancel = () => {
    setError(null);
    onCancel?.();
  };

  return (
    <View>
      {fields.map((field, idx) => (
        <View key={`${field.label}-${idx}`} style={styles.field}>
          {field.type !== 'date' && <Text style={styles.label}>{field.label}</Text>}

          {field.type === 'date' ? (
            <DateField
              label={undefined}
              value={date}
              onChange={setDate}
              placeholder={field.placeholder ?? 'Select date'}
            />
          ) : (
            <TextInput
              style={[styles.input, error && field.type === 'numeric' && styles.inputError]}
              keyboardType={field.type === 'numeric' ? 'decimal-pad' : 'default'}
              inputMode={field.type === 'numeric' ? 'decimal' : 'text'}
              placeholder={field.placeholder}
              value={weightText}
              onChangeText={setWeightText}
              returnKeyType="done"
            />
          )}
        </View>
      ))}

      {!!error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.actions}>
            <Pressable style={[styles.btn, styles.btnGhost]} onPress={handleCancel}>
               <Text style={[styles.btnText, styles.btnGhostText]}>Cancel</Text>
            </Pressable>

            <Pressable style={[styles.btn, styles.btnPrimary]} onPress={handleSave}>
               <Text style={[styles.btnText, styles.btnPrimaryText]}>Save</Text>
            </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: { marginBottom: 16 },
  label: { fontSize: 16, fontWeight: '500', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  inputError: { borderColor: '#d33' },
  error: { color: '#d33', marginBottom: 8 },
    actions: {
      marginTop: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 12,
    },

    btn: {
      minWidth: 120,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 10,
      alignItems: 'center',
    },
    btnText: { fontSize: 16, fontWeight: '700' },

    btnPrimary: { backgroundColor: '#2F80ED' },
    btnPrimaryText: { color: '#fff' },

    btnGhost: {
      backgroundColor: '#fff',
      borderWidth: 2,
      borderColor: '#2F80ED',
    },
    btnGhostText: { color: '#2F80ED' },
});
