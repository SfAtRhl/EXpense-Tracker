import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Expense } from "../types";

const EXPENSES_KEY = "expenses";

export const saveExpense = async (expense: Expense) => {
  try {
    const expenses = await loadExpenses();
    expenses.push(expense);
    await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error("Error saving expense:", error);
  }
};

export const loadExpenses = async (): Promise<Expense[]> => {
  try {
    const expensesJson = await AsyncStorage.getItem(EXPENSES_KEY);
    return expensesJson ? JSON.parse(expensesJson) : [];
  } catch (error) {
    console.error("Error loading expenses:", error);
    return [];
  }
};
