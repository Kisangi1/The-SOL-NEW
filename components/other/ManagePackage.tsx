// components/ManagePackages.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Package {
  id: string
  name: string
  details: string
  amount: number
  duration: number
  nights: number
  type: string
}

interface PackagesResponse {
  packages: Package[]
  total: number
  totalPages: number
}

const TableRowSkeleton = () => (
  <TableRow className="hover:bg-gray-50">
    <TableCell className="w-48">
      <div className="h-4 bg-gray-200 rounded animate-pulse" />
    </TableCell>
    <TableCell className="max-w-xs">
      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
    </TableCell>
    <TableCell>
      <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
    </TableCell>
    <TableCell>
      <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
    </TableCell>
    <TableCell>
      <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
    </TableCell>
    <TableCell>
      <div className="flex space-x-2">
        <div className="h-9 w-16 bg-gray-200 rounded animate-pulse" />
        <div className="h-9 w-16 bg-gray-200 rounded animate-pulse" />
      </div>
    </TableCell>
  </TableRow>
)

export function ManagePackages() {
  const [packages, setPackages] = useState<Package[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const res = await fetch("/api/packages")
      if (!res.ok) {
        throw new Error(`Failed to fetch packages: ${res.statusText}`)
      }
      const data: PackagesResponse = await res.json()
      setPackages(data.packages)
    } catch (error) {
      console.error("Error:", error)
      setError(error instanceof Error ? error.message : "Failed to load packages")
      toast.error("Failed to load packages")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (id: string) => {
    router.push(`/management-portal/edit-packages/${id}`)
  }

  const confirmDelete = (id: string) => {
    setDeleteId(id)
    setIsDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!deleteId) return

    try {
      const res = await fetch(`/api/packages/${deleteId}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || `Failed to delete package: ${res.statusText}`)
      }

      toast.success("Package deleted successfully")
      fetchPackages()
      router.refresh()
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to delete package")
    } finally {
      setIsDeleteDialogOpen(false)
      setDeleteId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6 font-sans">
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-9 w-32 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Description</TableHead>
                <TableHead className="font-semibold">Amount</TableHead>
                <TableHead className="font-semibold">Duration</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, index) => (
                <TableRowSkeleton key={index} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-red-600">Error: {error}</p>
        <Button onClick={fetchPackages} variant="outline">
          Try Again
        </Button>
      </div>
    )
  }

  if (packages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-gray-600">No packages found</p>
        <Button 
          onClick={() => router.push('/management-portal/create-packages')}
          className="bg-amber-600 hover:bg-amber-700"
        >
          Create New Package
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Manage Packages</h2>
          <Button 
            onClick={() => router.push('/management-portal/create-packages')}
            className="bg-amber-600 hover:bg-amber-700"
          >
            Add New Package
          </Button>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Description</TableHead>
                <TableHead className="font-semibold">Amount</TableHead>
                <TableHead className="font-semibold">Duration</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packages.map((pkg) => (
                <TableRow key={pkg.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{pkg.name}</TableCell>
                  <TableCell className="max-w-xs">
                    {pkg.details.length > 100 ? `${pkg.details.substring(0, 100)}...` : pkg.details}
                  </TableCell>
                  <TableCell>KES {pkg.amount.toLocaleString()}/-</TableCell>
                  <TableCell>
                    {pkg.duration} days, {pkg.nights} nights
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                      {pkg.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => handleEdit(pkg.id)} 
                        variant="outline"
                        className="text-amber-600 border-amber-600 hover:bg-amber-50"
                      >
                        Edit
                      </Button>
                      <Button 
                        onClick={() => confirmDelete(pkg.id)} 
                        variant="destructive"
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the package.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default ManagePackages