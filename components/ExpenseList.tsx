import { FlatList, Text, View } from "react-native";
import type { Expense } from "../types";

interface ExpenseListProps {
  expenses: Expense[];
}

export default function ExpenseList({ expenses }: ExpenseListProps) {
  console.log("Expenses Data:", expenses); // Debugging output

  if (!expenses || expenses.length === 0) {
    return <Text className="p-4 text-center">No expenses found</Text>;
  }

  const renderExpenseItem = ({ item }: { item: Expense }) => (
    <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
      <Text className="text-base">{item.title}</Text>
      <Text className="text-base font-bold">{item.amount.toFixed(2)}</Text>
    </View>
  );

  return (
    <View className="flex-1">
      <FlatList
        data={expenses}
        renderItem={({ item }) => (
          <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
            <Text className="text-base">{item.title}</Text>
            <Text className="text-base font-bold">
              {item.amount.toFixed(2)}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        className="flex-1"
      />
    </View>
  );
}
