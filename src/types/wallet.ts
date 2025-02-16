
export interface Transaction {
  amount: number;
  running_balance: number;
  created_at: string;
  description?: string | null; // Make description optional
}
