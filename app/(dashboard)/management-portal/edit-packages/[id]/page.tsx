import { EditPackageForm } from "@/components/other/EditPackageFrom"

export default function EditPackagePage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Package</h1>
      <EditPackageForm packageId={params.id} />
    </div>
  )
}

