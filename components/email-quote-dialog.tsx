"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Mail, Send, Loader2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface CalculationDetails {
  type: string
  region?: string
  role: string
  seniority: string
  workload?: string
  duration?: string
  currency: string
  baseRate: number
  convertedRate: number
  exchangeRate: number
}

interface EmailQuoteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  calculationDetails: CalculationDetails
}

export function EmailQuoteDialog({ open, onOpenChange, calculationDetails }: EmailQuoteDialogProps) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSendEmail = async () => {
    if (!email || !name) {
      toast({
        title: "Missing Information",
        description: "Please provide your name and email address.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          name,
          company,
          message,
          calculationDetails,
        }),
      })

      if (response.ok) {
        toast({
          title: "Quote Sent Successfully",
          description: "Your rate quote has been sent to your email address.",
        })
        onOpenChange(false)
        // Reset form
        setEmail("")
        setName("")
        setCompany("")
        setMessage("")
      } else {
        throw new Error("Failed to send email")
      }
    } catch (error) {
      toast({
        title: "Failed to Send Quote",
        description: "There was an error sending your quote. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-400">
            <Mail className="w-5 h-5" />
            Email Rate Quote
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Send this rate calculation to your email for future reference.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Quote Summary */}
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">{calculationDetails.type} Quote</h4>
            <div className="text-sm space-y-1 text-gray-300">
              <div>Role: {calculationDetails.role}</div>
              <div>Seniority: {calculationDetails.seniority}</div>
              {calculationDetails.region && <div>Region: {calculationDetails.region}</div>}
              {calculationDetails.workload && <div>Workload: {calculationDetails.workload}</div>}
              {calculationDetails.duration && <div>Duration: {calculationDetails.duration}</div>}
            </div>
            <div className="text-lg font-bold text-blue-400 mt-2">
              {formatCurrency(calculationDetails.convertedRate, calculationDetails.currency)}/month
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm text-gray-300">
                  Name *
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm text-gray-300">
                  Company
                </Label>
                <Input
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Company name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-gray-300">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm text-gray-300">
                Additional Message
              </Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Any additional requirements or questions..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSendEmail} disabled={isLoading} className="flex-1 bg-blue-600 hover:bg-blue-700">
              {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
              Send Quote
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
