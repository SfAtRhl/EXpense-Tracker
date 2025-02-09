import { View, Text } from "react-native";
import type { Expense } from "../types";
import { calculateTotal, filterExpensesByPeriod } from "../utils/calculations";
import { Ionicons } from "@expo/vector-icons";

interface ExpenseSummaryProps {
  expenses: Expense[];
}

export default function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  const expenseTotal = calculateTotal(expenses);
  const dailyTotal = calculateTotal(filterExpensesByPeriod(expenses, "daily"));
  const weeklyTotal = calculateTotal(
    filterExpensesByPeriod(expenses, "weekly")
  );
  const monthlyTotal = calculateTotal(
    filterExpensesByPeriod(expenses, "monthly")
  );

  return (
    <View className="flex flex-col ">
      <View className="flex flex-row gap-2 ">
        <View className="flex-1 p-4 mb-4 bg-white rounded-md ">
          <View className="flex flex-row items-center gap-2 mb-2 space-x-2">
            <Ionicons name="wallet" size={20} color="black" />
            <Text className="font-bold text-md">Total Expenses</Text>
          </View>
          <Text className="text-base">{expenseTotal.toFixed(2)}</Text>
        </View>

        <View className="flex-1 p-4 mb-4 bg-white rounded-md">
          <View className="flex flex-row items-center gap-2 mb-2 space-x-2">
            <Ionicons name="sunny" size={20} color="black" />
            <Text className="font-bold text-md">Daily Expense</Text>
          </View>
          <Text className="text-base">{dailyTotal.toFixed(2)}</Text>
        </View>
      </View>

      <View className="flex flex-row gap-2 ">
        <View className="flex-1 p-4 mb-4 bg-white rounded-md">
          <View className="flex flex-row items-center gap-2 mb-2 space-x-2">
            <Ionicons name="calendar" size={20} color="black" />
            <Text className="font-bold text-md">Weekly Expense</Text>
          </View>
          <Text className="text-base">{weeklyTotal.toFixed(2)}</Text>
        </View>

        <View className="flex-1 p-4 mb-4 bg-white rounded-md">
          <View className="flex flex-row items-center gap-2 mb-2 space-x-2">
            <Ionicons name="calendar-outline" size={20} color="black" />
            <Text className="font-bold text-md">Monthly Expense</Text>
          </View>
          <Text className="text-base">{monthlyTotal.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
}
