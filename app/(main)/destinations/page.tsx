import Link from "next/link"
import Image from "next/image"
import { getDestinations } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {  MapPin } from 'lucide-react'
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
      {/* Hero Banner */}
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

      {/* Destinations Section */}
      <div className="container mx-auto py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 text-center">
          <span className="text-amber-600 font-sans">Explore </span>Destinations
        </h2>
        <div className="w-16 sm:w-20 md:w-24 h-1 bg-amber-600 mx-auto mb-8 sm:mb-10" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <Card 
              key={destination.id} 
              className="group flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <CardHeader className="p-0">
                <div className="relative w-full h-56 sm:h-60 md:h-64">
                  <Image
                    src={destination.imageData || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-orange-600 px-3 py-1.5 rounded-full text-sm font-semibold">
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-grow p-4">
                <div className="space-y-3">
                  <CardTitle className="text-xl font-bold text-gray-800">
                    {destination.name}
                  </CardTitle>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1.5 text-orange-500" />
                    <span className="text-sm capitalize">{destination.locations[0]}</span>
                  </div>

                  <div className="flex items-baseline space-x-1 font-sans capitalize">
                    <span className=" text-gray-500">From</span>
                    <span className=" font-bold text-gray-900">
                      KES {destination.amount.toLocaleString()}
                    </span>
                    <span className="text-gray-500">Per Person</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Link 
                  href={`/destinations/${destination.name.toLowerCase().replace(/ /g, "-")}`} 
                  className="w-full"
                >
                  <Button 
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium"
                  >
                    EXPLORE
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