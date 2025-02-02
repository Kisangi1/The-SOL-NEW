import Link from "next/link";
import Image from "next/image";
import { Package } from "@prisma/client";

interface PackageCardProps {
  package: Package;
}

export default function PackageCard({ package: packageData }: PackageCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <div className="relative h-48">
        <Image
          src={packageData.imageUrl || "/images/placeholder.jpg"}
          alt={packageData.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{packageData.name}</h2>
        <p className="text-gray-600 mb-2">{packageData.details.substring(0, 100)}...</p>
        <p className="font-bold mb-2">Type: {packageData.type}</p>
        <p className="text-lg font-bold mb-2">${packageData.amount}</p>
        <p className="mb-4">{packageData.duration} days, {packageData.nights} nights</p>
        <Link href={`/packages/${packageData.id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
}