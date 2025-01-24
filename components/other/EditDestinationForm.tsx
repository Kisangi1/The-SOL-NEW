"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface Destination {
  id: string
  name: string
  description: string
  imageData: string
  locations: string[]
  inclusive: string[]
  exclusive: string[]
  amount: number
  whatToCarry: string[]
}

export function EditDestinationForm({ destinationId }: { destinationId: string }) {
  const router = useRouter()
  const [destination, setDestination] = useState<Destination | null>(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [locations, setLocations] = useState("")
  const [inclusive, setInclusive] = useState("")
  const [exclusive, setExclusive] = useState("")
  const [amount, setAmount] = useState("")
  const [whatToCarry, setWhatToCarry] = useState("")

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const res = await fetch(`/api/destinations/${destinationId}`)
        if (res.ok) {
          const data = await res.json()
          setDestination(data)
          setName(data.name)
          setDescription(data.description)
          setLocations(data.locations.join(", "))
          setInclusive(data.inclusive.join(", "))
          setExclusive(data.exclusive.join(", "))
          setAmount(data.amount.toString())
          setWhatToCarry(data.whatToCarry.join(", "))
        } else {
          toast.error("Failed to fetch destination")
        }
      } catch (error) {
        console.error("Error:", error)
        toast.error("An unexpected error occurred")
      }
    }

    fetchDestination()
  }, [destinationId])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let imageData = destination?.imageData || ""
      if (imageFile) {
        const reader = new FileReader()
        imageData = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(imageFile)
        })
      }

      const res = await fetch(`/api/destinations/${destinationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          imageData,
          locations: locations.split(",").map((item) => item.trim()),
          inclusive: inclusive.split(",").map((item) => item.trim()),
          exclusive: exclusive.split(",").map((item) => item.trim()),
          amount: Number.parseFloat(amount),
          whatToCarry: whatToCarry.split(",").map((item) => item.trim()),
        }),
      })

      if (res.ok) {
        toast.success("Destination updated successfully")
        router.push("/management-portal/manage-destinations")
      } else {
        const errorData = await res.json()
        toast.error(`Failed to update destination: ${errorData.error}`)
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("An unexpected error occurred")
    }
  }

  if (!destination) {
    return <div>Loading...</div>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="imageUpload">Image Upload</Label>
        <Input id="imageUpload" type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div>
        <Label htmlFor="locations">Locations (comma-separated)</Label>
        <Input id="locations" value={locations} onChange={(e) => setLocations(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="inclusive">Inclusive (comma-separated)</Label>
        <Input id="inclusive" value={inclusive} onChange={(e) => setInclusive(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="exclusive">Exclusive (comma-separated)</Label>
        <Input id="exclusive" value={exclusive} onChange={(e) => setExclusive(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="whatToCarry">What to Carry (comma-separated)</Label>
        <Input id="whatToCarry" value={whatToCarry} onChange={(e) => setWhatToCarry(e.target.value)} required />
      </div>
      <Button type="submit">Update Destination</Button>
    </form>
  )
}

