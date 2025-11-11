import React, {useState} from 'react';
import { TextInput } from 'react-native';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import DateField from '@/components/date-field';

export type InputFieldConfig = {
  name: string;
  label: string;
  type: 'text' | 'numeric' | 'date';
  placeholder?: string;
  defaultValue?: string | number | Date;
};

export type InputFormProps = {
  fields: InputFieldConfig[];
  onSubmit?: (values: Record<string, any>) => void | Promise<void>;
  onCancel?: () => void;
  submitButtonText?: string;
  showCancelButton?: boolean;
};

export function InputForm({ 
  fields, 
  onSubmit, 
  onCancel,
  submitButtonText = 'Save',
  showCancelButton = true 
}: InputFormProps) {
  const [values, setValues] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    fields.forEach(field => {
      if (field.type === 'date') {
        initial[field.name] = field.defaultValue instanceof Date ? field.defaultValue : new Date();
      } else {
        initial[field.name] = field.defaultValue?.toString() ?? '';
      }
    });
    return initial;
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (fieldName: string, value: any) => {
    setValues(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleSave = async () => {
    const result: Record<string, any> = {};
    
    for (const field of fields) {
      const value = values[field.name];
      
      if (field.type === 'numeric') {
        const parsed = parseFloat(value.toString().replace(',', '.'));
        if (isNaN(parsed) || parsed <= 0) {
          setError(`Please enter a valid ${field.label.toLowerCase()} greater than 0.`);
          return;
        }
        result[field.name] = parsed;
      } else if (field.type === 'date') {
        result[field.name] = value;
      } else {
        result[field.name] = value;
      }
    }

    setError(null);
    await onSubmit?.(result);
  };

  const handleCancel = () => {
    setError(null);
    onCancel?.();
  };

  return (
    <View>
      {fields.map((field, idx) => (
        <View key={`${field.name}-${idx}`} style={styles.field}>
          {field.type !== 'date' && <Text style={styles.label}>{field.label}</Text>}

          {field.type === 'date' ? (
            <DateField
              label={undefined}
              value={values[field.name]}
              onChange={(date) => handleChange(field.name, date)}
              placeholder={field.placeholder ?? 'Select date'}
            />
          ) : (
            <TextInput
              style={[styles.input, error && field.type === 'numeric' && styles.inputError]}
              keyboardType={field.type === 'numeric' ? 'decimal-pad' : 'default'}
              inputMode={field.type === 'numeric' ? 'decimal' : 'text'}
              placeholder={field.placeholder}
              value={values[field.name]?.toString() ?? ''}
              onChangeText={(text) => handleChange(field.name, text)}
              returnKeyType="done"
            />
          )}
        </View>
      ))}

      {!!error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.actions}>
        {showCancelButton && (
          <Pressable style={[styles.btn, styles.btnGhost]} onPress={handleCancel}>
            <Text style={[styles.btnText, styles.btnGhostText]}>Cancel</Text>
          </Pressable>
        )}

        <Pressable style={[styles.btn, styles.btnPrimary]} onPress={handleSave}>
          <Text style={[styles.btnText, styles.btnPrimaryText]}>{submitButtonText}</Text>
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
