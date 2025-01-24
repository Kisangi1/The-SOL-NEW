import { NextResponse } from "next/server"
import { auth, currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/db"

// Public GET endpoint - /api/packages
export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(packages)
  } catch (error) {
    console.error("Error fetching packages:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// Protected POST endpoint - /api/packages
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

    const { name, description, imageData, amount, numberOfDays, dayOrNight, type } = await request.json()

    console.log("Received data:", { name, description, amount, numberOfDays, dayOrNight, type })

    if (!name || !description || !amount || !numberOfDays || !dayOrNight || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newPackage = await prisma.package.create({
      data: {
        name,
        description,
        imageData,
        amount: Number(amount),
        numberOfDays: Number(numberOfDays),
        dayOrNight,
        type,
      },
    })

    console.log("Created package:", newPackage)

    return NextResponse.json(newPackage, { status: 201 })
  } catch (error) {
    console.error("Error creating package:", error)
    return NextResponse.json({ error: "Internal Server Error", details: (error as Error).message }, { status: 500 })
  }
}

