import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import PackageForm from "@/components/other/packageForm";

export default async function EditPackagePage({ params }: { params: { id: string } }) {
  const { userId } = await auth();
  
  if (!userId) {
    return <div>Unauthorized</div>;
  }

  const packageData = await prisma.package.findUnique({
    where: { id: params.id },
  });

  if (!packageData) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 font-sans">
      <h1 className="text-3xl font-bold mb-6">Edit Package</h1>
      <PackageForm package={packageData} isEdit={true} />
    </div>
  );
}