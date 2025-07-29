"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCustomResourceCalculator } from "@/hooks/use-custom-resource-calculator"
import { useCurrencyConverter } from "@/hooks/use-currency-converter"
import { EmailQuoteDialog } from "@/components/email-quote-dialog"
import { Mail, Download } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export function CustomResourceCalculator() {
  const [region, setRegion] = useState<string>("")
  const [role, setRole] = useState<string>("")
  const [seniority, setSeniority] = useState<string>("")
  const [selectedCurrency, setSelectedCurrency] = useState<string>("AED")
  const [showEmailDialog, setShowEmailDialog] = useState(false)

  const { calculateRate, regions, roles, seniorityLevels } = useCustomResourceCalculator()
  const { convertCurrency, currencies, exchangeRates, isLoading: currencyLoading } = useCurrencyConverter()

  const baseRate = calculateRate(region, role, seniority)
  const convertedRate = convertCurrency(baseRate, "AED", selectedCurrency)

  const calculationDetails = {
    type: "Custom Resource",
    region,
    role,
    seniority,
    currency: selectedCurrency,
    baseRate,
    convertedRate,
    exchangeRate: exchangeRates[selectedCurrency] || 1,
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Region Selection */}
        <div className="space-y-2">
          <Label htmlFor="region" className="text-sm font-medium text-gray-300">
            Region
          </Label>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {regions.map((r) => (
                <SelectItem key={r.id} value={r.id} className="text-white hover:bg-gray-600">
                  {r.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Role Selection */}
        <div className="space-y-2">
          <Label htmlFor="role" className="text-sm font-medium text-gray-300">
            Role
          </Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {roles.map((r) => (
                <SelectItem key={r.id} value={r.id} className="text-white hover:bg-gray-600">
                  {r.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Currency Selection */}
        <div className="space-y-2">
          <Label htmlFor="currency" className="text-sm font-medium text-gray-300">
            Currency
          </Label>
          <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code} className="text-white hover:bg-gray-600">
                  {currency.code} - {currency.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Seniority Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-300">Seniority Level</Label>
          <RadioGroup value={seniority} onValueChange={setSeniority} className="flex flex-col space-y-2">
            {seniorityLevels.map((level) => (
              <div key={level.id} className="flex items-center space-x-2">
                <RadioGroupItem value={level.id} id={level.id} className="border-gray-600 text-blue-400" />
                <Label htmlFor={level.id} className="text-sm text-gray-300 cursor-pointer">
                  {level.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      {/* Rate Display */}
      {baseRate > 0 && (
        <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/50">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div>
                <p className="text-sm text-gray-400 mb-2">Monthly Rate</p>
                <p className="text-4xl font-bold text-white">{formatCurrency(convertedRate, selectedCurrency)}</p>
                {selectedCurrency !== "AED" && (
                  <p className="text-sm text-gray-400 mt-2">
                    Base rate: {formatCurrency(baseRate, "AED")} | Exchange rate: 1 AED ={" "}
                    {exchangeRates[selectedCurrency]?.toFixed(4)} {selectedCurrency}
                  </p>
                )}
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => setShowEmailDialog(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={!region || !role || !seniority}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Quote
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  disabled={!region || !role || !seniority}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Calculation Breakdown */}
      {baseRate > 0 && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Calculation Breakdown</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Base Rate:</span>
                <span className="ml-2 text-white">
                  {formatCurrency(roles.find((r) => r.id === role)?.baseRate || 0, "AED")}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Regional Multiplier:</span>
                <span className="ml-2 text-white">{regions.find((r) => r.id === region)?.multiplier}×</span>
              </div>
              <div>
                <span className="text-gray-400">Seniority Multiplier:</span>
                <span className="ml-2 text-white">{seniorityLevels.find((s) => s.id === seniority)?.multiplier}×</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <EmailQuoteDialog
        open={showEmailDialog}
        onOpenChange={setShowEmailDialog}
        calculationDetails={calculationDetails}
      />
    </div>
  )
}
