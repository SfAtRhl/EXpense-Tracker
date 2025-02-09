"use client";

import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Button,
  Animated,
} from "react-native";
import type { Expense } from "../types";
import { Picker } from "@react-native-picker/picker";

interface AddExpenseProps {
  onAddExpense: (expense: Expense) => void;
  categories: string[];
}

export default function AddExpense({
  onAddExpense,
  categories,
}: AddExpenseProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Other");

  const [isCollapsed, setIsCollapsed] = useState(false);
  const animatedHeight = useState(new Animated.Value(0))[0];

  const handleAddExpense = () => {
    if (title && amount) {
      const newExpense: Expense = {
        id: Date.now().toString(),
        title,
        amount: Number.parseFloat(amount),
        date: new Date().toISOString(),
        category,
      };
      onAddExpense(newExpense);
      setTitle("");
      setAmount("");
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    Animated.timing(animatedHeight, {
      toValue: isCollapsed ? 0 : 200,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View className="mb-4">
      <TouchableOpacity
        className="p-2 mb-4 rounded-md bg-primary-300"
        onPress={toggleCollapse}
      >
        <Text className="text-center text-md text-accent-100">
          {!isCollapsed ? "Show Form" : "Hide Form"}
        </Text>
      </TouchableOpacity>

      <Animated.View
        style={{
          height: animatedHeight,
          overflow: "hidden",
        }}
      >
        <View className="flex flex-col">
          <TextInput
            className="h-12 px-4 mb-2 border border-gray-300 rounded-md"
            placeholder="Expense title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            className="h-12 px-4 mb-2 border border-gray-300 rounded-md"
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          <View className="mb-2 border border-gray-300 rounded-md">
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              className="h-12 px-4 mb-2 border border-gray-300 rounded-md"
            >
              {categories.map((cat) => (
                <Picker.Item key={cat} label={cat} value={cat} />
              ))}
            </Picker>
          </View>
        </View>
        <TouchableOpacity
          className="w-full py-2 rounded-md shadow-sm bg-primary-300 shadow-zinc-300"
          onPress={handleAddExpense}
        >
          <Text className="font-bold text-center text-md text-accent-100">
            Add Expense
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
