import { EditDestinationForm } from "@/components/other/EditDestinationForm"

export default function EditDestinationPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Destination</h1>
      <EditDestinationForm destinationId={params.id} />
    </div>
  )
}

