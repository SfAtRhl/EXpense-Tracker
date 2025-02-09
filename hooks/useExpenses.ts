"use client";

import { useState, useEffect } from "react";
import { Expense } from "@/types";
import {
  loadCategories,
  loadExpenses,
  saveCategory,
  saveExpense,
  deleteCategory as deleteCategoryFromStorage,
} from "@/utils/storage";

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadExpenses().then(setExpenses);
    loadCategories().then(setCategories);
  }, []);

  const addExpense = async (newExpense: Expense) => {
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    await saveExpense(newExpense);
  };

  const addCategory = async (newCategory: string) => {
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    await saveCategory(newCategory);
  };

  const updateCategory = async (oldCategory: string, newCategory: string) => {
    const updatedCategories = categories.map((cat) =>
      cat === oldCategory ? newCategory : cat
    );
    setCategories(updatedCategories);
    await saveCategory(newCategory);
    const updatedExpenses = expenses.map((expense) =>
      expense.category === oldCategory
        ? { ...expense, category: newCategory }
        : expense
    );
    setExpenses(updatedExpenses);
    for (const expense of updatedExpenses) {
      await saveExpense(expense);
    }
  };

  const deleteCategory = async (categoryToDelete: string) => {
    const updatedCategories = categories.filter(
      (cat) => cat !== categoryToDelete
    );
    setCategories(updatedCategories);
    await deleteCategoryFromStorage(categoryToDelete);
    const updatedExpenses = expenses.map((expense) =>
      expense.category === categoryToDelete
        ? { ...expense, category: "Uncategorized" }
        : expense
    );
    setExpenses(updatedExpenses);
    for (const expense of updatedExpenses) {
      await saveExpense(expense);
    }
  };

  return {
    expenses,
    addExpense,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
  };
}
