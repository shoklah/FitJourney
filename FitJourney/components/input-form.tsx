import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, type TextInputProps } from 'react-native';
import { View, Text } from 'react-native';

export type InputFieldProps = {
    label: string;
    type: 'text'
};

export type InputFormProps = TextInputProps & {
    fields: InputFieldProps[];
};



export function InputForm({fields}: InputFormProps) {
    let inputElements = fields.map((field, index) => (
        <View key={index}>
            <Text>{field.label}</Text>
            <TextInput 
                style={styles.input} 
                inputMode={field.type} 
            />
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
