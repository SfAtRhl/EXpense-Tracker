import { View, Text } from "react-native";
import type { Expense } from "../types";
import { calculateTotal, filterExpensesByPeriod } from "../utils/calculations";

interface ExpenseSummaryProps {
  expenses: Expense[];
}

export default function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  const dailyTotal = calculateTotal(filterExpensesByPeriod(expenses, "daily"));
  const weeklyTotal = calculateTotal(
    filterExpensesByPeriod(expenses, "weekly")
  );
  const monthlyTotal = calculateTotal(
    filterExpensesByPeriod(expenses, "monthly")
  );

  return (
    <View className="p-4 mb-4 bg-white rounded-md">
      <Text className="mb-2 text-lg font-bold">Expense Summary</Text>
      <Text className="mb-1 text-base">Daily: {dailyTotal.toFixed(2)}</Text>
      <Text className="mb-1 text-base">Weekly: {weeklyTotal.toFixed(2)}</Text>
      <Text className="text-base">Monthly: {monthlyTotal.toFixed(2)}</Text>
    </View>
  );
}
