"use client";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FilterComponent from "@/components/FilterComponent";
import { calculateTotal } from "@/utils/calculations";
import { useTheme } from "@/contexts/ThemeContext";
import { useExpenses } from "@/hooks/useExpenses";

export default function CategoryPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const { expenses, categories, addCategory, updateCategory, deleteCategory } =
    useExpenses();
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    setFilteredExpenses(expenses);
  }, [expenses]);

  const handleAddCategory = () => {
    if (newCategory) {
      if (editingCategory) {
        updateCategory(editingCategory, newCategory);
        setEditingCategory(null);
      } else {
        addCategory(newCategory);
      }
      setNewCategory("");
      setModalVisible(false);
    }
  };

  const handleEditCategory = (category: string) => {
    setEditingCategory(category);
    setNewCategory(category);
    setModalVisible(true);
  };

  const handleDeleteCategory = (category: string) => {
    deleteCategory(category);
  };

  const handleFilter = (filters: {
    category?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    const filtered = expenses.filter((expense) => {
      if (filters.category && expense.category !== filters.category) {
        return false;
      }
      if (
        filters.startDate &&
        new Date(expense.date) < new Date(filters.startDate)
      ) {
        return false;
      }
      if (
        filters.endDate &&
        new Date(expense.date) > new Date(filters.endDate)
      ) {
        return false;
      }
      return true;
    });
    setFilteredExpenses(filtered);
  };

  const renderItem = ({ item }: { item: string }) => (
    <View
      className={`flex-row items-center justify-between py-2 border-b ${
        isDarkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <Text className={`text-base ${isDarkMode ? "text-white" : "text-black"}`}>
        {item}
      </Text>
      <View className="flex-row">
        <TouchableOpacity
          onPress={() => handleEditCategory(item)}
          className="mr-2"
        >
          <Ionicons
            name="create-outline"
            size={24}
            color={isDarkMode ? "lightblue" : "blue"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteCategory(item)}>
          <Ionicons
            name="trash-outline"
            size={24}
            color={isDarkMode ? "pink" : "red"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const ListHeaderComponent = () => (
    <View>
      <TouchableOpacity
        className={`flex-row items-center justify-center p-3 mb-4 rounded-md ${
          isDarkMode ? "bg-blue-700" : "bg-blue-500"
        }`}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add-circle-outline" size={24} color="white" />
        <Text className="ml-2 font-bold text-white">Add New Category</Text>
      </TouchableOpacity>

      <View className="flex flex-row gap-2 space-x-4">
        <View
          className={`flex-1 p-4 mb-4 rounded-md ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <View className="flex flex-row items-center gap-2 mb-2 space-x-2">
            <Ionicons
              name="wallet"
              size={20}
              color={isDarkMode ? "white" : "black"}
            />
            <Text
              className={`text-lg font-bold ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Expense Summary
            </Text>
          </View>
          <Text
            className={`text-base ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Total Expenses: ${calculateTotal(filteredExpenses).toFixed(2)}
          </Text>
        </View>

        <View
          className={`flex-1 p-4 mb-4 rounded-md ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <View className="flex flex-row items-center gap-2 mb-2 space-x-2">
            <Ionicons
              name="list"
              size={20}
              color={isDarkMode ? "white" : "black"}
            />
            <Text
              className={`text-lg font-bold ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Expenses Count
            </Text>
          </View>
          <Text
            className={`text-base ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Number of Expenses: {filteredExpenses.length}
          </Text>
        </View>
      </View>

      <FilterComponent onFilter={handleFilter} categories={categories} />

      <View className="p-4 mb-2">
        <Text
          className={`mb-2 text-lg font-bold ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Categories
        </Text>
      </View>
    </View>
  );

  return (
    <View className={`flex-1 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={{ padding: 16 }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="items-center justify-center flex-1 bg-black bg-opacity-50">
          <View
            className={`w-4/5 p-4 rounded-md ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <Text
              className={`mb-2 text-lg font-bold ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {editingCategory ? "Edit Category" : "Add New Category"}
            </Text>
            <TextInput
              className={`p-2 mb-4 border rounded-md ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-black"
              }`}
              placeholder="Category Name"
              placeholderTextColor={isDarkMode ? "#9CA3AF" : "#6B7280"}
              value={newCategory}
              onChangeText={setNewCategory}
            />
            <View className="flex-row justify-end">
              <TouchableOpacity
                className={`p-2 mr-2 rounded-md ${
                  isDarkMode ? "bg-gray-600" : "bg-gray-300"
                }`}
                onPress={() => {
                  setModalVisible(false);
                  setEditingCategory(null);
                  setNewCategory("");
                }}
              >
                <Text className={isDarkMode ? "text-white" : "text-black"}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`p-2 rounded-md ${
                  isDarkMode ? "bg-blue-700" : "bg-blue-500"
                }`}
                onPress={handleAddCategory}
              >
                <Text className="text-white">
                  {editingCategory ? "Update" : "Add"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
