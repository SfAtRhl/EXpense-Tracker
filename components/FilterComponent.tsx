"use client";

import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "@/contexts/ThemeContext";

interface FilterComponentProps {
  onFilter: (filter: {
    category?: string;
    startDate?: string;
    endDate?: string;
  }) => void;
  categories: string[];
}

export default function FilterComponent({
  onFilter,
  categories,
}: FilterComponentProps) {
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
  });
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const { isDarkMode } = useTheme();

  const handleFilter = () => {
    onFilter({
      category,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
  };

  return (
    <View
      className={`p-4 mb-4 rounded-md ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <Text
        className={`mb-2 text-lg font-bold ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Filters
      </Text>
      <View className="mb-2">
        <Text className={isDarkMode ? "text-white" : "text-black"}>
          Category:
        </Text>
        <View
          className={`border rounded-md ${
            isDarkMode ? "border-gray-600" : "border-gray-300"
          }`}
        >
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={{ color: isDarkMode ? "white" : "black", height: 30 }}
            dropdownIconColor={isDarkMode ? "white" : "black"}
          >
            <Picker.Item label="All Categories" value="" color={"black"} />
            {categories.map((cat: any) => (
              <Picker.Item key={cat} label={cat} value={cat} color={"black"} />
            ))}
          </Picker>
        </View>
      </View>
      <View className="mb-2">
        <Text className={isDarkMode ? "text-white" : "text-black"}>
          Start Date:
        </Text>
        <TouchableOpacity
          onPress={() => setShowStartPicker(true)}
          className={`p-2 border rounded-md ${
            isDarkMode ? "border-gray-600" : "border-gray-300"
          }`}
        >
          <Text className={isDarkMode ? "text-white" : "text-black"}>
            {startDate.toDateString()}
          </Text>
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
            textColor={isDarkMode ? "white" : "black"}
          />
        )}
      </View>
      <View className="mb-4">
        <Text className={isDarkMode ? "text-white" : "text-black"}>
          End Date:
        </Text>
        <TouchableOpacity
          onPress={() => setShowEndPicker(true)}
          className={`p-2 border rounded-md ${
            isDarkMode ? "border-gray-600" : "border-gray-300"
          }`}
        >
          <Text className={isDarkMode ? "text-white" : "text-black"}>
            {endDate.toDateString()}
          </Text>
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
            textColor={isDarkMode ? "white" : "black"}
          />
        )}
      </View>
      <TouchableOpacity
        className={`p-2 rounded-md ${
          isDarkMode ? "bg-blue-700" : "bg-blue-500"
        }`}
        onPress={handleFilter}
      >
        <Text className="text-center text-white">Apply Filters</Text>
      </TouchableOpacity>
    </View>
  );
}
