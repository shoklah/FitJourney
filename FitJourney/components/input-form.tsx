import React from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { CustomDatePicker } from './date-picker';

export type InputFieldProps = {
    label: string;
    type: 'text' | 'numeric' | 'date';
    placeholder: string;
};

export type InputFormProps = TextInputProps & {
    fields: InputFieldProps[];
};



export function InputForm({fields}: InputFormProps) {
    let inputElements = fields.map((field, index) => (
        <View key={index}>
            <Text>{field.label}</Text>
             {field.type === 'date' ? (
                <CustomDatePicker />
            ) : (
                <TextInput 
                    style={styles.input} 
                    inputMode={field.type === 'numeric' ? 'numeric' : 'text'}
                    placeholder={field.placeholder} 
                />
            )}
        </View>
    ));
  return (
    <View>
      {inputElements}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
