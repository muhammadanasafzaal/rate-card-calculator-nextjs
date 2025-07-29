"use client"

import { useMemo } from "react"
import { supabase, type Role, type SeniorityLevel, type WorkloadOption, type DurationOption } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { useQuery } from "@tanstack/react-query" // Import useQuery

export function useSwatTeamCalculator() {
  const { toast } = useToast()

  // Fetch roles
  const { data: roles = [], isLoading: isLoadingRoles } = useQuery<Role[]>({
    queryKey: ["swatRoles"], // Different key to avoid conflict with custom resource roles if needed
    queryFn: async () => {
      const { data, error } = await supabase.from("roles").select("*").order("name")
      if (error) {
        console.error("Error fetching SWAT roles:", error)
        toast({
          title: "Data Loading Error",
          description: "Failed to load roles. Using fallback data.",
          variant: "destructive",
        })
        // Fallback data
        return [
          { id: "database-developer", name: "Database Developer", base_rate: 8000 },
          { id: "full-stack-developer", name: "Full Stack Developer", base_rate: 10000 },
          { id: "frontend-developer", name: "Frontend Developer", base_rate: 9000 },
          { id: "backend-developer", name: "Backend Developer", base_rate: 9500 },
          { id: "quality-assurance", name: "Quality Assurance", base_rate: 7000 },
        ]
      }
      return data || []
    },
    staleTime: Number.POSITIVE_INFINITY, // Data is static, cache indefinitely
  })

  // Fetch seniority levels
  const { data: seniorityLevels = [], isLoading: isLoadingSeniority } = useQuery<SeniorityLevel[]>({
    queryKey: ["swatSeniorityLevels"], // Different key
    queryFn: async () => {
      const { data, error } = await supabase.from("seniority_levels").select("*").order("multiplier")
      if (error) {
        console.error("Error fetching SWAT seniority levels:", error)
        toast({
          title: "Data Loading Error",
          description: "Failed to load seniority levels. Using fallback data.",
          variant: "destructive",
        })
        // Fallback data
        return [
          { id: "intermediate", name: "Intermediate", multiplier: 1.0 },
          { id: "advanced", name: "Advanced", multiplier: 1.25 },
          { id: "expert", name: "Expert", multiplier: 1.6 },
        ]
      }
      return data || []
    },
    staleTime: Number.POSITIVE_INFINITY, // Data is static, cache indefinitely
  })

  // Fetch workload options
  const { data: workloadOptions = [], isLoading: isLoadingWorkload } = useQuery<WorkloadOption[]>({
    queryKey: ["workloadOptions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("workload_options").select("*").order("percentage")
      if (error) {
        console.error("Error fetching workload options:", error)
        toast({
          title: "Data Loading Error",
          description: "Failed to load workload options. Using fallback data.",
          variant: "destructive",
        })
        // Fallback data
        return [
          { id: "2-days", label: "2 days/week (40%)", percentage: 40 },
          { id: "3-days", label: "3 days/week (60%)", percentage: 60 },
          { id: "4-days", label: "4 days/week (80%)", percentage: 80 },
          { id: "full-time", label: "Full-time (100%)", percentage: 100 },
        ]
      }
      return data || []
    },
    staleTime: Number.POSITIVE_INFINITY, // Data is static, cache indefinitely
  })

  // Fetch duration options
  const { data: durationOptions = [], isLoading: isLoadingDuration } = useQuery<DurationOption[]>({
    queryKey: ["durationOptions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("duration_options").select("*").order("months")
      if (error) {
        console.error("Error fetching duration options:", error)
        toast({
          title: "Data Loading Error",
          description: "Failed to load duration options. Using fallback data.",
          variant: "destructive",
        })
        // Fallback data
        return [
          { id: "1-month", label: "1 month", months: 1, discount: 0 },
          { id: "2-months", label: "2 months", months: 2, discount: 5 },
          { id: "3-months", label: "3 months", months: 3, discount: 10 },
          { id: "4-months", label: "4 months", months: 4, discount: 15 },
          { id: "6-months", label: "6 months", months: 6, discount: 15 },
          { id: "12-months", label: "12 months", months: 12, discount: 15 },
        ]
      }
      return data || []
    },
    staleTime: Number.POSITIVE_INFINITY, // Data is static, cache indefinitely
  })

  const isLoading = isLoadingRoles || isLoadingSeniority || isLoadingWorkload || isLoadingDuration

  const calculateRate = useMemo(
    () =>
      (roleId: string, seniorityId: string, workloadId: string, durationId: string): number => {
        if (!roleId || !seniorityId || !workloadId || !durationId) return 0

        const role = roles.find((r) => r.id === roleId)
        const seniority = seniorityLevels.find((s) => s.id === seniorityId)
        const workload = workloadOptions.find((w) => w.id === workloadId)
        const duration = durationOptions.find((d) => d.id === durationId)

        if (!role || !seniority || !workload || !duration) return 0

        // Formula: ((Base Rate × Seniority) × Workload%) × Duration Discount × Pre-negotiated Discount
        const baseWithSeniority = role.base_rate * seniority.multiplier
        const withWorkload = baseWithSeniority * (workload.percentage / 100)
        const withDurationDiscount = withWorkload * (1 - duration.discount / 100)
        const withSwatDiscount = withDurationDiscount * 0.8 // 20% SWAT team discount

        return Math.round(withSwatDiscount)
      },
    [roles, seniorityLevels, workloadOptions, durationOptions],
  )

  return {
    roles,
    seniorityLevels,
    workloadOptions,
    durationOptions,
    calculateRate,
    isLoading,
  }
}
