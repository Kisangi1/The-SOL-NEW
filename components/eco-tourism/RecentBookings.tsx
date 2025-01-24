'use client'

import { useEffect, useState, useCallback } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

interface Booking {
  id: string
  name: string
  email: string
  startDate: string
  endDate: string
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED'
  package?: { name: string }
  destination?: { name: string }
  message?: string
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
          await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)))
          return fetchBookings(retryCount + 1, maxRetries)
        } else {
          console.error(`Failed to fetch bookings after ${maxRetries} attempts`)
          return
        }
      }
      const data = await response.json()
      // Take only the 4 most recent bookings
      const recentBookings = data
        .sort((a: Booking, b: Booking) => {
          const dateA = new Date(a.startDate).getTime()
          const dateB = new Date(b.startDate).getTime()
          return dateB - dateA
        })
        .slice(0, 4)
      setBookings(recentBookings)
    } catch (err) {
      console.error('Error fetching bookings:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const renderTableContent = () => {
    if (isLoading) {
      // Show only 4 skeleton rows while loading
      return Array(4).fill(0).map((_, index) => (
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
            <span className="font-medium text-sm">{booking.name}</span>
          </div>
        </TableCell>
        <TableCell className="text-sm">
          {formatDate(booking.startDate)}
        </TableCell>
        <TableCell className="hidden sm:table-cell text-sm">
          {booking.package?.name || booking.destination?.name || 'N/A'}
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
          <CardTitle className="text-lg sm:text-xl md:text-2xl">Recent Bookings</CardTitle>
          <CardDescription className="text-sm md:text-base">Latest 4 tours and expeditions</CardDescription>
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