"use client";

import { useContext } from "react";
import { ExpensesContext } from "@/contexts/ExpensesContext";

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (context === undefined) {
    throw new Error("useExpenses must be used within an ExpensesProvider");
  }
  return context;
}
