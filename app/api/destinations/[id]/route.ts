import { NextResponse } from "next/server"
import { auth, currentUser } from "@clerk/nextjs/server"
import { getDestinationById, updateDestination, deleteDestination } from "@/lib/db"

// Public GET endpoint - /api/destinations/[id]
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const destination = await getDestinationById(params.id)

    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 })
    }

    return NextResponse.json(destination)
  } catch (error) {
    console.error("Error fetching destination:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// Protected PUT endpoint - /api/destinations/[id]
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const { name, description, imageData, locations, inclusive, exclusive, amount, whatToCarry } = await request.json()

    if (!name || !description || !amount) {
      return NextResponse.json({ error: "Name, description, and amount are required" }, { status: 400 })
    }

    const updatedDestination = await updateDestination(params.id, {
      name,
      description,
      imageData,
      locations,
      inclusive,
      exclusive,
      amount,
      whatToCarry,
    })

    return NextResponse.json(updatedDestination)
  } catch (error) {
    console.error("Error updating destination:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// Protected DELETE endpoint - /api/destinations/[id]
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await deleteDestination(params.id)

    return NextResponse.json({ message: "Destination deleted successfully" })
  } catch (error) {
    console.error("Error deleting destination:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
