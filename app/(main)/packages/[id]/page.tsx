import Image from "next/image"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { BookingForm } from "@/components/other/BookingForm"




async function getPackage(id: string) {
  const tourPackage = await prisma.package.findUnique({
    where: { id },
  })

  if (!tourPackage) {
    notFound()
  }

  return tourPackage
}

export default async function PackagePage({ params }: { params: { id: string } }) {
  const tourPackage = await getPackage(params.id)

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6">{tourPackage.name}</h1>
      {tourPackage.imageData && (
        <Image
          src={tourPackage.imageData || "/placeholder.svg"}
          alt={tourPackage.name}
          width={1200}
          height={600}
          className="rounded-lg mb-6"
        />
      )}
      <p className="text-lg mb-4">{tourPackage.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Details</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Duration:</strong> {tourPackage.numberOfDays} {tourPackage.dayOrNight}s
            </li>
            <li>
              <strong>Type:</strong> {tourPackage.type}
            </li>
            <li>
              <strong>Amount:</strong> ${tourPackage.amount}
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Book This Package</h2>
        <BookingForm packageId={tourPackage.id} />
      </div>
    </div>
  )
}

