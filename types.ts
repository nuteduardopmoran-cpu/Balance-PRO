export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string; // ISO string
  paymentMethod: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  type: TransactionType;
}

export interface FinanceState {
  transactions: Transaction[];
  balance: number;
  totalIncome: number;
  totalExpense: number;
}

export type Period = 'week' | 'month' | 'year' | 'all';

export interface ChartDataPoint {
  name: string;
  income: number;
  expense: number;
}