// Application constants
export const CALCULATOR_TYPES = {
  CUSTOM_RESOURCE: "Custom Resource",
  SWAT_TEAM: "SWAT Team",
} as const

export const SWAT_TEAM_DISCOUNT = 0.2 // 20%

export const CURRENCY_REFRESH_INTERVAL = 60 * 60 * 1000 // 1 hour

export const QUOTE_VALIDITY_DAYS = 30

export const DEFAULT_EXCHANGE_RATES = {
  AED: 1,
  USD: 0.27,
  EUR: 0.25,
  GBP: 0.21,
  PKR: 76.5,
} as const
