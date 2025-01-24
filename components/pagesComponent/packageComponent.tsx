"use client";

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package } from "@prisma/client";

interface PackagesPageProps {
  initialPackages: Package[];
}

const ITEMS_PER_PAGE = 6;

export default function PackagesPage({ initialPackages }: PackagesPageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(initialPackages.length / ITEMS_PER_PAGE);

  const paginatedPackages = initialPackages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] w-full overflow-hidden">
        <Image
          src="/images/hero_packages.jpg"
          alt="African landscape"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent">
          <div className="container mx-auto h-full px-4">
            <div className="flex flex-col justify-center h-full max-w-4xl">
              <span className="text-orange-300 text-sm md:text-base lg:text-lg font-medium mb-4">
                Your Gateway to African Adventures
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                Explore Our Packages
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-2xl">
                Discover Incredible Journeys Across Africa
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Packages Section */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center">
          <span className="text-amber-600">Explore </span>Destinations
        </h2>
        <div className="w-16 md:w-24 h-1 bg-amber-600 mx-auto mb-10" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPackages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 rounded-xl overflow-hidden"
            >
              {pkg.imageData && (
                <div className="relative w-full h-56">
                  <Image
                    src={pkg.imageData || "/placeholder.svg"}
                    alt={pkg.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {pkg.type} Package
                  </div>
                </div>
              )}
              <CardContent className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-amber-600">
                    KES {pkg.amount.toLocaleString()}/-
                  </span>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Link href={`/packages/${pkg.id}`} className="w-full" passHref>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 transition-colors">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-10 space-x-4">
          <Button 
            variant="outline"
            onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button 
            variant="outline"
            onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}