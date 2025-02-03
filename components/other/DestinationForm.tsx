// components/other/DestinationForm.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface DestinationFormProps {
  initialData?: {
    id?: string
    name: string
    title: string
    description: string
    bestTimeToTravel: string
    whatToCarry: string[]
    location: string
    imageUrl?: string
  }
}

export function DestinationForm({ initialData }: DestinationFormProps) {
  const [name, setName] = useState(initialData?.name || "")
  const [title, setTitle] = useState(initialData?.title || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [bestTimeToTravel, setBestTimeToTravel] = useState(initialData?.bestTimeToTravel || "")
  const [location, setLocation] = useState(initialData?.location || "")
  const [whatToCarry, setWhatToCarry] = useState(initialData?.whatToCarry?.join(", ") || "")
  const [image, setImage] = useState<File | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", name)
    formData.append("title", title)
    formData.append("description", description)
    formData.append("bestTimeToTravel", bestTimeToTravel)
    formData.append("location", location)
    formData.append("whatToCarry", JSON.stringify(whatToCarry.split(",").map(item => item.trim())))
    
    if (image) {
      formData.append("image", image)
    }

    try {
      const url = initialData?.id 
        ? `/api/destinations/${initialData.id}` 
        : "/api/destinations"
      
      const method = initialData?.id ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        body: formData,
      })

      if (res.ok) {
        toast.success(`Destination ${initialData?.id ? 'updated' : 'created'} successfully`)
        router.push("/management-portal/manage-destinations")
      } else {
        const errorData = await res.json()
        toast.error(`Failed to ${initialData?.id ? 'update' : 'create'} destination: ${errorData.error}`)
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("An unexpected error occurred")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input 
          id="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
      </div>
      <div>
        <Label htmlFor="bestTimeToTravel">Best Time to Travel</Label>
        <Input 
          id="bestTimeToTravel" 
          value={bestTimeToTravel} 
          onChange={(e) => setBestTimeToTravel(e.target.value)} 
          required 
        />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input 
          id="location" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          required 
        />
      </div>
      <div>
        <Label htmlFor="whatToCarry">What to Carry (comma-separated)</Label>
        <Textarea 
          id="whatToCarry" 
          value={whatToCarry} 
          onChange={(e) => setWhatToCarry(e.target.value)} 
          placeholder="Sunscreen, Hiking boots, Water bottle"
        />
      </div>
      <div>
        <Label htmlFor="image">Image</Label>
        <Input 
          id="image" 
          type="file" 
          onChange={(e) => setImage(e.target.files?.[0] || null)} 
          accept="image/*"
        />
      </div>
      <Button type="submit">
        {initialData?.id ? 'Update Destination' : 'Create Destination'}
      </Button>
    </form>
  )
}