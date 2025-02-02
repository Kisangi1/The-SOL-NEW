"use client"

import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter } from 'lucide-react'

const packageTypes = [
  "VALENTINE",
  "CHRISTMAS",
  "EASTER",
  "EID",
  "MADARAKA",
  "WEEKEND",
  "HONEYMOON",
  "OTHER"
] as const

interface PackageFilterProps {
  currentType: string | undefined
}

export function PackageFilter({ currentType }: PackageFilterProps) {
  const router = useRouter()

  const handleChange = (value: string) => {
    const url = new URL(window.location.href)
    if (value === "ALL") {
      url.searchParams.delete('type')
    } else {
      url.searchParams.set('type', value)
    }
    url.searchParams.delete('page')
    router.push(url.toString())
  }

  return (
    <div className="relative mb-8">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Filter className="h-4 w-4 text-amber-600" />
          <span className="text-sm font-medium text-gray-600">
            Browse by Category
          </span>
        </div>
        <Select
          value={currentType || "ALL"}
          onValueChange={handleChange}
        >
          <SelectTrigger className="w-full bg-white border-amber-200 hover:border-amber-300 focus:ring-amber-500 transition-colors">
            <SelectValue placeholder="All Package Types" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="ALL" className="hover:bg-amber-50">
              All Types
            </SelectItem>
            {packageTypes.map((packageType) => (
              <SelectItem 
                key={packageType} 
                value={packageType}
                className="hover:bg-amber-50 transition-colors"
              >
                {packageType.charAt(0) + packageType.slice(1).toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}