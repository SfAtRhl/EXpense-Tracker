"use client";

import { useState, useEffect } from "react";
import { Expense } from "@/types";
import { loadExpenses, saveExpense } from "@/utils/storage";

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    loadExpenses().then(setExpenses);
  }, []);

  const addExpense = async (newExpense: Expense) => {
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    await saveExpense(newExpense);
  };

  return { expenses, addExpense };
}
