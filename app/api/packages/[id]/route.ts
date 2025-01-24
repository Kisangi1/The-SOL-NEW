import { NextResponse } from "next/server"
import { auth, currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/db"

// Public GET endpoint - /api/packages/[id]
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const packageData = await prisma.package.findUnique({
      where: { id },
    })

    if (!packageData) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 })
    }

    return NextResponse.json(packageData)
  } catch (error) {
    console.error("Error fetching package:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// Protected PUT endpoint - /api/packages/[id]
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

    const id = params.id
    const { name, description, imageData, amount, numberOfDays, dayOrNight, type } = await request.json()

    if (!name || !description || !amount || !numberOfDays || !dayOrNight || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const updatedPackage = await prisma.package.update({
      where: { id },
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

    return NextResponse.json(updatedPackage)
  } catch (error) {
    console.error("Error updating package:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// Protected DELETE endpoint - /api/packages/[id]
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    await prisma.package.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Package deleted successfully" })
  } catch (error) {
    console.error("Error deleting package:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

