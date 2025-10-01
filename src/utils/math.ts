export function calculateCheckDigit(str: string): string {
  const multipliers = [7, 3, 1];
  let sum = 0;

  for (let i = 0; i < str.length; i++) {
    const value = parseInt(str[i], 36);
    sum += value * multipliers[i % multipliers.length];
  }

  return (sum % 10).toString();
}
