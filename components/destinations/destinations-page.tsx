'use client'

import { useState,} from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DestinationCard } from '@/components/destinations/destination-card'
import { DestinationCardSkeleton } from '@/components/destinations/destinations-card-skeleton'
import { CountrySidebar } from '@/components/destinations/location-sidebar'
import { Destination } from '@/types/destinations'
import { motion } from 'framer-motion';

interface DestinationsPageProps {
  initialDestinations: Destination[]
  country?: string
}

export default function DestinationsPage({ initialDestinations, country }: DestinationsPageProps) {
  const [destinations] = useState<Destination[]>(initialDestinations)
  const [loading] = useState(false)
  const [error] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 6

  const filteredDestinations = country
    ? destinations.filter((dest) =>
        dest.country.toLowerCase() === country.toLowerCase()
      )
    : destinations

  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedDestinations = filteredDestinations.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-green-100">
        <div className="text-center space-y-6 max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-red-600">
            Error Loading Destinations
          </h2>
          <p className="text-gray-600 text-lg">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6efe5]">
      {/* Hero Section */}
      <div className="relative z-10 overflow-hidden bg-black text-white">
        <div className="h-40">
          <img
            src="/images/packages.jpeg"
            alt="Destinations Hero"
            className="z-1 absolute left-0 top-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg text-center px-4 capitalize">
              {country 
                ? `${country} Destinations` 
                : 'Explore Destinations'
              }
            </h1>
          </div>
        </div>
        <div
          className="relative z-20 h-32 w-full -scale-y-[1] bg-contain bg-repeat-x"
          style={{
            backgroundImage: "url('/images/banner_style.png')",
            filter:
              "invert(92%) sepia(2%) saturate(1017%) hue-rotate(342deg) brightness(106%) contrast(93%)",
          }}
        />
      </div>

      {/* Framer Animation for Dotted Line */}
      <section className="block-divider_dotted scroll-my-28 w-full">
        <div className="container">
          <div className="flex justify-center relative">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 165 157" 
              className="h-28 md:h-36"
            >
              <motion.path 
                d="M0 0c14.69 46.684 41.909 70.026 81.657 70.026 59.623 0 72.343 45.146 72.343 68.914" 
                stroke="#283A2C"
                strokeWidth="2"
                opacity="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                fillRule="evenodd"
                strokeMiterlimit="10"
                initial={{ strokeDashoffset: 10 }}
                animate={{ 
                  strokeDashoffset: 0,
                  transition: {
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
                style={{
                  strokeDasharray: "0, 10"
                }}
              />
              <ellipse 
                fill="#283A2C" 
                opacity="0.25" 
                cx="154" 
                cy="145.932" 
                rx="11" 
                ry="11.068"
              />
              <ellipse 
                fill="#283A2C" 
                cx="154" 
                cy="145.932" 
                rx="5" 
                ry="5.031"
              />
            </svg>
          </div>
        </div>
      </section>
     

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-3xl mt-4 md:text-4xl font-semibold text-gray-800 mb-12 text-center">
          Our Featured <span className="text-green-600 relative">
       Destinations
          <svg
            className="absolute -bottom-1 left-0 w-full"
            viewBox="0 0 100 15"
            preserveAspectRatio="none"
          >
            <path
              d="M0,10 Q50,0 100,10"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
            />
          </svg>
        </span>
        </h2>

        <div className="flex flex-col lg:flex-row">
          {/* Country Sidebar (hidden on small screens) */}
          <div className="hidden lg:block">
            <CountrySidebar />
          </div>

          {/* Destination Cards */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <DestinationCardSkeleton key={index} />
                ))}
              </div>
            ) : (
              <>
                {displayedDestinations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedDestinations.map((destination) => (
                      <DestinationCard key={destination.id} destination={destination} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                      No destinations found
                    </h3>
                    <p className="text-gray-500">
                      {country
                        ? `No destinations available for ${country}. Try exploring other countries.`
                        : "Check back later for exciting new travel destinations."}
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="w-12 h-12 rounded-full hover:bg-green-50 hover:text-green-600 hover:border-green-600"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <span className="text-lg font-bold text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="w-12 h-12 rounded-full hover:bg-green-50 hover:text-green-600 hover:border-green-600"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

