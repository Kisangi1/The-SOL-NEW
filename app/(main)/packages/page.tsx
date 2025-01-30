import { prisma } from "@/lib/db";
import PackagesPage from "@/components/pagesComponent/packageComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Packages | Sol Of African",
  description: "Discover our curated selection of African adventure packages.",
  // ... rest of your metadata
};

export const revalidate = 3600; // Revalidate every hour

async function getPackages(page = 1, limit = 10, type?: string) {
  const skip = (page - 1) * limit;
  
  try {
    const where = type ? { type } : {};
    
    const [packages, total] = await Promise.all([
      prisma.package.findMany({
        take: limit,
        skip,
        where,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          description: true,
          amount: true,
          numberOfDays: true,
          dayOrNight: true,
          type: true,
          imageData: true,
        }
      }),
      prisma.package.count({ where })
    ]);

    return {
      packages,
      metadata: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    console.error("Error fetching packages:", error);
    return {
      packages: [],
      metadata: {
        total: 0,
        page,
        limit,
        totalPages: 0
      }
    };
  }
}

export default async function PackagesServerPage({
  searchParams,
}: {
  searchParams: { page?: string; type?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const { packages, metadata } = await getPackages(page, 10, searchParams.type);
  return <PackagesPage initialPackages={packages} metadata={metadata} />;
}
