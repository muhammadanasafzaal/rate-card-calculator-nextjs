// Centralized type definitions
export interface Region {
  id: string
  name: string
  multiplier: number
  created_at?: string
}

export interface Role {
  id: string
  name: string
  base_rate: number
  category?: string
  created_at?: string
}

export interface SeniorityLevel {
  id: string
  name: string
  multiplier: number
  created_at?: string
}

export interface WorkloadOption {
  id: string
  label: string
  percentage: number
  created_at?: string
}

export interface DurationOption {
  id: string
  label: string
  months: number
  discount: number
  created_at?: string
}

export interface Currency {
  code: string
  name: string
  symbol: string
  exchange_rate: number
  last_updated?: string
}

export interface Quote {
  id?: number
  email: string
  name: string
  company?: string
  calculator_type: string
  role_id: string
  seniority_id: string
  region_id?: string
  workload_id?: string
  duration_id?: string
  currency: string
  base_rate: number
  final_rate: number
  message?: string
  created_at?: string
}

export interface CalculationDetails {
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
