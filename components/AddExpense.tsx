"use client";

import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Button } from "react-native";
import type { Expense } from "../types";
import { Picker } from "@react-native-picker/picker";

interface AddExpenseProps {
  onAddExpense: (expense: Expense) => void;
}

const categories = [
  "Food",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Other",
];

export default function AddExpense({ onAddExpense }: AddExpenseProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Other");

  const handleAddExpense = () => {
    if (title && amount) {
      const newExpense: Expense = {
        id: Date.now().toString(),
        title,
        amount: Number.parseFloat(amount),
        date: new Date().toISOString(),
      };
      onAddExpense(newExpense);
      setTitle("");
      setAmount("");
    }
  };

  return (
    <View className="mb-4 ">
      <View className="flex flex-col ">
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
          >
            {categories.map((cat) => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>
        </View>
      </View>
      <TouchableOpacity
        className="w-full py-2 rounded-full shadow-sm bg-primary-300 shadow-zinc-300"
        onPress={handleAddExpense}
      >
        <Text className="text-center text-md font-rubik-medium text-accent-100">
          Add Expense
        </Text>
      </TouchableOpacity>
    </View>
  );
}
