import { FlatList, SafeAreaView, ScrollView, Text, View } from "react-native";
import type { Expense } from "../types";
import NoResults from "./NoResults";

interface ExpenseListProps {
  expenses: Expense[];
}

const RenderExpenseItem = ({ item }: { item: Expense }) => {
  return (
    <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
      <Text className="text-base">{item.title}</Text>
      <Text className="text-base font-bold">{item.amount.toFixed(2)}</Text>
    </View>
  );
};

export default function ExpenseList({ expenses }: ExpenseListProps) {
  if (!expenses || expenses.length === 0) {
    return <Text className="p-4 text-center">No expenses found</Text>;
  }

  return (
    <SafeAreaView className="h-2/3">
      <Text className="p-2 font-bold ">List of Expenses found</Text>
      <FlatList
        data={expenses}
        renderItem={({ item }) => <RenderExpenseItem item={item} />}
        contentContainerClassName="pb-14"
        ListEmptyComponent={<NoResults />}
      />
    </SafeAreaView>
  );
}
