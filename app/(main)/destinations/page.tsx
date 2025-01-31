import Link from "next/link"
import Image from "next/image"
import { getDestinations } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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

async function getAllDestinations() {
  return await getDestinations()
}

export default async function DestinationsPage() {
  const destinations = await getAllDestinations()
  
  return (
    <div className="bg-gray-50">
      {/* Hero Banner - Enhanced Responsiveness */}
      <div className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[60vh] xl:h-[70vh] w-full overflow-hidden">
        <Image
          src="/images/destinations.jpeg"
          alt="African landscape"
          fill
          className="absolute inset-0 object-cover"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent">
          <div className="container mx-auto h-full px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="flex flex-col justify-center h-full max-w-4xl">
              <span className="text-xs sm:text-sm md:text-base lg:text-lg font-medium mb-2 sm:mb-3 md:mb-4 text-orange-300">
                Your Gateway to African Adventures
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight">
                Travel <span className="text-orange-400">with</span> us
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Destinations Section - Enhanced Responsiveness */}
      <div className="container mx-auto py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 text-center">
          <span className="text-amber-600 font-sans">Explore </span>Destinations
        </h2>
        <div className="w-16 sm:w-20 md:w-24 h-1 bg-amber-600 mx-auto mb-4 sm:mb-5 md:mb-6" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {destinations.map((destination) => (
            <Card 
              key={destination.id} 
              className="flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <CardHeader className="p-0">
                <div className="relative w-full h-40 sm:h-44 md:h-48 lg:h-52 xl:h-56">
                  <Image
                    src={destination.imageData || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover rounded-t-lg"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-orange-500 font-sans text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    KES {destination.amount.toLocaleString()}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-3 sm:p-4">
                <CardTitle className="text-lg sm:text-xl md:text-xl lg:text-xl font-bold mb-1 sm:mb-2 text-gray-800">
                  {destination.name}
                </CardTitle>
                <div className="flex items-center text-xs sm:text-sm text-gray-600 capitalize">
                  <svg className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {destination.locations[0]}
                </div>
              </CardContent>
              <CardFooter className="p-3 sm:p-4">
                <Link 
                  href={`/destinations/${destination.name.toLowerCase().replace(/ /g, "-")}`} 
                  passHref
                  className="w-full"
                >
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm md:text-base">
                    Explore Destination
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}