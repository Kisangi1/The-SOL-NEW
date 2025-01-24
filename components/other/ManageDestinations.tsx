"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"

interface Destination {
  id: string
  name: string
  description: string
  amount: number
}

export function ManageDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const router = useRouter()

  useEffect(() => {
    fetchDestinations()
  }, [])

  const fetchDestinations = async () => {
    try {
      const res = await fetch("/api/destinations")
      if (res.ok) {
        const data = await res.json()
        setDestinations(data)
      } else {
        console.error("Failed to fetch destinations")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const handleEdit = (id: string) => {
    router.push(`/management-portal/edit-destinations/${id}`)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this destination?")) {
      try {
        const res = await fetch(`/api/destinations/${id}`, {
          method: "DELETE",
        })
        if (res.ok) {
          toast.success("Destination deleted successfully")
          fetchDestinations()
        } else {
          const errorData = await res.json()
          toast.error(`Failed to delete destination: ${errorData.error}`)
        }
      } catch (error) {
        console.error("Error:", error)
        toast.error("An unexpected error occurred")
      }
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Destinations</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {destinations.map((destination) => (
            <TableRow key={destination.id}>
              <TableCell>{destination.name}</TableCell>
              <TableCell>{destination.description.substring(0, 100)}...</TableCell>
              <TableCell>kes{destination.amount}/-</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(destination.id)} className="mr-2">
                  Edit
                </Button>
                <Button onClick={() => handleDelete(destination.id)} variant="destructive">
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

