"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState, type ReactNode } from "react"

interface QueryProviderProps {
  children: ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching on first mount.
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false, // Prevent refetching on window focus for this app
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Optional: React Query Devtools for debugging in development */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
