import React, {useState} from 'react';
import { TextInput, type TextInputProps, Button } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { CustomDatePicker } from './date-picker';

export type InputFieldProps = {
    label: string;
    type: 'text' | 'numeric' | 'date';
    placeholder: string;
};

export type InputFormProps = TextInputProps & {
    fields: InputFieldProps[];
    onSubmit?: (values: { weight?: number; date?: Date }) => void;
    onCancel?: () => void;
};

export function InputForm({fields, onSubmit, onCancel}: InputFormProps) {
    const [weightText, setWeightText] = useState('');
    const [date, setDate] = useState<Date>(new Date());
    const [error, setError] = useState<string | null>(null);

    const handleSave = () => {
        const hasWeight = fields.some(f => f.type === 'numeric');
        if (hasWeight) {
          const n = parseFloat(weightText.replace(',', '.'));
          if (isNaN(n) || n <= 0) {
            setError('Please enter a valid number.');
            return;
          }
          setError(null);
          onSubmit?.({ weight: n, date });
          return;
        }
        onSubmit?.({ date });
      };

    const handleCancel = () => {
        setError(null);
        onCancel?.();
    };

    return (
        <View>
        {fields.map((field, index) => (
            <View key={index} style={styles.field}>
            <Text style={styles.label}>{field.label}</Text>

            {field.type === 'date' ? (
                <CustomDatePicker value={date} onChange={setDate} />
            ) : (
                <TextInput
                style={[styles.input, error && styles.inputError]}
                keyboardType={field.type === 'numeric' ? 'decimal-pad' : 'default'}
                placeholder={field.placeholder}
                value={weightText}
                onChangeText={setWeightText}
                />
            )}
            </View>
        ))}

        {error ? <Text style={styles.error}>{error}</Text> : null}

         <View style={styles.actions}>
            <Button title="Cancel" onPress={handleCancel} />
            <Button title="Save" onPress={handleSave} />
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
  field: { marginBottom: 16 },
  label: { fontSize: 16, fontWeight: '500', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10 },
  inputError: { borderColor: '#d33' },
  error: { color: '#d33', marginBottom: 8 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 8 },
});
