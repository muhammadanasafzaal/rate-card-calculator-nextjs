"use client"

import { useMemo } from "react"
import { supabase, type Currency } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { useQuery, useQueryClient } from "@tanstack/react-query" // Import useQuery and useQueryClient

interface ExchangeRates {
  [key: string]: number
}

export function useCurrencyConverter() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // Fetch currencies and exchange rates
  const {
    data: currencies = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Currency[]>({
    queryKey: ["currencies"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from("currencies").select("*").order("code")

        if (error) throw error

        // Attempt to fetch fresh rates from external API and update Supabase
        await fetchAndPersistExchangeRates(data || [])

        return data || []
      } catch (err) {
        console.error("Error fetching currencies from Supabase or external API:", err)
        toast({
          title: "Exchange Rate Error",
          description: "Failed to load latest exchange rates. Using cached or fallback rates.",
          variant: "destructive",
        })
        // Fallback currencies if Supabase fails
        return [
          { code: "AED", name: "UAE Dirham", symbol: "د.إ", exchange_rate: 1 },
          { code: "USD", name: "US Dollar", symbol: "$", exchange_rate: 0.27 },
          { code: "EUR", name: "Euro", symbol: "€", exchange_rate: 0.25 },
          { code: "GBP", name: "British Pound", symbol: "£", exchange_rate: 0.21 },
          { code: "PKR", name: "Pakistani Rupee", symbol: "₨", exchange_rate: 76.5 },
        ]
      }
    },
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    refetchInterval: 60 * 60 * 1000, // Refetch every 1 hour in background
  })

  // Derive exchangeRates object from currencies data
  const exchangeRates: ExchangeRates = useMemo(() => {
    const rates: ExchangeRates = {}
    currencies.forEach((currency) => {
      rates[currency.code] = currency.exchange_rate
    })
    return rates
  }, [currencies])

  // Function to fetch from external API and persist to Supabase
  const fetchAndPersistExchangeRates = async (currentCurrencies: Currency[]) => {
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/AED`)
      const data = await response.json()

      const newRates: ExchangeRates = {
        AED: 1,
        USD: data.rates.USD || 0.27,
        EUR: data.rates.EUR || 0.25,
        GBP: data.rates.GBP || 0.21,
        PKR: data.rates.PKR || 76.5,
      }

      const updatePromises = Object.entries(newRates).map(([code, rate]) =>
        supabase
          .from("currencies")
          .update({
            exchange_rate: rate,
            last_updated: new Date().toISOString(),
          })
          .eq("code", code),
      )

      await Promise.all(updatePromises)

      // Invalidate and refetch 'currencies' query to update UI with new rates
      queryClient.invalidateQueries({ queryKey: ["currencies"] })

      toast({
        title: "Exchange Rates Updated",
        description: "Currency exchange rates have been refreshed.",
      })
    } catch (error) {
      console.error("Failed to fetch and persist exchange rates:", error)
      // No toast here, as the main queryFn already handles the initial error
    }
  }

  const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string): number => {
    if (fromCurrency === toCurrency) return amount

    const amountInAED = fromCurrency === "AED" ? amount : amount / exchangeRates[fromCurrency]
    const convertedAmount = toCurrency === "AED" ? amountInAED : amountInAED * exchangeRates[toCurrency]

    return Math.round(convertedAmount * 100) / 100
  }

  const getCurrencySymbol = (currencyCode: string): string => {
    return currencies.find((c) => c.code === currencyCode)?.symbol || currencyCode
  }

  return {
    currencies,
    exchangeRates,
    isLoading,
    lastUpdated: currencies.length > 0 ? new Date(currencies[0].last_updated || Date.now()) : null, // Use last_updated from fetched data
    convertCurrency,
    getCurrencySymbol,
    refreshRates: () => refetch(), // Expose refetch function
  }
}
