"use client";

import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useExpenses } from "@/hooks/useExpenses";
import { calculateTotal } from "@/utils/calculations";
import { BarChart, PieChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";

const screenWidth = Dimensions.get("window").width;

export default function Statistics() {
  const [startDate, setStartDate] = useState(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
  });
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [filteredExpenses, setFilteredExpenses] = useState<any[]>([]);

  const { expenses } = useExpenses();

  useEffect(() => {
    const filtered = expenses.filter(
      (expense) =>
        new Date(expense.date) >= startDate && new Date(expense.date) <= endDate
    );
    setFilteredExpenses(filtered);
  }, [expenses, startDate, endDate]);

  const onStartDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || startDate;
    setShowStartPicker(false);
    setStartDate(currentDate);
  };

  const onEndDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || endDate;
    setShowEndPicker(false);
    setEndDate(currentDate);
  };

  const dailyExpenses = useMemo(() => {
    const dailyData: { [key: string]: number } = {};
    filteredExpenses.forEach((expense) => {
      const date = new Date(expense.date).toISOString().split("T")[0];
      dailyData[date] = (dailyData[date] || 0) + expense.amount;
    });
    return Object.entries(dailyData)
      .slice(-7)
      .map(([date, amount]) => ({
        date: new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        amount: Number(amount),
      }));
  }, [filteredExpenses]);

  const categoryExpenses = useMemo(() => {
    const categoryData: { [key: string]: number } = {};
    filteredExpenses.forEach((expense) => {
      const category = expense.category || "Uncategorized";
      categoryData[category] = (categoryData[category] || 0) + expense.amount;
    });
    return Object.entries(categoryData).map(([name, amount]) => ({
      name,
      amount: Number(amount),
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    }));
  }, [filteredExpenses]);

  const { isDarkMode } = useTheme();

  return (
    
    <SafeAreaView
      className={`flex-1 p-4 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-14"
      >
        <View className="mb-4">
          <Text
            className={`mb-2 text-lg font-bold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Select Date Range
          </Text>
          <TouchableOpacity
            className={`p-3 mb-2 rounded-md ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
            onPress={() => setShowStartPicker(true)}
          >
            <Text className={isDarkMode ? "text-white" : "text-black"}>
              From: {startDate.toDateString()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`p-3 mb-2 rounded-md ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
            onPress={() => setShowEndPicker(true)}
          >
            <Text className={isDarkMode ? "text-white" : "text-black"}>
              To: {endDate.toDateString()}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex flex-row gap-2 space-x-4">
          <View
            className={`flex-1 p-4 mb-4 rounded-md ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <View className="flex flex-row items-center gap-2 mb-2 space-x-2 ">
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
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Total Expenses: {calculateTotal(filteredExpenses).toFixed(2)}
            </Text>
          </View>

          <View
            className={`flex-1 p-4 mb-4 rounded-md ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <View className="flex flex-row items-center gap-2 mb-2 space-x-2 ">
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
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Number of Expenses: {filteredExpenses.length}
            </Text>
          </View>
        </View>

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
            Daily Expenses (Last 7 Days)
          </Text>
          <BarChart
            data={{
              labels: dailyExpenses.map((item) => item.date),
              datasets: [{ data: dailyExpenses.map((item) => item.amount) }],
            }}
            width={screenWidth - 32}
            height={220}
            yAxisLabel="MAD"
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: isDarkMode ? "#1F2937" : "#ffffff",
              backgroundGradientFrom: isDarkMode ? "#1F2937" : "#ffffff",
              backgroundGradientTo: isDarkMode ? "#1F2937" : "#ffffff",
              decimalPlaces: 2,
              color: (opacity = 1) =>
                isDarkMode
                  ? `rgba(255, 255, 255, ${opacity})`
                  : `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>

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
            Expenses by Category
          </Text>
          <PieChart
            data={categoryExpenses}
            width={screenWidth - 32}
            height={220}
            chartConfig={{
              backgroundColor: isDarkMode ? "#1F2937" : "#ffffff",
              backgroundGradientFrom: isDarkMode ? "#1F2937" : "#ffffff",
              backgroundGradientTo: isDarkMode ? "#1F2937" : "#ffffff",
              decimalPlaces: 2,
              color: (opacity = 1) =>
                isDarkMode
                  ? `rgba(255, 255, 255, ${opacity})`
                  : `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>

        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={onStartDateChange}
          />
        )}
        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={onEndDateChange}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
