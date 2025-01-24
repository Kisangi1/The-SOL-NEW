import { SignedIn } from "@clerk/nextjs"
import { ManagePackages } from "@/components/other/ManagePackage"

export default function ManagePackagesPage() {
  return (
    <SignedIn>
    <div className="container mx-auto py-8">
      <ManagePackages />
    </div>
    </SignedIn>
  )
}

