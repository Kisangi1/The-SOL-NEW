"use client";

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div>
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
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPackages.map((pkg) => (
            <Card key={pkg.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{pkg.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                {pkg.imageData && (
                  <Image
                    src={pkg.imageData || "/placeholder.svg"}
                    alt={pkg.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <p className="text-lg font-bold mb-2">${pkg.amount}</p>
                <p className="text-sm text-gray-500">
                  {pkg.numberOfDays} {pkg.dayOrNight}s
                </p>
                <p className="text-sm font-medium mt-2">{pkg.type}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/packages/${pkg.id}`} passHref>
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-8 space-x-4">
          <Button 
            onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button 
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