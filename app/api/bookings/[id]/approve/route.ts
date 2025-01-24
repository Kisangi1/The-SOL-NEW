import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { sendEmail } from "@/lib/email"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const booking = await prisma.booking.update({
      where: { id },
      data: { status: "APPROVED" },
      include: { package: true, destination: true },
    })

    const bookingType = booking.package ? "package" : "destination"
    const bookingName = booking.package ? booking.package.name : booking.destination?.name

    await sendEmail(
      booking.email,
      "Booking Approved - The Sol Of African",
      `
      <h1>Your Booking Has Been Approved!</h1>
      <p>Dear ${booking.name},</p>
      <p>We are pleased to inform you that your booking for the ${bookingType} "${bookingName}" has been approved.</p>
      <p>Booking details:</p>
      <ul>
        <li>Start Date: ${booking.startDate.toLocaleDateString()}</li>
        <li>End Date: ${booking.endDate.toLocaleDateString()}</li>
      </ul>
      <p>If you have any questions or need further assistance, please don't hesitate to contact us at our official number: +254 123 456 789.</p>
      <p>We look forward to providing you with an unforgettable experience!</p>
      <p>Best regards,<br>The Sol Of African Team</p>
    `,
    )

    return NextResponse.json({ message: "Booking approved successfully" })
  } catch (error) {
    console.error("Error approving booking:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

