// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { toast } from "sonner"

// export default function CreatePackagePage() {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(false)
//   const [imageData, setImageData] = useState<string | null>(null)

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setImageData(reader.result as string)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setIsLoading(true)
//     const formData = new FormData(e.currentTarget)

//     const packageData = {
//       name: formData.get("name") as string,
//       location: formData.get("location") as string,
//       imageData: imageData,
//       duration: formData.get("duration") as string,
//       groupSize: formData.get("groupSize") as string,
//       price: Number.parseFloat(formData.get("price") as string),
//       description: formData.get("description") as string,
//       included: (formData.get("included") as string).split(",").map((item) => item.trim()),
//     }

//     try {
//       const response = await fetch("/api/packages", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(packageData),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to create package")
//       }

//       toast.success("Package created successfully")
//       router.push(`/packages`)
//     } catch (error) {
//       console.error("Error creating package:", error)
//       toast.error("Failed to create package")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h1 className="text-3xl font-bold mb-8">Create New Package</h1>
//       <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
//         <div className="space-y-2">
//           <Label htmlFor="name">Package Name</Label>
//           <Input id="name" name="name" placeholder="Enter package name" required />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="location">Location</Label>
//           <Input id="location" name="location" placeholder="Enter location" required />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="imageData">Upload Image</Label>
//           <Input id="imageData" type="file" accept="image/*" onChange={handleImageChange} required />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="duration">Duration</Label>
//           <Input id="duration" name="duration" placeholder="e.g., 5 days" required />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="groupSize">Group Size</Label>
//           <Input id="groupSize" name="groupSize" placeholder="e.g., 2-10 people" required />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="price">Price</Label>
//           <Input id="price" name="price" type="number" step="0.01" placeholder="Enter price" required />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="description">Description</Label>
//           <Textarea id="description" name="description" placeholder="Enter package description" required />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="included">Included Items</Label>
//           <Input id="included" name="included" placeholder="Enter included items (comma-separated)" required />
//         </div>
//         <Button type="submit" className="w-full" disabled={isLoading}>
//           {isLoading ? "Creating..." : "Create Package"}
//         </Button>
//       </form>
//     </div>
//   )
// }

