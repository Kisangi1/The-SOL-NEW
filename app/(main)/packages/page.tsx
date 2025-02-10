import { prisma } from "@/lib/db"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar,  Users } from 'lucide-react'
import Pagination from "@/components/other/pagination"
import { Suspense } from "react"
import PackageCardSkeleton from "@/components/other/packageCardskeleton"

export const dynamic = 'force-dynamic'

async function getPackages(page: number = 1) {
  const pageSize = 9
  const skip = (page - 1) * pageSize
  
  const [packages, total] = await Promise.all([
    prisma.package.findMany({
      orderBy: { createdAt: "desc" },
      take: pageSize,
      skip,
    }),
    prisma.package.count(),
  ])
  
  return { packages, total, totalPages: Math.ceil(total / pageSize) }
}

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const page = Number(searchParams.page) || 1
  const { packages, totalPages } = await getPackages(page)
  
  return (
    <div className="bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Banner */}
      <div className="relative h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] w-full overflow-hidden">
        <Image
          src="/images/destinations.jpeg"
          alt="African landscape"
          fill
          className="absolute inset-0 object-cover"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent">
          <div className="container mx-auto h-full px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="flex flex-col justify-center h-full max-w-4xl">
              <span className="text-xs sm:text-sm md:text-base lg:text-lg font-medium mb-2 sm:mb-3 md:mb-4 text-amber-600">
                Discover Africa&apos;s Finest Travel Experiences
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 leading-tight">
                Exclusive <span className="text-amber-500">Travel</span> Packages
              </h1>
              <p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-2xl">
                Embark on unforgettable journeys across Africa with our carefully curated travel packages
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 font-sans bg-gradient-to-b from-orange-50 to-white">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-amber-600">Featured </span>Packages
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-amber-600 mx-auto mb-6" />
          <p className="text-gray-600">
            Choose from our selection of premium travel experiences
          </p>
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 font-sans">
          <Suspense fallback={[...Array(9)].map((_, i) => <PackageCardSkeleton key={i} />)}>
            {packages.map((pkg) => (
              <Card 
                key={pkg.id}
                className="group flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-100"
              >
                <CardHeader className="p-0">
                  <div className="relative w-full h-60 sm:h-64 md:h-72">
                    <Image
                      src={pkg.imageUrl || "/placeholder.svg"}
                      alt={pkg.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                      <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                        {pkg.type}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-grow p-6">
                  <div className="space-y-4">
                    <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors">
                      {pkg.name}
                    </CardTitle>
                    
                    <div className="flex flex-col space-y-2.5 font-sans">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-amber-500" />
                        <span className="text-sm">{pkg.duration} days, {pkg.nights} nights</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2 text-amber-500" />
                        <span className="text-sm">Group & Private tours available</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="text-sm text-gray-500 mb-1">Starting</div>
                      <div className="flex items-baseline space-x-1 font-sans capitalize">
                    <span className=" text-gray-500">From</span>
                    <span className=" font-bold text-gray-900">
                      ${pkg.amount.toLocaleString()}
                    </span>
                    <span className="text-gray-500">Per Person</span>
                  </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Link href={`/packages/${pkg.id}`} className="w-full">
                    <Button 
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium h-12"
                    >
                      Explore Package
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </Suspense>
        </div>

        {/* Pagination */}
        <div className="mt-16">
          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
      </div>
    </div>
  )
}