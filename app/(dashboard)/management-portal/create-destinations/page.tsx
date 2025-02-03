// app/management-portal/create-destination/page.tsx
"use client"

import { DestinationForm } from "@/components/other/DestinationForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CreateDestinationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Destination</CardTitle>
        </CardHeader>
        <CardContent>
          <DestinationForm />
        </CardContent>
      </Card>
    </div>
  )
}

