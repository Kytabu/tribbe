
/**
 * Formats a phone number as the user types
 * Format: XXXX XXX XXX
 */
export function formatPhoneNumber(value: string): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');
  
  // Apply formatting based on length
  if (digits.length === 0) {
    return '';
  } else if (digits.length <= 4) {
    return `${digits}`;
  } else if (digits.length <= 7) {
    return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  } else {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 10)}`;
  }
}

/**
 * Removes formatting from a phone number to get just the digits
 */
export function unformatPhoneNumber(formattedNumber: string): string {
  return formattedNumber.replace(/\D/g, '');
}
