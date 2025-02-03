// app/management-portal/manage-destinations/manage-destinations-client.tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHeader, 
  TableHead, 
  TableRow 
} from "@/components/ui/table"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose 
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Image from "next/image"
import { Pencil, Trash2, PlusCircle } from "lucide-react"

interface Destination {
  id: string
  name: string
  title: string
  location: string
  imageUrl?: string
  createdAt: string
}

export default function ManageDestinationsClient() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchDestinations()
  }, [page])

  const fetchDestinations = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/destinations?page=${page}`)
      const data = await res.json()
      setDestinations(data.destinations)
      setTotalPages(data.totalPages)
      setLoading(false)
    } catch (error: unknown) {
      toast.error(`Failed to fetch destinations: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/destinations/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success("Destination deleted successfully")
        fetchDestinations()
      } else {
        toast.error("Failed to delete destination")
      }
    } catch (error: unknown) {
      toast.error(`An unexpected error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage Destinations</CardTitle>
          <Button 
            onClick={() => router.push("/management-portal/create-destination")}
            className="flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Create Destination
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Loading destinations...</div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {destinations.map((destination) => (
                    <TableRow key={destination.id}>
                      <TableCell>
                        {destination.imageUrl ? (
                          <Image 
                            src={destination.imageUrl} 
                            alt={destination.name} 
                            width={50} 
                            height={50} 
                            className="rounded-md object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
                        )}
                      </TableCell>
                      <TableCell>{destination.name}</TableCell>
                      <TableCell>{destination.title}</TableCell>
                      <TableCell>{destination.location}</TableCell>
                      <TableCell>
                        {new Date(destination.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => router.push(`/management-portal/edit-destinations/${destination.id}`)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="destructive" size="icon">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Delete Destination</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete {destination.name}? 
                                  This action cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="flex justify-end space-x-2">
                                <DialogClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button 
                                  variant="destructive" 
                                  onClick={() => handleDelete(destination.id)}
                                >
                                  Confirm Delete
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex justify-center items-center space-x-2 mt-4">
                <Button 
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage(prev => prev - 1)}
                >
                  Previous
                </Button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <Button 
                  variant="outline"
                  disabled={page === totalPages}
                  onClick={() => setPage(prev => prev + 1)}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}