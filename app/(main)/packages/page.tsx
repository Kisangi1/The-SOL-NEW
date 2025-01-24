import { prisma } from "@/lib/db";
import PackagesPage from "@/components/pagesComponent/packageComponent";

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