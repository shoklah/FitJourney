import React, { useState } from 'react'
import { Button, Platform, View, Text } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

type Props = {
    value: Date;
    onChange: (date: Date) => void;
};

export function CustomDatePicker({value, onChange}: Props) {
  const [show, setShow] = useState(false);

  const handleChange = (event: any, selectedDate?: Date) => {
    setShow(Platform.OS === 'ios')
    if(selected) onChange(selected);
  }

  return (
    <View>
      <Button title="Select Date" onPress={() => setShow(true)} />
      <Text style={{ marginTop: 10 }}>Selected: {value.toLocaleDateString()}</Text>
      {show && (
        <DateTimePicker
          value={value}
          mode="date"
          display={Platform.OS !== 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
        />
      )}
    </View>
  )
}