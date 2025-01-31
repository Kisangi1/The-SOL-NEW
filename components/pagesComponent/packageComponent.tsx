"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Package {
  id: string;
  name: string;
  description: string;
  amount: number;
  numberOfDays: number;
  dayOrNight: string;
  type: string;
  imageData?: string | null;
}

interface PackageMetadata {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface PackagesPageProps {
  initialPackages: Package[];
  metadata: PackageMetadata;
}

const PackagesPage: React.FC<PackagesPageProps> = ({ 
  initialPackages = [], 
  metadata: initialMetadata 
}) => {
  const [packages, setPackages] = useState(initialPackages);
  const [metadata, setMetadata] = useState(initialMetadata);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPackages = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/packages?page=${page}&limit=${metadata.limit}`);
      if (!response.ok) throw new Error('Failed to fetch packages');
      
      const data = await response.json();
      setPackages(data.packages);
      setMetadata(data.metadata);
    } catch (error) {
      console.error('Packages fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= metadata.totalPages) {
      fetchPackages(page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Packages Grid */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl text-center font-bold mb-6">
          <span className="text-amber-600">Explore </span>Packages
        </h2>

        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : packages.length === 0 ? (
          <div className="text-center">No packages available</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {packages.map((pkg) => (
                <Link href={`/packages/${pkg.id}`} key={pkg.id}>
                  <Card className="h-full">
                    <div className="relative h-48 w-full">
                      <Image
                        src={pkg.imageData || "/images/destinations.jpeg"}
                        alt={pkg.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold">{pkg.name}</h3>
                      <div className="mt-2">
                        From KES {pkg.amount.toLocaleString()} Per Person
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {metadata.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <Button 
                  onClick={() => handlePageChange(metadata.page - 1)}
                  disabled={metadata.page === 1}
                >
                  <ChevronLeft />
                </Button>

                {[...Array(metadata.totalPages)].map((_, i) => (
                  <Button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    variant={metadata.page === i + 1 ? "default" : "outline"}
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button 
                  onClick={() => handlePageChange(metadata.page + 1)}
                  disabled={metadata.page === metadata.totalPages}
                >
                  <ChevronRight />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PackagesPage;