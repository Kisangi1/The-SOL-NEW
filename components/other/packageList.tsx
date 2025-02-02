import Link from "next/link";
import { Package } from "@prisma/client";

interface PackageListProps {
  packages: Package[];
}

export default function PackageList({ packages }: PackageListProps) {
  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="px-6 py-3 border-b">Name</th>
          <th className="px-6 py-3 border-b">Type</th>
          <th className="px-6 py-3 border-b">Amount</th>
          <th className="px-6 py-3 border-b">Duration</th>
          <th className="px-6 py-3 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {packages.map((pkg) => (
          <tr key={pkg.id}>
            <td className="px-6 py-4 border-b">{pkg.name}</td>
            <td className="px-6 py-4 border-b">{pkg.type}</td>
            <td className="px-6 py-4 border-b">${pkg.amount}</td>
            <td className="px-6 py-4 border-b">{pkg.duration} days, {pkg.nights} nights</td>
            <td className="px-6 py-4 border-b">
              <Link href={`/dashboard/packages/${pkg.id}/edit`} className="btn btn-sm btn-secondary mr-2">
                Edit
              </Link>
              <button className="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}