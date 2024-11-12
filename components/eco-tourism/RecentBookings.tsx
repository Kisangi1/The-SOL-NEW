'use client'

import { useEffect, useState, useCallback } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, RefreshCw } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

interface Booking {
  id: string
  firstname: string
  lastname: string
  email: string
  phone: string
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED'
  bookingDate: string | null
  numberOfGuests: number
  specialRequests: string
  destinationName: string
  price: string
}

interface BookingsResponse {
  bookings: Booking[]
  total: number
  page: number
  totalPages: number
}

export default function RecentBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchBookings = useCallback(async (retryCount = 0, maxRetries = 3) => {
    if (retryCount === 0) {
      setIsLoading(true)
    }
    try {
      const response = await fetch('/api/bookings')
      if (response.status !== 200) {
        if (retryCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1))) // Exponential backoff
          return fetchBookings(retryCount + 1, maxRetries)
        } else {
          console.error(`Failed to fetch bookings after ${maxRetries} attempts`)
          return
        }
      }
      const data: BookingsResponse = await response.json()
      setBookings(data.bookings)
    } catch (err) {
      console.error('Error fetching bookings:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const renderTableContent = () => {
    if (isLoading) {
      return Array(5).fill(0).map((_, index) => (
        <TableRow key={index}>
          <TableCell><Skeleton className="h-6 w-full" /></TableCell>
          <TableCell><Skeleton className="h-6 w-full" /></TableCell>
          <TableCell className="hidden sm:table-cell"><Skeleton className="h-6 w-full" /></TableCell>
          <TableCell><Skeleton className="h-6 w-20" /></TableCell>
        </TableRow>
      ))
    }

    if (bookings.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={4} className="text-center py-4">No bookings found</TableCell>
        </TableRow>
      )
    }

    return bookings.map((booking) => (
      <TableRow key={booking.id} className="hover:bg-muted/50">
        <TableCell>
          <div className="flex flex-col space-y-1">
            <span className="font-medium text-sm">{`${booking.firstname} ${booking.lastname}`}</span>
            <div className="flex items-center text-xs text-muted-foreground">
              <Users className="mr-1 h-3 w-3" />
              <span>{booking.numberOfGuests}</span>
            </div>
          </div>
        </TableCell>
        <TableCell className="text-sm">
          {formatDate(booking.bookingDate)}
        </TableCell>
        <TableCell className="hidden sm:table-cell text-sm">
          {booking.destinationName}
        </TableCell>
        <TableCell>
          <Badge
            variant={
              booking.status === 'COMPLETED' ? 'default' :
              booking.status === 'PENDING' ? 'secondary' :
              'destructive'
            }
            className="capitalize text-xs"
          >
            {booking.status.toLowerCase()}
          </Badge>
        </TableCell>
      </TableRow>
    ))
  }

  return (
    <Card className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg sm:text-xl md:text-2xl">Travel Bookings</CardTitle>
          <CardDescription className="text-sm md:text-base">Recent tours and expeditions</CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fetchBookings()}
          disabled={isLoading}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[40%] sm:w-[30%]">Traveler</TableHead>
                <TableHead className="w-[20%]">Date</TableHead>
                <TableHead className="hidden sm:table-cell">Destination</TableHead>
                <TableHead className="w-[20%]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {renderTableContent()}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}