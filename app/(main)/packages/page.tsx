import { prisma } from "@/lib/db";
import PackagesPage from "@/components/pagesComponent/packageComponent";
import { Suspense } from "react";
import Loading from "@/components/other/loading";

export const revalidate = 3600; // Revalidate every hour

async function getPackages(page = 1, limit = 12) {
  try {
    if (!prisma) {
      throw new Error("Database connection failed");
    }

    const [packages, total] = await Promise.all([
      prisma.package.findMany({
        take: limit,
        skip: (page - 1) * limit,
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
      prisma.package.count()
    ]);

    return {
      packages,
      metadata: {
        page,
        limit,
        total,
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

export default async function PackagesServerPage() {
  const { packages, metadata } = await getPackages();
  
  return (
    <Suspense fallback={<Loading />}>
      <PackagesPage initialPackages={packages} metadata={metadata} />
    </Suspense>
  );
}