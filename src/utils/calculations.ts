// Business logic utilities
export function calculateCustomResourceRate(
  baseRate: number,
  regionalMultiplier: number,
  seniorityMultiplier: number,
): number {
  return Math.round(baseRate * regionalMultiplier * seniorityMultiplier)
}

export function calculateSwatTeamRate(
  baseRate: number,
  seniorityMultiplier: number,
  workloadPercentage: number,
  durationDiscount: number,
  swatDiscount = 0.2,
): number {
  const baseWithSeniority = baseRate * seniorityMultiplier
  const withWorkload = baseWithSeniority * (workloadPercentage / 100)
  const withDurationDiscount = withWorkload * (1 - durationDiscount / 100)
  const withSwatDiscount = withDurationDiscount * (1 - swatDiscount)

  return Math.round(withSwatDiscount)
}

export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  exchangeRates: Record<string, number>,
): number {
  if (fromCurrency === toCurrency) return amount

  const amountInAED = fromCurrency === "AED" ? amount : amount / exchangeRates[fromCurrency]
  const convertedAmount = toCurrency === "AED" ? amountInAED : amountInAED * exchangeRates[toCurrency]

  return Math.round(convertedAmount * 100) / 100
}
