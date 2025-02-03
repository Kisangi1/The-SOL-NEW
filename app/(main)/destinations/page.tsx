// app/[destination]/page.tsx
import { prisma } from "@/lib/db"
import Image from "next/image"
import { BookingForm } from "@/components/other/BookingForm"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const destinations = await prisma.destination.findMany({
    select: { name: true }
  })

  return destinations.map((dest) => ({
    destination: dest.name.toLowerCase().replace(/\s+/g, '-')
  }))
}

export default async function DestinationPage({ 
  params 
}: { 
  params: { destination: string } 
}) {
  // Convert URL param back to original name
  const destinationName = params.destination
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const destination = await prisma.destination.findFirst({
    where: { 
      name: { 
        equals: destinationName, 
        mode: 'insensitive' 
      } 
    }
  })

  if (!destination) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Banner Similar to Previous Example */}
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] w-full overflow-hidden mb-8">
        <Image
          src={destination.imageUrl || "/images/destinations.jpeg"}
          alt={destination.name}
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent">
          <div className="container mx-auto h-full px-4">
            <div className="flex flex-col justify-center h-full max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {destination.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <p className="mb-6">{destination.description}</p>

          <h2 className="text-2xl font-bold mb-4">Best Time to Travel</h2>
          <p className="mb-6">{destination.bestTimeToTravel}</p>

          <h2 className="text-2xl font-bold mb-4">What to Carry</h2>
          <ul className="list-disc pl-5">
            {destination.whatToCarry.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Book Your Trip</h2>
          <BookingForm destinationId={destination.id} />
        </div>
      </div>
    </div>
  )
}