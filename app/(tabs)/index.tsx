"use client";
import { SafeAreaView, View } from "react-native";
import { useExpenses } from "@/hooks/useExpenses";
import ExpenseSummary from "@/components/ExpenseSummary";
import AddExpense from "@/components/AddExpense";
import ExpenseList from "@/components/ExpenseList";

export default function HomeScreen() {
  const { expenses, addExpense, categories } = useExpenses();
  return (
    <SafeAreaView className="h-full bg-gray-100">
      <View className="p-4">
        <AddExpense onAddExpense={addExpense} categories={categories} />
        <ExpenseSummary expenses={expenses} />
        <ExpenseList expenses={expenses} />
      </View>
    </SafeAreaView>
  );
}
