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
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:shadow-xl">
      <div className="relative h-48 w-full sm:h-56 md:h-64 lg:h-[300px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, 
                 (max-width: 768px) 50vw,
                 (max-width: 1024px) 33vw,
                 25vw"
        />
      </div>
      
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4 md:p-5 lg:p-6">
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-lg font-semibold text-white sm:text-xl md:text-xl lg:text-2xl line-clamp-2">
            {title}
          </h3>
          
          {location && (
            <div className="flex items-center gap-1 text-white/90">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">{location}</span>
            </div>
          )}
          
          <div className="flex flex-col space-y-2 pt-1 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:pt-2">
            <div className="space-y-0.5">
              <p className="text-xs text-white/80 sm:text-sm">Starting from</p>
              <p className="text-base font-bold text-white sm:text-lg md:text-xl">
                KES {price.toLocaleString()}
              </p>
            </div>
            
            <Link href={`/packages/${id}`} className="block">
              <Button 
                variant="secondary"
                size="sm"
                className="w-full bg-amber-600 text-xs hover:bg-amber-700 sm:w-auto sm:text-sm"
              >
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DestinationCard