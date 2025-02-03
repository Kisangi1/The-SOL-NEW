'use client'

import React, { useState, useEffect } from 'react'
import FeaturesSection from "@/components/home/features-section"
import { BlogsSection } from "@/components/home/offers-section"
import { DestinationCard } from "@/components/home/destination-card"
import { DestinationSkeleton } from "@/components/home/destination-sketelon"

interface Package {
  id: string;
  imageUrl: string;
  name: string;
  amount: number;
  type?: string;
}

export default function HomePage() {
  const [destinations, setDestinations] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch packages
  useEffect(() => {
    async function fetchDestinations() {
      try {
        const response = await fetch('/api/packages')
        if (!response.ok) {
          throw new Error('Failed to fetch packages')
        }
        const { packages } = await response.json()
        setDestinations(packages)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching packages:', error)
        setLoading(false)
      }
    }
    
    fetchDestinations()
  }, [])

  return (
    <main>
      <section className="py-16 bg-gray-50 font-sans">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center rounded-full bg-amber-600 px-4 py-1 text-sm text-white">
            Made for you
          </div>
          <h2 className="text-xl md:text-2xl lg:text-2xl xl:text-4xl font-bold mb-2 mt-4">
            Where to next?
          </h2>
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {[...Array(5)].map((_, index) => (
                <DestinationSkeleton key={index} />
              ))}
            </div>
          ) : destinations.length === 0 ? (
            <div className="text-center">No packages found</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {destinations.slice(0, 5).map((destination) => (
                <DestinationCard
                  key={destination.id}
                  image={destination.imageUrl || "/images/default-package.jpg"}
                  title={destination.name}
                  price={destination.amount}
                  location={destination.type}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      <FeaturesSection />
      <BlogsSection />
    </main>
  )
}