import { prisma } from "@/lib/db";
import PackagesPage from "@/components/pagesComponent/packageComponent";
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
async function getPackages() {
  return await prisma.package.findMany({
    orderBy: {
      createdAt: 'desc' 
    }
  });
}

export default async function PackagesServerPage() {
  const packages = await getPackages();
  return <PackagesPage initialPackages={packages} />;
}