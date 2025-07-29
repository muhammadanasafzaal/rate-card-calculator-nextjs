"use client"

import { useMemo } from "react"
import { supabase, type Region, type Role, type SeniorityLevel } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { useQuery } from "@tanstack/react-query" // Import useQuery

export function useCustomResourceCalculator() {
  const { toast } = useToast()

  // Fetch regions
  const { data: regions = [], isLoading: isLoadingRegions } = useQuery<Region[]>({
    queryKey: ["regions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("regions").select("*").order("name")
      if (error) {
        console.error("Error fetching regions:", error)
        toast({
          title: "Data Loading Error",
          description: "Failed to load regions. Using fallback data.",
          variant: "destructive",
        })
        // Fallback data
        return [
          { id: "euro-asia", name: "Euro Asia", multiplier: 1.0 },
          { id: "middle-east", name: "Middle East", multiplier: 1.15 },
          { id: "europe", name: "Europe", multiplier: 1.3 },
          { id: "north-america", name: "North America", multiplier: 1.4 },
        ]
      }
      return data || []
    },
    staleTime: Number.POSITIVE_INFINITY, // Data is static, cache indefinitely
  })

  // Fetch roles
  const { data: roles = [], isLoading: isLoadingRoles } = useQuery<Role[]>({
    queryKey: ["roles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("roles").select("*").order("name")
      if (error) {
        console.error("Error fetching roles:", error)
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
          { id: "mobile-developer", name: "Mobile Developer", base_rate: 9500 },
          { id: "devops-engineer", name: "DevOps Engineer", base_rate: 11000 },
          { id: "quality-assurance", name: "Quality Assurance", base_rate: 7000 },
          { id: "ui-ux-designer", name: "UI/UX Designer", base_rate: 8500 },
          { id: "project-manager", name: "Project Manager", base_rate: 12000 },
          { id: "business-analyst", name: "Business Analyst", base_rate: 9000 },
        ]
      }
      return data || []
    },
    staleTime: Number.POSITIVE_INFINITY, // Data is static, cache indefinitely
  })

  // Fetch seniority levels
  const { data: seniorityLevels = [], isLoading: isLoadingSeniority } = useQuery<SeniorityLevel[]>({
    queryKey: ["seniorityLevels"],
    queryFn: async () => {
      const { data, error } = await supabase.from("seniority_levels").select("*").order("multiplier")
      if (error) {
        console.error("Error fetching seniority levels:", error)
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

  const isLoading = isLoadingRegions || isLoadingRoles || isLoadingSeniority

  const calculateRate = useMemo(
    () =>
      (regionId: string, roleId: string, seniorityId: string): number => {
        if (!regionId || !roleId || !seniorityId) return 0

        const region = regions.find((r) => r.id === regionId)
        const role = roles.find((r) => r.id === roleId)
        const seniority = seniorityLevels.find((s) => s.id === seniorityId)

        if (!region || !role || !seniority) return 0

        // Formula: Base Role Rate × Regional Multiplier × Seniority Multiplier
        return Math.round(role.base_rate * region.multiplier * seniority.multiplier)
      },
    [regions, roles, seniorityLevels],
  )

  return {
    regions,
    roles,
    seniorityLevels,
    calculateRate,
    isLoading,
  }
}
