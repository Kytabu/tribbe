
import { CategoryData, Transaction, TransactionCategory } from "@/types/boondi";

// Category colors
export const categoryColors: Record<TransactionCategory, string> = {
  'Utilities': '#6366F1', // Indigo
  'Housing & Rent': '#8B5CF6', // Purple
  'Food & Groceries': '#EC4899', // Pink
  'Transport & Mobility': '#F59E0B', // Amber
  'Entertainment & Subscriptions': '#10B981', // Emerald
  'Debts & Payments': '#EF4444', // Red
};

// Total spending - this will change based on selected time period
export const totalSpending = 56500;

// Sample data for the spending chart
export const sampleSpendingData: CategoryData[] = [
  {
    name: 'Housing & Rent',
    amount: 15000,
    color: categoryColors['Housing & Rent'],
    subCategories: [
      { name: 'Rent', amount: 12000 },
      { name: 'Electricity', amount: 1500 },
      { name: 'Water', amount: 1000 },
      { name: 'Internet', amount: 500 }
    ]
  },
  {
    name: 'Food & Groceries',
    amount: 12000,
    color: categoryColors['Food & Groceries'],
    subCategories: [
      { name: 'Groceries', amount: 8000 },
      { name: 'Restaurants', amount: 3000 },
      { name: 'Deliveries', amount: 1000 }
    ]
  },
  {
    name: 'Transport & Mobility',
    amount: 9500,
    color: categoryColors['Transport & Mobility'],
    subCategories: [
      { name: 'Fuel', amount: 6000 },
      { name: 'Public Transport', amount: 2000 },
      { name: 'Maintenance', amount: 1500 }
    ]
  },
  {
    name: 'Entertainment & Subscriptions',
    amount: 8000,
    color: categoryColors['Entertainment & Subscriptions'],
    subCategories: [
      { name: 'Streaming Services', amount: 3000 },
      { name: 'Events', amount: 3000 },
      { name: 'Gaming', amount: 2000 }
    ]
  },
  {
    name: 'Utilities',
    amount: 7000,
    color: categoryColors['Utilities'],
    subCategories: [
      { name: 'Electricity', amount: 3000 },
      { name: 'Water', amount: 2000 },
      { name: 'Gas', amount: 2000 }
    ]
  },
  {
    name: 'Debts & Payments',
    amount: 5000,
    color: categoryColors['Debts & Payments'],
    subCategories: [
      { name: 'Credit Card', amount: 3000 },
      { name: 'Personal Loan', amount: 2000 }
    ]
  }
];

// Function to generate varied spending by month
export const getMonthlyData = (monthIndex: number): CategoryData[] => {
  // Randomize data slightly for each month to create variation
  const monthFactor = (monthIndex + 1) / 6; // 0.17 to 2.0
  
  return sampleSpendingData.map(category => {
    // Create a variation factor between 0.8 and 1.2 based on month and category
    const variationFactor = 0.8 + (((monthIndex * 13) % 17 + category.name.length) % 7) / 10;
    
    const newAmount = Math.round(category.amount * variationFactor);
    
    return {
      ...category,
      amount: newAmount,
      subCategories: category.subCategories.map(subCat => ({
        ...subCat,
        amount: Math.round(subCat.amount * variationFactor)
      }))
    };
  });
};

// Function to generate weekly data
export const getWeeklyData = (): CategoryData[] => {
  // Weekly data is around 25% of monthly data
  return sampleSpendingData.map(category => {
    const weeklyAmount = Math.round(category.amount * 0.25);
    
    return {
      ...category,
      amount: weeklyAmount,
      subCategories: category.subCategories.map(subCat => ({
        ...subCat,
        amount: Math.round(subCat.amount * 0.25)
      }))
    };
  });
};

// Function to generate quarterly data
export const getQuarterlyData = (quarterIndex: number): CategoryData[] => {
  // Quarterly data is around 3x monthly data with variation by quarter
  const quarterFactor = 2.8 + (quarterIndex * 0.2); // 2.8 to 3.4
  
  return sampleSpendingData.map(category => {
    const quarterlyAmount = Math.round(category.amount * quarterFactor);
    
    return {
      ...category,
      amount: quarterlyAmount,
      subCategories: category.subCategories.map(subCat => ({
        ...subCat,
        amount: Math.round(subCat.amount * quarterFactor)
      }))
    };
  });
};

// Function to generate yearly data
export const getYearlyData = (): CategoryData[] => {
  // Yearly data is around 12x monthly data
  return sampleSpendingData.map(category => {
    const yearlyAmount = category.amount * 12;
    
    return {
      ...category,
      amount: yearlyAmount,
      subCategories: category.subCategories.map(subCat => ({
        ...subCat,
        amount: subCat.amount * 12
      }))
    };
  });
};

// Sample data for transaction history
export const sampleTransactions: Transaction[] = [
  {
    id: '1',
    merchant: 'Monthly Rent',
    amount: 12000,
    date: '2024-04-01',
    category: 'Housing & Rent'
  },
  {
    id: '2',
    merchant: 'Carrefour',
    amount: 4500,
    date: '2024-04-02',
    category: 'Food & Groceries'
  },
  {
    id: '3',
    merchant: 'Shell Petrol Station',
    amount: 3000,
    date: '2024-04-03',
    category: 'Transport & Mobility'
  },
  {
    id: '4',
    merchant: 'Netflix',
    amount: 1000,
    date: '2024-04-05',
    category: 'Entertainment & Subscriptions'
  },
  {
    id: '5',
    merchant: 'Kenya Power',
    amount: 2200,
    date: '2024-04-10',
    category: 'Utilities'
  },
  {
    id: '6',
    merchant: 'KCB Loan',
    amount: 2500,
    date: '2024-04-15',
    category: 'Debts & Payments'
  },
  {
    id: '7',
    merchant: 'Urban Eats Restaurant',
    amount: 1800,
    date: '2024-04-16',
    category: 'Food & Groceries'
  },
  {
    id: '8',
    merchant: 'Uber',
    amount: 650,
    date: '2024-04-18',
    category: 'Transport & Mobility'
  },
  {
    id: '9',
    merchant: 'Naivas Supermarket',
    amount: 3200,
    date: '2024-04-20',
    category: 'Food & Groceries'
  },
  {
    id: '10',
    merchant: 'DSTV Subscription',
    amount: 1500,
    date: '2024-04-25',
    category: 'Entertainment & Subscriptions'
  },
  {
    id: '11',
    merchant: 'Safaricom',
    amount: 1000,
    date: '2024-04-28',
    category: 'Utilities'
  },
  {
    id: '12',
    merchant: 'Java House',
    amount: 850,
    date: '2024-04-29',
    category: 'Food & Groceries'
  }
];
