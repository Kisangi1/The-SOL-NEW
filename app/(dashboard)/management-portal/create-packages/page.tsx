import { auth } from "@clerk/nextjs/server";
import PackageForm from "@/components/other/packageForm";

export default async function NewPackagePage() {
  const { userId } = await auth();
  if (!userId) {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Package</h1>
      <PackageForm />
    </div>
  );
}