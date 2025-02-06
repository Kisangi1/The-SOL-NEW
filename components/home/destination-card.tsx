import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MapPin } from "lucide-react"

interface DestinationCardProps {
  id: string
  image: string
  title: string
  price: number
  location?: string
}

const DestinationCard = ({
  id,
  image,
  title,
  price,
  location
}: DestinationCardProps) => {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg">
      {/* Image Container - Changed aspect ratio to make image larger */}
      <div className="relative aspect-[3/2] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw,
                 (max-width: 768px) 50vw,
                 (max-width: 1024px) 33vw,
                 25vw"
        />
      </div>
      
      {/* Content Container - Minimized padding */}
      <div className="relative flex min-h-fit flex-col p-2">
        {/* Title - Reduced margin */}
        <h3 className="mb-1 line-clamp-2 text-lg font-semibold text-gray-900 sm:text-xl">
          {title}
        </h3>
        
        {/* Location - Reduced margin */}
        {location && (
          <div className="mb-1 flex items-center gap-1.5 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{location}</span>
          </div>
        )}
        
        {/* Price Section - Minimized spacing */}
        <div className="mt-1 space-y-1.5">
          <div>
            <p className="text-sm text-gray-600">Starting from</p>
            <p className="text-xl font-bold text-gray-900">
              KES {price.toLocaleString()}
            </p>
          </div>
          
          {/* Button - Reduced padding */}
          <Link href={`/packages/${id}`} className="block w-full">
            <Button
              variant="secondary"
              className="w-full bg-amber-600 py-1 text-sm font-medium text-white transition-colors hover:bg-amber-700"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DestinationCard