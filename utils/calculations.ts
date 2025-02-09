import type { Expense } from "../types";

export const calculateTotal = (expenses: Expense[]): number => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

export const filterExpensesByPeriod = (
  expenses: Expense[],
  period: "daily" | "weekly" | "monthly"
): Expense[] => {
  const now = new Date();
  const periodStart = new Date(now);

  switch (period) {
    case "daily":
      periodStart.setHours(0, 0, 0, 0);
      break;
    case "weekly":
      periodStart.setDate(now.getDate() - now.getDay());
      periodStart.setHours(0, 0, 0, 0);
      break;
    case "monthly":
      periodStart.setDate(1);
      periodStart.setHours(0, 0, 0, 0);
      break;
  }

  return expenses.filter((expense) => new Date(expense.date) >= periodStart);
};
