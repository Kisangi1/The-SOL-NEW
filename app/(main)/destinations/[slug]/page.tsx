import Image from "next/image"
import { notFound } from "next/navigation"
import { BookingForm } from "@/components/other/BookingForm"
import { getDestinationBySlug } from "@/lib/db"
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Destinations | Sol Of African",
  description: "Explore breathtaking African destinations. From serene landscapes to vibrant cultural experiences, discover the diverse and incredible locations we offer.",
  keywords: [
    "African destinations",
    "travel locations",
    "safari destinations",
    "African travel",
    "adventure destinations"
  ],
  openGraph: {
    title: "Sol Of African - Amazing Destinations",
    description: "Journey through Africa's most stunning and unique locations.",
    type: "website",
    images: ["/images/destinations_hero.jpg"]
  }
};

async function getDestination(slug: string) {
  const destination = await getDestinationBySlug(slug)

  if (!destination) {
    notFound()
  }

  return destination
}

export default async function DestinationPage({ params }: { params: { slug: string } }) {
  const destination = await getDestination(params.slug)

  return (
    <div className="bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] w-full overflow-hidden">
        <Image
          src={destination.imageData || "/images/destinations.jpeg"}
          alt={destination.name}
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent">
          <div className="container mx-auto h-full px-4">
            <div className="flex flex-col justify-center h-full max-w-4xl">
              <span className="text-orange-300 text-sm md:text-base lg:text-lg font-medium mb-4">
                Discover Africa
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {destination.name}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Destination Details */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-lg shadow-lg p-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-orange-500 pb-2">
              Destination Details
            </h2>
            <p className="text-lg text-gray-700 mb-6">{destination.description}</p>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Locations</h3>
              <ul className="space-y-2 text-gray-700">
                {destination.locations.map((location, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {location}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">What to Carry</h3>
              <ul className="space-y-2 text-gray-700">
                {destination.whatToCarry.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-orange-500 pb-2">
                Package Details
              </h3>
              <div className="bg-gray-100 rounded-lg p-6">
                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">Inclusive</h4>
                  <ul className="space-y-2 text-gray-600">
                    {destination.inclusive.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">Exclusive</h4>
                  <ul className="space-y-2 text-gray-600">
                    {destination.exclusive.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-3xl font-bold text-orange-600 mb-4 font-sans">
                  KES {destination.amount.toLocaleString()}/-
                </p>
                <div className="bg-gray-100 rounded-lg p-4">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Ready to Explore?</h4>
                  <p className="text-gray-600 mb-4">Book your adventure and create unforgettable memories!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
            Book Your {destination.name} Experience
          </h2>
          <BookingForm destinationId={destination.id} />
        </div>
      </div>
    </div>
  )
}