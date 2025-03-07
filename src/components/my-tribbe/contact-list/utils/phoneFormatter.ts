
/**
 * Formats a phone number as the user types
 * Format: +XXX XXX XXX XXX
 */
export function formatPhoneNumber(value: string): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');
  
  // Apply formatting based on length
  if (digits.length === 0) {
    return '';
  } else if (digits.length <= 3) {
    return `+${digits}`;
  } else if (digits.length <= 6) {
    return `+${digits.slice(0, 3)} ${digits.slice(3)}`;
  } else if (digits.length <= 9) {
    return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  } else {
    return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9, 12)}`;
  }
}

/**
 * Removes formatting from a phone number to get just the digits
 */
export function unformatPhoneNumber(formattedNumber: string): string {
  return formattedNumber.replace(/\D/g, '');
}
