import { View, Text } from "react-native";
import type { Expense } from "../types";
import { calculateTotal, filterExpensesByPeriod } from "../utils/calculations";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";

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
  const { isDarkMode } = useTheme();

  return (
    <View className="flex flex-col ">
      <View className="flex flex-row gap-2 ">
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
              className={`font-bold text-md ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Total Expenses
            </Text>
          </View>
          <Text
            className={`text-base text-center ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {expenseTotal.toFixed(2)}
          </Text>
        </View>

        <View
          className={`flex-1 p-4 mb-4 rounded-md ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <View className="flex flex-row items-center gap-2 mb-2 space-x-2">
            <Ionicons
              name="sunny"
              size={20}
              color={isDarkMode ? "white" : "black"}
            />
            <Text
              className={`font-bold text-md ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Daily Expense
            </Text>
          </View>
          <Text
            className={`text-base text-center ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {dailyTotal.toFixed(2)}
          </Text>
        </View>
      </View>

      <View className="flex flex-row gap-2 ">
        <View
          className={`flex-1 p-4 mb-4 rounded-md ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <View className="flex flex-row items-center gap-2 mb-2 space-x-2">
            <Ionicons
              name="calendar"
              size={20}
              color={isDarkMode ? "white" : "black"}
            />
            <Text
              className={`font-bold text-md ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Weekly Expense
            </Text>
          </View>
          <Text
            className={`text-base text-center ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {weeklyTotal.toFixed(2)}
          </Text>
        </View>

        <View
          className={`flex-1 p-4 mb-4 rounded-md ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <View className="flex flex-row items-center gap-2 mb-2 space-x-2">
            <Ionicons
              name="calendar-outline"
              size={20}
              color={isDarkMode ? "white" : "black"}
            />
            <Text
              className={`font-bold text-md ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Monthly Expense
            </Text>
          </View>
          <Text
            className={`text-base text-center ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {monthlyTotal.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}
