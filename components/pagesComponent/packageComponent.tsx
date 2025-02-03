import React from 'react';
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
  onPageChange?: (page: number) => void;
}

const PackagesPage = ({ 
  initialPackages = [], 
  metadata = { total: 0, page: 1, limit: 9, totalPages: 1 },
  onPageChange 
}: PackagesPageProps) => {
  if (!Array.isArray(initialPackages)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">No packages available</h2>
          <p className="text-gray-600 mt-2">Please check back later</p>
        </div>
      </div>
    );
  }

  const PaginationButton = ({ 
    isActive = false,
    onClick,
    disabled = false,
    children 
  }: {
    page: number;
    isActive?: boolean;
    onClick: () => void;
    disabled?: boolean;
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-3 py-1 mx-1 rounded-md text-sm font-medium
        ${isActive 
          ? 'bg-amber-600 text-white' 
          : 'text-gray-700 hover:bg-gray-100'}
        ${disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'cursor-pointer'}
      `}
    >
      {children}
    </button>
  );

  const renderPaginationButtons = () => {
    const buttons = [];
    const showEllipsis = metadata.totalPages > 7;
    
    if (showEllipsis) {
      // Always show first page
      buttons.push(
        <PaginationButton
          key={1}
          page={1}
          isActive={metadata.page === 1}
          onClick={() => onPageChange?.(1)}
        >
          1
        </PaginationButton>
      );

      // Show ellipsis or numbers after first page
      if (metadata.page > 3) {
        buttons.push(<span key="ellipsis1" className="mx-1">...</span>);
      }

      // Show current page and surrounding pages
      for (let i = Math.max(2, metadata.page - 1); i <= Math.min(metadata.totalPages - 1, metadata.page + 1); i++) {
        buttons.push(
          <PaginationButton
            key={i}
            page={i}
            isActive={metadata.page === i}
            onClick={() => onPageChange?.(i)}
          >
            {i}
          </PaginationButton>
        );
      }

      // Show ellipsis or numbers before last page
      if (metadata.page < metadata.totalPages - 2) {
        buttons.push(<span key="ellipsis2" className="mx-1">...</span>);
      }

      // Always show last page
      if (metadata.totalPages > 1) {
        buttons.push(
          <PaginationButton
            key={metadata.totalPages}
            page={metadata.totalPages}
            isActive={metadata.page === metadata.totalPages}
            onClick={() => onPageChange?.(metadata.totalPages)}
          >
            {metadata.totalPages}
          </PaginationButton>
        );
      }
    } else {
      // Show all pages if total pages is 7 or less
      for (let i = 1; i <= metadata.totalPages; i++) {
        buttons.push(
          <PaginationButton
            key={i}
            page={i}
            isActive={metadata.page === i}
            onClick={() => onPageChange?.(i)}
          >
            {i}
          </PaginationButton>
        );
      }
    }

    return buttons;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <div className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[60vh] xl:h-[70vh] w-full overflow-hidden">
        <Image
          src="/images/destinations.jpeg"
          alt="African landscape"
          fill
          className="absolute inset-0 object-cover"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent">
          <div className="container mx-auto h-full px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="flex flex-col justify-center h-full max-w-4xl">
              <span className="text-xs sm:text-sm md:text-base lg:text-lg font-medium mb-2 sm:mb-3 md:mb-4 text-orange-300">
                Your Gateway to African Adventures
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight">
                Travel <span className="text-orange-400">with</span> us
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 text-center">
          <span className="text-amber-600 font-sans">Explore </span>Packages
        </h2>
        <div className="w-16 sm:w-20 md:w-24 h-1 bg-amber-600 mx-auto mb-4 sm:mb-5 md:mb-6" />
        {initialPackages.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-800">No packages available</h2>
            <p className="text-gray-600 mt-2">Please check back later for new travel packages</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {initialPackages.map((pkg) => (
                <Link href={`/packages/${pkg.id}`} key={pkg.id} className="transform hover:scale-105 transition-transform duration-300">
                  <Card className="h-full overflow-hidden border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48 w-full">
                      <Image
                        src={pkg.imageData || "/images/destinations.jpeg"}
                        alt={pkg.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {pkg.name}
                      </h3>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2 font-sans mt-4">
                          <span className="text-gray-500">From</span>
                          <span className="font-semibold text-gray-900">
                            KES {pkg.amount.toLocaleString()}
                          </span>
                          <span className="text-gray-500">Per Person</span>
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white uppercase text-sm tracking-wider"
                        variant="secondary"
                      >
                        EXPLORE
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {metadata.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <PaginationButton
                  page={metadata.page - 1}
                  onClick={() => onPageChange?.(metadata.page - 1)}
                  disabled={metadata.page === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </PaginationButton>

                {renderPaginationButtons()}

                <PaginationButton
                  page={metadata.page + 1}
                  onClick={() => onPageChange?.(metadata.page + 1)}
                  disabled={metadata.page === metadata.totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </PaginationButton>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PackagesPage;