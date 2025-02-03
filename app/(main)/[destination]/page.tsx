import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import Image from "next/image"
import { BookingForm } from "@/components/other/BookingForm"

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
    <div className="min-h-screen w-full font-sans bg-amber-50 text-brown-900">
      {/* Hero Banner - Responsive African-Inspired Banner */}
      <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] w-full overflow-hidden">
        <Image
          src={destination.imageUrl || "/images/african-landscape.jpeg"}
          alt={destination.name}
          fill
          className="absolute inset-0 w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent">
          <div className="container mx-auto h-full px-4 flex items-center">
            <div className="max-w-4xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight tracking-wide">
                {destination.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-16 grid sm:grid-cols-1 md:grid-cols-2 gap-8 font-sans">
        {/* Destination Details - African Inspired Layout */}
        <div className="bg-amber-100 p-6 sm:p-8 rounded-xl shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-brown-800 border-b-2 border-brown-300 pb-2">
            Description
          </h2>
          <p className="mb-6 text-brown-700 leading-relaxed">
            {destination.description}
          </p>

          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-brown-800 border-b-2 border-brown-300 pb-2">
            Best Time to Travel
          </h2>
          <p className="mb-6 text-brown-700 leading-relaxed">
            {destination.bestTimeToTravel}
          </p>

          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-brown-800 border-b-2 border-brown-300 pb-2">
            What to Carry
          </h2>
          <ul className="list-disc pl-5 text-brown-700 space-y-2">
            {destination.whatToCarry.map((item, index) => (
              <li key={index} className="pl-2">{item}</li>
            ))}
          </ul>
        </div>

        {/* Booking Form - African Inspired Card */}
        <div className="bg-amber-100 p-6 sm:p-8 rounded-xl shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-brown-800 border-b-2 border-brown-300 pb-2">
            Book Your Adventure
          </h2>
          <BookingForm destinationId={destination.id} />
        </div>
      </div>
    </div>
  )
}