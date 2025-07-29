"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SwatTeamCalculator } from "@/components/calculators/swat-team-calculator"
import { Calculator, Users } from "lucide-react"

export default function SwatTeamPage() {
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
              className="px-6 py-3 rounded-md transition-colors text-gray-300 hover:text-white hover:bg-gray-700 flex items-center"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Custom Resource
            </Link>
            <div className="px-6 py-3 rounded-md bg-purple-600 text-white flex items-center">
              <Users className="w-4 h-4 mr-2" />
              SWAT Team
            </div>
          </nav>
        </div>

        {/* SWAT Team Calculator */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Users className="w-5 h-5" />
              SWAT Team Calculator
            </CardTitle>
            <CardDescription className="text-gray-400">
              Calculate rates with workload flexibility and duration discounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SwatTeamCalculator />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
