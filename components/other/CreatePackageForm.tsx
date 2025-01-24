"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"

export function CreatePackageForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [amount, setAmount] = useState("")
  const [numberOfDays, setNumberOfDays] = useState("")
  const [dayOrNight, setDayOrNight] = useState("day")
  const [type, setType] = useState("")
  const [customType, setCustomType] = useState("")

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let imageData = ""
      if (imageFile) {
        const reader = new FileReader()
        imageData = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(imageFile)
        })
      }

      const packageType = type === "OTHER" ? customType : type

      const res = await fetch("/api/packages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          imageData,
          amount: Number(amount),
          numberOfDays: Number(numberOfDays),
          dayOrNight,
          type: packageType,
        }),
      })

      if (res.ok) {
        toast.success("Package created successfully")
        // Clear form data
        setName("")
        setDescription("")
        setImageFile(null)
        setAmount("")
        setNumberOfDays("")
        setDayOrNight("day")
        setType("")
        setCustomType("")
        router.push("/management-portal/manage-packages")
      } else {
        const errorData = await res.json()
        toast.error(`Failed to create package: ${errorData.error}`)
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("An unexpected error occurred")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Package Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="imageUpload">Image Upload</Label>
        <Input id="imageUpload" type="file" accept="image/*" onChange={handleImageChange} required />
      </div>
      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="numberOfDays">Number of Days</Label>
        <Input
          id="numberOfDays"
          type="number"
          value={numberOfDays}
          onChange={(e) => setNumberOfDays(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Day or Night</Label>
        <RadioGroup value={dayOrNight} onValueChange={setDayOrNight} className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="day" id="day" />
            <Label htmlFor="day">Day</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="night" id="night" />
            <Label htmlFor="night">Night</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label htmlFor="type">Package Type</Label>
        <Select value={type} onValueChange={setType} required>
          <SelectTrigger>
            <SelectValue placeholder="Select package type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="VALENTINE">Valentine</SelectItem>
            <SelectItem value="BIRTHDAY">Birthday</SelectItem>
            <SelectItem value="CHRISTMAS">Christmas</SelectItem>
            <SelectItem value="EASTER">Easter</SelectItem>
            <SelectItem value="EID">Eid</SelectItem>
            <SelectItem value="WEEKEND">Weekend</SelectItem>
            <SelectItem value="HONEYMOON">Honeymoon</SelectItem>
            <SelectItem value="OTHER">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {type === "OTHER" && (
        <div>
          <Label htmlFor="customType">Custom Package Type</Label>
          <Input id="customType" value={customType} onChange={(e) => setCustomType(e.target.value)} required />
        </div>
      )}
      <Button type="submit">Create Package</Button>
    </form>
  )
}

