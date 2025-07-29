"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSwatTeamCalculator } from "@/hooks/use-swat-team-calculator"
import { useCurrencyConverter } from "@/hooks/use-currency-converter"
import { EmailQuoteDialog } from "@/components/email-quote-dialog"
import { Mail, Download, Percent, Clock, Users } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export function SwatTeamCalculator() {
  const [role, setRole] = useState<string>("")
  const [seniority, setSeniority] = useState<string>("")
  const [workload, setWorkload] = useState<string>("")
  const [duration, setDuration] = useState<string>("")
  const [selectedCurrency, setSelectedCurrency] = useState<string>("AED")
  const [showEmailDialog, setShowEmailDialog] = useState(false)

  const { calculateRate, roles, seniorityLevels, workloadOptions, durationOptions } = useSwatTeamCalculator()
  const { convertCurrency, currencies, exchangeRates } = useCurrencyConverter()

  const baseRate = calculateRate(role, seniority, workload, duration)
  const convertedRate = convertCurrency(baseRate, "AED", selectedCurrency)

  const selectedWorkload = workloadOptions.find((w) => w.id === workload)
  const selectedDuration = durationOptions.find((d) => d.id === duration)

  const calculationDetails = {
    type: "SWAT Team",
    role,
    seniority,
    workload: selectedWorkload?.label || "",
    duration: selectedDuration?.label || "",
    currency: selectedCurrency,
    baseRate,
    convertedRate,
    exchangeRate: exchangeRates[selectedCurrency] || 1,
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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

        {/* Seniority Selection */}
        <div className="space-y-2">
          <Label htmlFor="seniority" className="text-sm font-medium text-gray-300">
            Seniority
          </Label>
          <Select value={seniority} onValueChange={setSeniority}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Select seniority" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {seniorityLevels.map((s) => (
                <SelectItem key={s.id} value={s.id} className="text-white hover:bg-gray-600">
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Workload Selection */}
        <div className="space-y-2">
          <Label htmlFor="workload" className="text-sm font-medium text-gray-300">
            Workload
          </Label>
          <Select value={workload} onValueChange={setWorkload}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Select workload" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {workloadOptions.map((w) => (
                <SelectItem key={w.id} value={w.id} className="text-white hover:bg-gray-600">
                  {w.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Duration Selection */}
        <div className="space-y-2">
          <Label htmlFor="duration" className="text-sm font-medium text-gray-300">
            Duration
          </Label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {durationOptions.map((d) => (
                <SelectItem key={d.id} value={d.id} className="text-white hover:bg-gray-600">
                  {d.label}
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
      </div>

      {/* Discount Badges */}
      {(selectedDuration || selectedWorkload) && (
        <div className="flex flex-wrap gap-2">
          {selectedDuration && selectedDuration.discount > 0 && (
            <Badge variant="secondary" className="bg-green-900/50 text-green-300 border-green-700">
              <Clock className="w-3 h-3 mr-1" />
              Duration Discount: -{selectedDuration.discount}%
            </Badge>
          )}
          <Badge variant="secondary" className="bg-purple-900/50 text-purple-300 border-purple-700">
            <Users className="w-3 h-3 mr-1" />
            SWAT Team Discount: -20%
          </Badge>
          {selectedWorkload && (
            <Badge variant="secondary" className="bg-blue-900/50 text-blue-300 border-blue-700">
              <Percent className="w-3 h-3 mr-1" />
              Workload: {selectedWorkload.percentage}%
            </Badge>
          )}
        </div>
      )}

      {/* Rate Display */}
      {baseRate > 0 && (
        <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/50">
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
                  className="bg-purple-600 hover:bg-purple-700"
                  disabled={!role || !seniority || !workload || !duration}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Quote
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  disabled={!role || !seniority || !workload || !duration}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Base Rate:</span>
                <span className="ml-2 text-white">
                  {formatCurrency(roles.find((r) => r.id === role)?.baseRate || 0, "AED")}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Seniority Multiplier:</span>
                <span className="ml-2 text-white">{seniorityLevels.find((s) => s.id === seniority)?.multiplier}×</span>
              </div>
              <div>
                <span className="text-gray-400">Workload:</span>
                <span className="ml-2 text-white">{selectedWorkload?.percentage}%</span>
              </div>
              <div>
                <span className="text-gray-400">Total Discounts:</span>
                <span className="ml-2 text-white">-{(selectedDuration?.discount || 0) + 20}%</span>
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
