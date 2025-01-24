"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface Booking {
  id: string
  name: string
  email: string
  startDate: string
  endDate: string
  status: string
  packageName?: string
  destinationName?: string
}

export function ManageBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings")
      if (res.ok) {
        const data = await res.json()
        setBookings(data)
      } else {
        console.error("Failed to fetch bookings")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const handleApprove = async (id: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}/approve`, { method: "POST" })
      if (res.ok) {
        toast.success("Booking approved successfully")
        fetchBookings()
      } else {
        toast.error("Failed to approve booking")
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("An unexpected error occurred")
    }
  }

  const handleReject = async (id: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}/reject`, { method: "POST" })
      if (res.ok) {
        toast.success("Booking rejected successfully")
        fetchBookings()
      } else {
        toast.error("Failed to reject booking")
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("An unexpected error occurred")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <Badge className="bg-green-500">Approved</Badge>
      case "REJECTED":
        return <Badge className="bg-red-500">Rejected</Badge>
      default:
        return <Badge className="bg-yellow-500">Pending</Badge>
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Bookings</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Package/Destination</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.name}</TableCell>
              <TableCell>{booking.email}</TableCell>
              <TableCell>{new Date(booking.startDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(booking.endDate).toLocaleDateString()}</TableCell>
              <TableCell>{booking.packageName || booking.destinationName}</TableCell>
              <TableCell>{getStatusBadge(booking.status)}</TableCell>
              <TableCell>
                {booking.status === "PENDING" && (
                  <>
                    <Button onClick={() => handleApprove(booking.id)} className="mr-2">
                      Approve
                    </Button>
                    <Button onClick={() => handleReject(booking.id)} variant="destructive">
                      Reject
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

