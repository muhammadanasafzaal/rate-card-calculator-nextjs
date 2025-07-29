import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { QueryProvider } from "@/components/providers/query-provider" // Import the QueryProvider

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rate Card Calculator",
  description: "Calculate accurate rates for custom resources and SWAT teams.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>{children}</QueryProvider> {/* Wrap children with QueryProvider */}
        <Toaster />
      </body>
    </html>
  )
}
