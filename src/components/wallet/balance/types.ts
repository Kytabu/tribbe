
import { SupportedCurrency } from "@/features/wallet/constants";

export interface SendViewProps {
  amount: string;
  setAmount: (value: string) => void;
  selectedCurrency: SupportedCurrency;
  currencySymbols: Record<SupportedCurrency, string>;
  autoTribbe: boolean;
  setAutoTribbe: (value: boolean) => void;
}

export interface MoneyRequest {
  id: number;
  name: string;
  amount: number;
  creditScore: number;
  image: string;
}

export interface RequestListItemProps {
  request: MoneyRequest;
  onAction: (id: number, direction: 'left' | 'right') => void;
  slidingDirection?: 'left' | 'right';
  currencySymbol: string;
}

export interface Circle {
  id: string;
  name: string;
  type: "Fundraiser" | "Investment" | "Activity" | "Event";
  daysLeft: number;
  amount: number | "Free" | "Chip in";
  progress: number;
  image: string;
}
