import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Expense } from "../types";

const EXPENSES_KEY = "expenses";
const CATEGORIES_KEY = "categories";

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

export const saveCategory = async (category: string) => {
  try {
    const categories = await loadCategories();
    if (!categories.includes(category)) {
      categories.push(category);
      await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    }
  } catch (error) {
    console.error("Error saving category:", error);
  }
};

export const loadCategories = async (): Promise<string[]> => {
  try {
    const categoriesJson = await AsyncStorage.getItem(CATEGORIES_KEY);
    return categoriesJson ? JSON.parse(categoriesJson) : ["Uncategorized"];
  } catch (error) {
    console.error("Error loading categories:", error);
    return ["Uncategorized"];
  }
};

export const deleteCategory = async (category: string) => {
  try {
    const categories = await loadCategories();
    const updatedCategories = categories.filter((cat) => cat !== category);
    await AsyncStorage.setItem(
      CATEGORIES_KEY,
      JSON.stringify(updatedCategories)
    );
  } catch (error) {
    console.error("Error deleting category:", error);
  }
};
