import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import type { Expense } from "../types";
import NoResults from "./NoResults";
import { Ionicons } from "@expo/vector-icons";
import { useExpenses } from "@/hooks/useExpenses";
import { useTheme } from "@/contexts/ThemeContext";

interface ExpenseListProps {
  expenses: Expense[];
}

const RenderExpenseItem = ({
  item,
  onDelete,
  isDarkMode,
}: {
  item: Expense;
  onDelete: (id: string) => void;
  isDarkMode: boolean;
}) => {
  return (
    <View
      className={`flex-row items-center justify-between p-4 border-b ${
        isDarkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <Text className={`text-base ${isDarkMode ? "text-white" : "text-black"}`}>
        {item.title}
      </Text>
      <View className="flex-row items-center gap-4">
        <Text
          className={`text-base font-bold ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          ${item.amount.toFixed(2)}
        </Text>
        <Pressable
          onPress={() => onDelete(item.id)}
          accessibilityLabel={`Delete expense ${item.title}`}
        >
          <Ionicons
            name="trash"
            size={20}
            color={isDarkMode ? "pink" : "red"}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default function ExpenseList({ expenses }: ExpenseListProps) {
  const { deleteExpense } = useExpenses();
  const { isDarkMode } = useTheme();

  if (!expenses || expenses.length === 0) {
    return (
      <Text
        className={`p-4 font-bold text-center capitalize ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        No expenses found
      </Text>
    );
  }

  return (
    <SafeAreaView
      className={`h-2/3 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
    >
      <Text
        className={`p-2 font-bold capitalize ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        List of Expenses found
      </Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RenderExpenseItem
            item={item}
            onDelete={deleteExpense}
            isDarkMode={isDarkMode}
          />
        )}
        contentContainerClassName="pb-14"
        ListEmptyComponent={<NoResults />}
      />
    </SafeAreaView>
  );
}
