import { Suspense } from 'react'
import { getAllDestinations } from '@/lib/destinations'
import DestinationsPage from '@/components/destinations/destinations-page'
import { DestinationCardSkeleton } from '@/components/destinations/destinations-card-skeleton'

export const metadata = {
  title: 'Explore Destinations | Forestline Tours',
  description: 'Discover amazing travel destinations around the world with Forestline Tours.',
}

export default async function DestinationsRoute() {
  const destinations = await getAllDestinations()

  return (
    <Suspense fallback={<DestinationsLoadingSkeleton />}>
      <DestinationsPage initialDestinations={destinations} />
    </Suspense>
  )
}

function DestinationsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <DestinationCardSkeleton key={index} />
      ))}
    </div>
  )
}

