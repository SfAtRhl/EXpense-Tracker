"use client";

import type React from "react";
import { createContext, useState, useContext, useEffect } from "react";
import type { Expense } from "@/types";
import {
  loadCategories,
  loadExpenses,
  saveCategory,
  saveExpense,
  deleteCategory as deleteCategoryFromStorage,
  removeExpense,
} from "@/utils/storage";

type ExpensesContextType = {
  expenses: Expense[];
  categories: string[];
  addExpense: (newExpense: Expense) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  addCategory: (newCategory: string) => Promise<void>;
  updateCategory: (oldCategory: string, newCategory: string) => Promise<void>;
  deleteCategory: (categoryToDelete: string) => Promise<void>;
};

export const ExpensesContext = createContext<ExpensesContextType | undefined>(
  undefined
);

export const ExpensesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const loadedExpenses = await loadExpenses();
      setExpenses(loadedExpenses);
    };

    const fetchCategories = async () => {
      const loadedCategories = await loadCategories();
      setCategories(loadedCategories);
    };

    fetchExpenses();
    fetchCategories();
  }, []);

  const addExpense = async (newExpense: Expense) => {
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    await saveExpense(newExpense);
  };

  const deleteExpense = async (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    await removeExpense(id);
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

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        categories,
        addExpense,
        deleteExpense,
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpensesContext);
  if (context === undefined) {
    throw new Error("useExpenses must be used within an ExpensesProvider");
  }
  return context;
};
