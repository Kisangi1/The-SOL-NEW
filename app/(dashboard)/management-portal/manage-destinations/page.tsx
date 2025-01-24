import { SignedIn } from "@clerk/nextjs"
import { ManageDestinations } from "@/components/other/ManageDestinations"

export default function ManageDestinationsPage() {
  return (
    <SignedIn>
      <div className="container mx-auto py-8">
        <ManageDestinations />
      </div>
    </SignedIn>
  )
}

