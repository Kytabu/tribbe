
export type TransactionCategory = 
  | 'Utilities' 
  | 'Housing & Rent' 
  | 'Food & Groceries' 
  | 'Transport & Mobility' 
  | 'Entertainment & Subscriptions' 
  | 'Debts & Payments';

export interface SubCategory {
  name: string;
  amount: number;
}

export interface CategoryData {
  name: TransactionCategory;
  amount: number;
  color: string;
  subCategories: SubCategory[];
}

export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  category: TransactionCategory;
}
