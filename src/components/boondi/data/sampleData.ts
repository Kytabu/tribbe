
import { CategoryData, Transaction } from "@/types/boondi";

// Category colors based on Tribbe's color palette
export const categoryColors = {
  'Utilities': '#9b87f5',               // Primary Purple
  'Housing & Rent': '#0EA5E9',          // Ocean Blue
  'Food & Groceries': '#A9FF22',        // Tribbe Lime
  'Transport & Mobility': '#D946EF',    // Magenta Pink
  'Entertainment & Subscriptions': '#F97316', // Bright Orange
  'Debts & Payments': '#FF6B6B',        // Red variant
};

export const sampleSpendingData: CategoryData[] = [
  {
    name: 'Utilities',
    amount: 2450,
    color: categoryColors['Utilities'],
    subCategories: [
      { name: 'Electricity', amount: 1400 },
      { name: 'Phone', amount: 250 },
      { name: 'Internet', amount: 0 },
      { name: 'Mobile Data', amount: 800 }
    ]
  },
  {
    name: 'Housing & Rent',
    amount: 28000,
    color: categoryColors['Housing & Rent'],
    subCategories: [
      { name: 'Rent', amount: 28000 },
      { name: 'Maintenance', amount: 0 },
      { name: 'Insurance', amount: 0 },
    ]
  },
  {
    name: 'Food & Groceries',
    amount: 5000,
    color: categoryColors['Food & Groceries'],
    subCategories: [
      { name: 'Groceries', amount: 3200 },
      { name: 'Restaurants', amount: 1800 },
      { name: 'Delivery', amount: 0 },
    ]
  },
  {
    name: 'Transport & Mobility',
    amount: 640,
    color: categoryColors['Transport & Mobility'],
    subCategories: [
      { name: 'Ride-sharing', amount: 640 },
      { name: 'Public Transport', amount: 0 },
      { name: 'Car Service', amount: 0 },
    ]
  },
  {
    name: 'Entertainment & Subscriptions',
    amount: 1250,
    color: categoryColors['Entertainment & Subscriptions'],
    subCategories: [
      { name: 'Video Streaming', amount: 950 },
      { name: 'Music', amount: 300 },
      { name: 'Gaming', amount: 0 },
    ]
  },
  {
    name: 'Debts & Payments',
    amount: 8150,
    color: categoryColors['Debts & Payments'],
    subCategories: [
      { name: 'Loan Repayment', amount: 5000 },
      { name: 'Gym Membership', amount: 2000 },
      { name: 'Pharmacy', amount: 1150 },
    ]
  },
];

// Calculate total spending
export const totalSpending = sampleSpendingData.reduce(
  (total, category) => total + category.amount, 
  0
);

export const sampleTransactions: Transaction[] = [
  {
    id: '1',
    merchant: 'Safaricom Airtime',
    amount: 250,
    date: '2025-05-16',
    category: 'Utilities'
  },
  {
    id: '2',
    merchant: 'Netflix Subscription',
    amount: 950,
    date: '2025-05-15',
    category: 'Entertainment & Subscriptions'
  },
  {
    id: '3',
    merchant: 'Rent Payment',
    amount: 28000,
    date: '2025-05-01',
    category: 'Housing & Rent'
  },
  {
    id: '4',
    merchant: 'Grocery Store (Naivas)',
    amount: 3200,
    date: '2025-05-12',
    category: 'Food & Groceries'
  },
  {
    id: '5',
    merchant: 'Uber Ride',
    amount: 640,
    date: '2025-05-14',
    category: 'Transport & Mobility'
  },
  {
    id: '6',
    merchant: 'Gym Membership',
    amount: 2000,
    date: '2025-05-05',
    category: 'Debts & Payments'
  },
  {
    id: '7',
    merchant: 'Electricity Token',
    amount: 1400,
    date: '2025-05-10',
    category: 'Utilities'
  },
  {
    id: '8',
    merchant: 'Spotify Premium',
    amount: 300,
    date: '2025-05-15',
    category: 'Entertainment & Subscriptions'
  },
  {
    id: '9',
    merchant: 'Loan Repayment',
    amount: 5000,
    date: '2025-05-05',
    category: 'Debts & Payments'
  },
  {
    id: '10',
    merchant: 'Mobile Data',
    amount: 800,
    date: '2025-05-14',
    category: 'Utilities'
  },
  {
    id: '11',
    merchant: 'Pharmacy Purchase',
    amount: 1150,
    date: '2025-05-11',
    category: 'Debts & Payments'
  },
  {
    id: '12',
    merchant: 'Restaurant Bill',
    amount: 1800,
    date: '2025-05-13',
    category: 'Food & Groceries'
  }
];
