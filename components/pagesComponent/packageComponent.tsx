"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import { Pagination } from "@/components/ui/pagination"; // Ensure correct import

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

const PackageTypes = [
  "ALL",
  "VALENTINE",
  "BIRTHDAY",
  "CHRISTMAS",
  "EASTER",
  "EID",
  "WEEKEND",
  "HONEYMOON",
  "OTHER",
];

export default function PackagesPage({ initialPackages, metadata }: PackagesPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedType, setSelectedType] = useState(searchParams.get("type") || "ALL");

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    return params.toString();
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    const type = value === "ALL" ? "" : value;
    router.push(`${pathname}?${createQueryString("type", type)}`);
  };

  const handlePageChange = (page: number) => {
    router.push(`${pathname}?${createQueryString("page", page.toString())}`);
  };

  // Ensuring the page is only rendered on the client side to avoid SSR issues with useContext
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Or a loading spinner
  }

  return (
    <div className="container mx-auto py-8">
      {/* Hero Section */}
      <div className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden">
        <Image
          src="/images/destinations.jpeg"
          alt="African landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <span className="text-orange-300 text-base sm:text-lg font-medium mb-4">
              Discover Our Story
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Understand<span className="text-orange-400"> our</span> story
            </h1>
          </div>
        </div>
      </div>

      {/* Destination Title Section */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs sm:text-sm md:text-base lg:text-lg font-medium mb-2 sm:mb-3 md:mb-4 text-orange-300">
          Your Gateway to African Adventures
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight">
          Explore <span className="text-orange-400">our</span> destinations
        </h1>
        <Select value={selectedType} onValueChange={handleTypeChange}>
          {PackageTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialPackages.map((pkg) => (
          <Card key={pkg.id} className="flex flex-col">
            {pkg.imageData && (
              <div className="relative h-48 w-full">
                <Image
                  src={pkg.imageData}
                  alt={pkg.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle>{pkg.name}</CardTitle>
              <CardDescription>{pkg.type} Package</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{pkg.description}</p>
              <div className="mt-4">
                <p className="font-bold text-2xl">KES {pkg.amount.toLocaleString()}/-</p>
                <p>{pkg.numberOfDays} {pkg.dayOrNight}s</p>
              </div>
            </CardContent>
            <CardFooter className="mt-auto">
              <Link href={`/packages/${pkg.id}`} className="w-full">
                <Button className="w-full">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {metadata.totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            page={metadata.page} // Ensure correct prop names
            totalPages={metadata.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
