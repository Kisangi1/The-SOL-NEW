import Image from "next/image"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { BookingForm } from "@/components/other/BookingForm"
import { Calendar, Globe, DollarSign, Star, FileText } from "lucide-react"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Packages | Sol Of African",
  description: "Discover our curated selection of African adventure packages. From wildlife safaris to cultural experiences, find your perfect journey across breathtaking African destinations.",
  keywords: [
    "African travel packages",
    "safari tours",
    "adventure travel",
    "African holidays",
    "travel experiences"
  ],
  openGraph: {
    title: "Sol Of African - Explore Incredible Travel Packages",
    description: "Embark on unforgettable African adventures with our diverse range of travel packages.",
    type: "website",
    images: ["/images/hero_packages.jpg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sol Of African - Travel Packages",
    description: "Discover amazing African travel experiences tailored just for you.",
    images: ["/images/hero_packages.jpg"]
  }
};

async function getPackage(id: string) {
  const tourPackage = await prisma.package.findUnique({
    where: { id },
  })

  if (!tourPackage) {
    notFound()
  }

  return tourPackage
}

export default async function PackagePage({ params }: { params: { id: string } }) {
  const tourPackage = await getPackage(params.id)

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] w-full overflow-hidden">
        <Image
          src={tourPackage.imageData || "/images/hero_packages.jpg"}
          alt={`${tourPackage.name} landscape`}
          fill
          className="absolute inset-0 w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent">
          <div className="container mx-auto h-full px-4 flex items-center">
            <div className="max-w-4xl">
              <div className="flex items-center mb-4">
                <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm mr-3">
                  {tourPackage.type} Package
                </span>
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {tourPackage.name}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="container mx-auto py-12 px-4">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden mb-12">
          <div className="bg-amber-50 p-6 border-b border-amber-100">
            <h2 className="text-2xl font-bold text-amber-800 flex items-center">
              <FileText className="w-6 h-6 mr-3 text-amber-600" />
              Package Description
            </h2>
          </div>
          <div className="p-6">
            <p className="text-gray-800 text-lg leading-relaxed">
              {tourPackage.description}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Package Information */}
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="bg-amber-50 p-6 border-b border-amber-100">
              <h2 className="text-2xl font-bold text-amber-800">
                Package Details
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-amber-600 mr-4" />
                <div>
                  <p className="text-gray-600 font-medium">Duration</p>
                  <p className="text-xl font-semibold text-gray-800">
                    {tourPackage.numberOfDays} {tourPackage.dayOrNight}s
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Globe className="w-8 h-8 text-amber-600 mr-4" />
                <div>
                  <p className="text-gray-600 font-medium">Package Type</p>
                  <p className="text-xl font-semibold text-gray-800">
                    {tourPackage.type}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <DollarSign className="w-8 h-8 text-amber-600 mr-4" />
                <div>
                  <p className="text-gray-600 font-medium ">Price</p>
                  <p className="text-2xl font-bold text-amber-800 font-sans">
                    kes {tourPackage.amount.toLocaleString()}/-
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="bg-amber-50 p-6 border-b border-amber-100">
              <h2 className="text-2xl font-bold text-amber-800">
                Book Your Adventure
              </h2>
            </div>
            <div className="p-6">
              <BookingForm packageId={tourPackage.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}