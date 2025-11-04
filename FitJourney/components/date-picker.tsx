import React, { useState } from 'react'
import { Button, Platform, View, Text } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

export function CustomDatePicker() {
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setDate(currentDate)
  }

  return (
    <View>
      <Button title="Select Date" onPress={() => setShow(true)} />
      <Text style={{ marginTop: 10 }}>Selected: {date.toLocaleDateString()}</Text>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS !== 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
        />
      )}
    </View>
  )
}