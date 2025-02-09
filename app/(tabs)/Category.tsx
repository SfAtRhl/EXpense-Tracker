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
import { useExpenses } from "@/hooks/useExpenses";
import FilterComponent from "@/components/FilterComponent";
import { calculateTotal } from "@/utils/calculations";

export default function CategoryPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const { expenses, categories, addCategory, updateCategory, deleteCategory } =
    useExpenses();
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);

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

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategory(category);
    setModalVisible(true);
  };

  const handleDeleteCategory = (category) => {
    deleteCategory(category);
  };

  const handleFilter = (filters) => {
    console.log(filters);

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

  const renderItem = ({ item }) => (
    <View className="flex-row items-center justify-between py-2 border-b border-gray-200">
      <Text className="text-base">{item}</Text>
      <View className="flex-row">
        <TouchableOpacity
          onPress={() => handleEditCategory(item)}
          className="mr-2"
        >
          <Ionicons name="create-outline" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteCategory(item)}>
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const ListHeaderComponent = () => (
    <View>
      <TouchableOpacity
        className="flex-row items-center justify-center p-3 mb-4 rounded-md bg-primary-300"
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add-circle-outline" size={24} color="white" />
        <Text className="ml-2 font-bold text-white">Add New Category</Text>
      </TouchableOpacity>

      <View className="flex flex-row space-x-4">
        <View className="flex-1 p-4 mb-4 bg-white rounded-md">
          <View className="flex flex-row items-center gap-2 mb-2 space-x-2 ">
            <Ionicons name="wallet" size={20} color="black" />
            <Text className="text-lg font-bold">Expense Summary</Text>
          </View>
          <Text className="text-base">
            Total Expenses: {calculateTotal(filteredExpenses).toFixed(2)}
          </Text>
        </View>

        <View className="flex-1 p-4 mb-4 bg-white rounded-md">
          <View className="flex flex-row items-center gap-2 mb-2 space-x-2 ">
            <Ionicons name="list" size={20} color="black" />
            <Text className="text-lg font-bold">Expenses Count</Text>
          </View>
          <Text className="text-base">
            Number of Expenses: {filteredExpenses.length}
          </Text>
        </View>
      </View>

      <FilterComponent onFilter={handleFilter} categories={categories} />

      <View className="p-4 mb-2">
        <Text className="mb-2 text-lg font-bold">Categories</Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100">
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
          <View className="w-4/5 p-4 bg-white rounded-md">
            <Text className="mb-2 text-lg font-bold">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </Text>
            <TextInput
              className="p-2 mb-4 border border-gray-300 rounded-md"
              placeholder="Category Name"
              value={newCategory}
              onChangeText={setNewCategory}
            />
            <View className="flex-row justify-end">
              <TouchableOpacity
                className="p-2 mr-2 bg-gray-300 rounded-md"
                onPress={() => {
                  setModalVisible(false);
                  setEditingCategory(null);
                  setNewCategory("");
                }}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-2 rounded-md bg-primary-300"
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
