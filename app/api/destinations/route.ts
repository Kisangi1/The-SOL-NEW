import { NextResponse } from "next/server"
import { auth, currentUser } from "@clerk/nextjs/server"
import { getDestinations, createDestination } from "@/lib/db"

// Public GET endpoint - /api/destinations
export async function GET() {
  try {
    const destinations = await getDestinations()
    return NextResponse.json(destinations)
  } catch (error) {
    console.error("Error fetching destinations:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// Protected POST endpoint - /api/destinations
export async function POST(request: Request) {
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

    const newDestination = await createDestination({
      name,
      description,
      imageData,
      locations,
      inclusive,
      exclusive,
      amount,
      whatToCarry,
    })

    return NextResponse.json(newDestination, { status: 201 })
  } catch (error) {
    console.error("Error creating destination:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

