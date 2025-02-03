import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

interface DestinationCardProps {
  image: string
  title: string
  price: number
  location?: string
}

export function DestinationCard({ 
  image, 
  title, 
  price, 
}: DestinationCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg">
      <Image
        src={image}
        alt={title}
        width={400}
        height={300}
        className="h-[300px] w-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="mt-2 flex items-center justify-between font-sans">
          <p className="text-sm text-white capitalize">
            kes. {price}
          </p>
          <Link href={`/packages/${title.toLowerCase().replace(/\s+/g, '-')}`}>
            <Button variant="secondary" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}