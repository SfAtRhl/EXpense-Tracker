"use client";

import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function FilterComponent({ onFilter, categories }) {
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
  });
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleFilter = () => {
    onFilter({ category, startDate, endDate });
  };

  return (
    <View className="p-4 mb-4 bg-white rounded-md">
      <Text className="mb-2 text-lg font-bold">Filters</Text>
      <View className="mb-2">
        <Text>Category:</Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="All Categories" value="" />
          {categories.map((cat) => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>
      <View className="mb-2">
        <Text>Start Date:</Text>
        <TouchableOpacity onPress={() => setShowStartPicker(true)}>
          <Text>{startDate.toDateString()}</Text>
        </TouchableOpacity>
        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowStartPicker(false);
              if (selectedDate) setStartDate(selectedDate);
            }}
          />
        )}
      </View>
      <View className="mb-4">
        <Text>End Date:</Text>
        <TouchableOpacity onPress={() => setShowEndPicker(true)}>
          <Text>{endDate.toDateString()}</Text>
        </TouchableOpacity>
        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowEndPicker(false);
              if (selectedDate) setEndDate(selectedDate);
            }}
          />
        )}
      </View>
      <TouchableOpacity
        className="p-2 rounded-md bg-primary-300"
        onPress={handleFilter}
      >
        <Text className="text-center text-white">Apply Filters</Text>
      </TouchableOpacity>
    </View>
  );
}
