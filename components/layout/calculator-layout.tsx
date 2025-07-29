"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calculator, Users } from "lucide-react"

interface CalculatorLayoutProps {
  children: React.ReactNode
}

export function CalculatorLayout({ children }: CalculatorLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Rate Card Calculator
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Calculate accurate rates for custom resources and SWAT teams with real-time pricing across multiple regions
            and currencies.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <nav className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
            <Link
              href="/"
              className={`px-6 py-3 rounded-md transition-colors flex items-center ${
                pathname === "/" ? "bg-blue-600 text-white" : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              <Calculator className="w-4 h-4 mr-2" />
              Custom Resource
            </Link>
            <Link
              href="/swat-team"
              className={`px-6 py-3 rounded-md transition-colors flex items-center ${
                pathname === "/swat-team"
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              <Users className="w-4 h-4 mr-2" />
              SWAT Team
            </Link>
          </nav>
        </div>

        {children}
      </div>
    </div>
  )
}
