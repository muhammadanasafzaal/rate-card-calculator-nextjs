"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomResourceCalculator } from "@/components/calculators/custom-resource-calculator"
import { Calculator, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function HomePage() {
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

        {/* Calculator Tabs */}
        <div className="flex justify-center mb-8">
          <nav className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
            <Link
              href="/"
              className={`px-6 py-3 rounded-md transition-colors ${
                pathname === "/" ? "bg-blue-600 text-white" : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              <Calculator className="w-4 h-4 mr-2 inline" />
              Custom Resource
            </Link>
            <Link
              href="/swat-team"
              className={`px-6 py-3 rounded-md transition-colors ${
                pathname === "/swat-team"
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              <Users className="w-4 h-4 mr-2 inline" />
              SWAT Team
            </Link>
          </nav>
        </div>

        {/* Show only the Custom Resource Calculator on home page */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Calculator className="w-5 h-5" />
              Custom Resource Calculator
            </CardTitle>
            <CardDescription className="text-gray-400">
              Calculate monthly rates based on role, region, and seniority level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CustomResourceCalculator />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
