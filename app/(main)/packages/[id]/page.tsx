import Image from "next/image"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { BookingForm } from "@/components/other/BookingForm"
import { Calendar, Globe, DollarSign } from "lucide-react"

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
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] w-full overflow-hidden">
        <Image
          src={tourPackage.imageData || "/images/hero_packages.jpg"}
          alt={`${tourPackage.name} landscape`}
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent">
          <div className="container mx-auto h-full px-4">
            <div className="flex flex-col justify-center h-full max-w-4xl">
              <span className="text-orange-300 text-sm md:text-base lg:text-lg font-medium mb-4">
                Sol of African Adventures
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {tourPackage.name}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-2xl">
                {tourPackage.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Package Details */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Package Information */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-orange-800 mb-6 border-b pb-3 border-orange-200">
              Package Details
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="w-6 h-6 text-orange-600 mr-4" />
                <div>
                  <p className="font-medium text-gray-700">Duration</p>
                  <p className="text-gray-600">
                    {tourPackage.numberOfDays} {tourPackage.dayOrNight}s
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Globe className="w-6 h-6 text-orange-600 mr-4" />
                <div>
                  <p className="font-medium text-gray-700">Type</p>
                  <p className="text-gray-600">{tourPackage.type}</p>
                </div>
              </div>

              <div className="flex items-center">
                <DollarSign className="w-6 h-6 text-orange-600 mr-4" />
                <div>
                  <p className="font-medium text-gray-700">Price</p>
                  <p className="text-2xl font-bold text-orange-800">
                    ${tourPackage.amount}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-orange-800 mb-6 border-b pb-3 border-orange-200">
              Book Your Adventure
            </h2>
            <BookingForm packageId={tourPackage.id} />
          </div>
        </div>
      </div>
    </div>
  )
}