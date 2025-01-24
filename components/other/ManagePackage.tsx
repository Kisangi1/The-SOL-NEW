"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"

interface Package {
  id: string
  name: string
  description: string
  amount: number
  numberOfDays: number
  dayOrNight: string
  type: string
}

export function ManagePackages() {
  const [packages, setPackages] = useState<Package[]>([])
  const router = useRouter()

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const res = await fetch("/api/packages")
      if (res.ok) {
        const data = await res.json()
        setPackages(data)
      } else {
        console.error("Failed to fetch packages")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const handleEdit = (id: string) => {
    router.push(`/management-portal/edit-packages/${id}`)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this package?")) {
      try {
        const res = await fetch(`/api/packages/${id}`, {
          method: "DELETE",
        })
        if (res.ok) {
          toast.success("Package deleted successfully")
          fetchPackages()
        } else {
          const errorData = await res.json()
          toast.error(`Failed to delete package: ${errorData.error}`)
        }
      } catch (error) {
        console.error("Error:", error)
        toast.error("An unexpected error occurred")
      }
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Packages</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packages.map((pkg) => (
            <TableRow key={pkg.id}>
              <TableCell>{pkg.name}</TableCell>
              <TableCell>{pkg.description.substring(0, 50)}...</TableCell>
              <TableCell>kes{pkg.amount}/-</TableCell>
              <TableCell>
                {pkg.numberOfDays} {pkg.dayOrNight}s
              </TableCell>
              <TableCell>{pkg.type}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(pkg.id)} className="mr-2">
                  Edit
                </Button>
                <Button onClick={() => handleDelete(pkg.id)} variant="destructive">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

