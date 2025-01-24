import { SignedIn } from "@clerk/nextjs"
import { CreateDestinationForm } from "@/components/other/CreateDestination"

export default function CreateDestinationPage() {
  return (
    <SignedIn>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Create Destination</h1>
        <CreateDestinationForm />
      </div>
    </SignedIn>
  )
}

