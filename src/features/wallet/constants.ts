
export type SupportedCurrency = 'GBP' | 'USD' | 'KES' | 'EUR';

export const currencySymbols: Record<SupportedCurrency, string> = {
  GBP: '£',
  USD: '$',
  KES: 'KSh',
  EUR: '€'
};
