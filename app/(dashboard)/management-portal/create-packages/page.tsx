import { CreatePackageForm } from "@/components/other/CreatePackageForm"

export default function CreatePackagePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Create Package</h1>
      <CreatePackageForm />
    </div>
  )
}

