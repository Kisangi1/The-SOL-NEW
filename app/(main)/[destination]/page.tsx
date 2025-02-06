import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import Image from "next/image"
import { BookingForm } from "@/components/other/BookingForm"
import { CalendarDays, MapPin, Sunrise, LuggageIcon as Suitcase } from "lucide-react"
import type React from "react" // Import React

export async function generateStaticParams() {
  const destinations = await prisma.destination.findMany({
    select: { name: true },
  })

  return destinations.map((dest) => ({
    destination: dest.name.toLowerCase().replace(/\s+/g, "-"),
  }))
}

export default async function DestinationPage({
  params,
}: {
  params: { destination: string }
}) {
  // Convert URL param back to original name
  const destinationName = params.destination
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const destination = await prisma.destination.findFirst({
    where: {
      name: {
        equals: destinationName,
        mode: "insensitive",
      },
    },
  })

  if (!destination) {
    notFound()
  }

  return (
    <div className="min-h-screen w-full font-sans bg-gradient-to-b from-orange-50 to-white text-brown-900">
      {/* Hero Banner */}
      <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] w-full overflow-hidden">
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
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 sm:mb-4 leading-tight tracking-wide">
                {destination.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-4 sm:mb-8">
                Discover the beauty of {destination.name}
              </p>
              <a
                href="#booking"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 text-sm sm:text-base"
              >
                Book Your Adventure
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20">
        {/* Quick Info */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 sm:mb-12">
          <QuickInfoCard
            icon={<MapPin className="w-4 h-4 sm:w-5 sm:h-5" />}
            title="Location"
            content={destination.name}
          />
          <QuickInfoCard
            icon={<CalendarDays className="w-4 h-4 sm:w-5 sm:h-5" />}
            title="Best Time"
            content={destination.bestTimeToTravel}
          />
          <QuickInfoCard
            icon={<Sunrise className="w-4 h-4 sm:w-5 sm:h-5" />}
            title="Climate"
            content="Tropical Savanna"
          />
          <QuickInfoCard
            icon={<Suitcase className="w-4 h-4 sm:w-5 sm:h-5" />}
            title="Packing"
            content={`${destination.whatToCarry.length} Essentials`}
          />
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Destination Details */}
          <div className="md:col-span-2 space-y-8 md:space-y-12">
            <ContentSection
              title="About the Destination"
              content={
                <>
                  <p className="mb-4 sm:mb-6">{destination.description}</p>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Best Time to Travel</h3>
                  <ul className="mb-4 sm:mb-6">
                    <li>• {destination.bestTimeToTravel}</li>
                  </ul>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">What to Carry</h3>
                  <ul className="list-disc pl-5 space-y-1 sm:space-y-2 flex flex-col">
                    {destination.whatToCarry.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              }
            />
          </div>

          {/* Booking Form */}
          <div className="md:col-span-1">
            <div id="booking" className="bg-white p-4 sm:p-6 rounded-xl shadow-lg sticky top-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-brown-800 border-b-2 border-orange-300 pb-2">
                Book Your Adventure
              </h2>
              <BookingForm destinationId={destination.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function QuickInfoCard({ icon, title, content }: { icon: React.ReactNode; title: string; content: string }) {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-xl shadow-md flex items-center space-x-3 flex-1 min-w-[150px] max-w-[200px]">
      <div className="text-orange-500 text-xl sm:text-2xl">{icon}</div>
      <div>
        <h3 className="font-semibold text-sm sm:text-base">{title}</h3>
        <p className="text-gray-600 text-xs sm:text-sm">{content}</p>
      </div>
    </div>
  )
}

function ContentSection({ title, content }: { title: string; content: React.ReactNode }) {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-brown-800 border-b-2 border-orange-300 pb-2">{title}</h2>
      <div className="text-brown-700 leading-relaxed text-sm sm:text-base">{content}</div>
    </div>
  )
}

