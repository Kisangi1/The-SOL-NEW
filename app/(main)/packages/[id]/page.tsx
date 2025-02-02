import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import PackageDetails from "@/components/other/packageDetail";

export default async function PackageDetailPage({ params }: { params: { id: string } }) {
  const packageData = await prisma['package'].findUnique({
    where: { id: params.id },
  });

  if (!packageData) {
    notFound();
  }

  return (
    <div>
      <PackageDetails package={packageData} />
    </div>
  );
}