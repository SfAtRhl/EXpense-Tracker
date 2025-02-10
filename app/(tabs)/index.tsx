"use client";
import { SafeAreaView, View } from "react-native";
import { useExpenses } from "@/hooks/useExpenses";
import ExpenseSummary from "@/components/ExpenseSummary";
import AddExpense from "@/components/AddExpense";
import ExpenseList from "@/components/ExpenseList";
import { useTheme } from "../../contexts/ThemeContext";

export default function HomeScreen() {
  const { expenses, addExpense, categories } = useExpenses();
  const { isDarkMode } = useTheme();
  return (
    <SafeAreaView
      className={`h-full ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}
    >
      <View className="p-4">
        <AddExpense onAddExpense={addExpense} categories={categories} />
        <ExpenseSummary expenses={expenses} />
        <ExpenseList expenses={expenses} />
      </View>
    </SafeAreaView>
  );
}
