// app/management-portal/edit-destination/[id]/page.tsx
"use client"

import { useState, useEffect } from "react"
import { DestinationForm } from "@/components/other/DestinationForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function EditDestinationPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const [initialData, setInitialData] = useState(null)

  useEffect(() => {
    async function fetchDestination() {
      try {
        const res = await fetch(`/api/destinations/${params.id}`)
        if (res.ok) {
          const data = await res.json()
          setInitialData({
            ...data,
            whatToCarry: data.whatToCarry || []
          })
        } else {
          toast.error("Failed to fetch destination details")
        }
      } catch (error) {
        toast.error(`An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}`)
      }
    }

    fetchDestination()
  }, [params.id])

  if (!initialData) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Destination</CardTitle>
        </CardHeader>
        <CardContent>
          <DestinationForm initialData={initialData} />
        </CardContent>
      </Card>
    </div>
  )
}