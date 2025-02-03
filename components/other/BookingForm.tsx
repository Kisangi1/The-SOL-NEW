"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface BookingFormProps {
  packageId?: string
  destinationId?: string
}

export function BookingForm({ packageId, destinationId }: BookingFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageId,
          destinationId,
          name,
          email,
          startDate,
          endDate,
          message,
        }),
      })

      if (res.ok) {
        toast.success("Booking created successfully")
        // Clear form fields
        setName("")
        setEmail("")
        setStartDate("")
        setEndDate("")
        setMessage("")
      } else {
        const errorData = await res.json()
        toast.error(`Failed to create booking: ${errorData.error}`)
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("An unexpected error occurred")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-sans">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="startDate">Start Date</Label>
        <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="endDate">End Date</Label>
        <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <Button type="submit" className="bg-amber-600 text-white hover:bg-amber-700">
  Book Now
</Button>

    </form>
  )
}