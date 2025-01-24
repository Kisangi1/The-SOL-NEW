import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { sendEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const { packageId, destinationId, name, email, startDate, endDate, message } = await request.json()

    if ((!packageId && !destinationId) || !name || !email || !startDate || !endDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newBooking = await prisma.booking.create({
      data: {
        name,
        email,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        message,
        status: "PENDING",
        ...(packageId && { package: { connect: { id: packageId } } }),
        ...(destinationId && { destination: { connect: { id: destinationId } } }),
      },
      include: {
        package: true,
        destination: true,
      },
    })

    // Send confirmation email
    const bookingType = newBooking.package ? "package" : "destination"
    const bookingName = newBooking.package?.name || newBooking.destination?.name

    await sendEmail(
      email,
      "Booking Confirmation",
      `
      <h1>Booking Confirmation</h1>
      <p>Thank you for your booking, ${name}!</p>
      <p>Your booking details:</p>
      <ul>
        <li>Type: ${bookingType}</li>
        <li>Name: ${bookingName}</li>
        <li>Start Date: ${new Date(startDate).toLocaleDateString()}</li>
        <li>End Date: ${new Date(endDate).toLocaleDateString()}</li>
      </ul>
      <p>We will contact you shortly with more information.</p>
      <p>If you have any questions, please contact us at +254 123 456 789.</p>
      <p>Best regards,<br>The Sol Of African Team</p>
    `,
    )

    return NextResponse.json(newBooking, { status: 201 })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        package: { select: { name: true } },
        destination: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

