import React from 'react';
import Image from "next/image";
import { Package } from "@prisma/client";
import { BookingForm } from "@/components/other/BookingForm";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Blocks,
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

interface PackageDetailsProps {
  package: Package;
}

export default function PackageDetails({ package: packageData }: PackageDetailsProps) {
  return (
    <div className="w-full font-sans">
      {/* Hero Section - Full Width */}
      <div className="w-full relative">
        <div className="absolute inset-0 w-full h-[40vh] sm:h-[50vh] md:h-[60vh]">
          <Image
            src={packageData.imageUrl || "/images/destinations.jpeg"}
            alt={packageData.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent">
            <div className="container mx-auto h-full px-4 sm:px-6">
              <div className="flex flex-col justify-end h-full pb-6 sm:pb-8 md:pb-12 max-w-4xl">
                <span className="text-xs sm:text-sm md:text-base lg:text-lg font-medium mb-2 sm:mb-4 text-amber-300">
                  Discover Africa&apos;s Beauty
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  {packageData.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-white/90 capitalize text-xs sm:text-sm md:text-base">
                  <span className="flex items-center gap-1 sm:gap-2 bg-black/30 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-amber-300" />
                    {packageData.duration} days
                  </span>
                  <span className="flex items-center gap-1 sm:gap-2 bg-black/30 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-amber-300" />
                    {packageData.nights} nights
                  </span>
                  <span className="flex items-center gap-1 sm:gap-2 bg-black/30 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                    <Blocks className="w-3 h-3 sm:w-4 sm:h-4 text-amber-300" />
                    {packageData.type} PACKAGE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[40vh] sm:h-[50vh] md:h-[60vh]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 font-semibold text-lg sm:text-xl mt-2 sm:mt-3">
        <Link href="/packages" className="flex items-center gap-1 sm:gap-2 text-black hover:text-gray-900">
          <span><ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" /></span> Back to Packages
        </Link>
      </div>

      {/* Horizontal Line */}
      <div className="container mx-auto px-4 sm:px-6">
        <div className="w-full border-b border-spacing-1 border-gray-200 my-4 sm:my-6 md:my-8"></div>
      </div>

      {/* Main Content */}
      <section className="min-h-screen font-sans">
        <div className="w-full py-8 sm:py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
              {/* Left Column - Package Details */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="w-full justify-start mb-6 sm:mb-8 bg-transparent space-x-2 overflow-x-auto">
                    <TabsTrigger 
                      value="details"
                      className="data-[state=active]:bg-amber-600 data-[state=active]:text-white px-4 sm:px-6 text-sm sm:text-base"
                    >
                      Package Details
                    </TabsTrigger>
                    <TabsTrigger 
                      value="included"
                      className="data-[state=active]:bg-amber-600 data-[state=active]:text-white px-4 sm:px-6 text-sm sm:text-base"
                    >
                      What&apos;s Included
                    </TabsTrigger>
                    <TabsTrigger 
                      value="booking"
                      className="data-[state=active]:bg-amber-600 data-[state=active]:text-white px-4 sm:px-6 text-sm sm:text-base"
                    >
                      Booking Enquiries
                    </TabsTrigger>
                  </TabsList>

                  <Card className="border-0 rounded-md shadow-black">
                    <CardContent className="p-4 sm:p-6 lg:p-8">
                      <TabsContent value="details">
                        <div className="space-y-4 sm:space-y-6">
                          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Package Description</h2>
                          <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-600">
                            {packageData.details.split('\n').map((paragraph, index) => (
                              <p key={index} className="mb-3 sm:mb-4">{paragraph}</p>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="included">
                        <div className="space-y-6 sm:space-y-8">
                          <div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                              Package Includes
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                              {packageData.included.map((item, index) => (
                                <div key={index} className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg">
                                  <span className="text-green-600 font-bold">•</span>
                                  <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
                              <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                              Package Excludes
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                              {packageData.excluded.map((item, index) => (
                                <div key={index} className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg">
                                  <span className="text-red-600 font-bold">•</span>
                                  <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="booking">
                        <BookingForm packageId={packageData.id} />
                      </TabsContent>
                    </CardContent>
                  </Card>
                </Tabs>
              </div>

              {/* Right Column - Summary Card */}
              <div>
                <Card className="border-0 rounded-md shadow-black sticky top-4">
                  <CardContent className="p-4 sm:p-6 lg:p-8">
                    <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Package Summary</h3>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-between items-center pb-2 sm:pb-3 border-b">
                        <span className="text-gray-600 text-sm sm:text-base">Type</span>
                        <span className="font-semibold text-gray-900 text-sm sm:text-base">{packageData.type}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 sm:pb-3 border-b">
                        <span className="text-gray-600 text-sm sm:text-base">Duration</span>
                        <span className="font-semibold text-gray-900 text-sm sm:text-base">{packageData.duration} Days</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 sm:pb-3 border-b">
                        <span className="text-gray-600 text-sm sm:text-base">Price</span>
                        <span className="text-sm sm:text-base md:text-lg font-bold text-amber-600">
                          Ksh {packageData.amount.toLocaleString()}/-
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}