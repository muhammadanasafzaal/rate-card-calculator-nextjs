import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string): string {
  const currencySymbols: { [key: string]: string } = {
    AED: "د.إ",
    USD: "$",
    EUR: "€",
    GBP: "£",
    PKR: "₨",
  }

  const symbol = currencySymbols[currency] || currency
  const formattedAmount = amount.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  return `${symbol}${formattedAmount}`
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function calculatePercentage(value: number, percentage: number): number {
  return Math.round(value * (percentage / 100))
}

export function applyDiscount(value: number, discountPercentage: number): number {
  return Math.round(value * (1 - discountPercentage / 100))
}
