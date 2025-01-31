import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <div className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[60vh] xl:h-[70vh] w-full">
        <Skeleton className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent">
          <div className="container mx-auto h-full px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="flex flex-col justify-center h-full max-w-4xl space-y-4">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-16 w-96" />
            </div>
          </div>
        </div>
      </div>

      {/* Packages Grid Skeleton */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden border border-gray-200 rounded-lg">
              {/* Image Skeleton */}
              <Skeleton className="h-48 w-full" />
              
              <CardContent className="p-4 space-y-4">
                {/* Title Skeleton */}
                <Skeleton className="h-6 w-3/4" />
                
                {/* Details Row */}
                <div className="flex items-center justify-between">
                  {/* Duration */}
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-8" /> {/* "From" text */}
                    <Skeleton className="h-4 w-24" /> {/* Price */}
                    <Skeleton className="h-4 w-32" /> {/* "Per Person Sharing" */}
                  </div>
                </div>

                {/* Button Skeleton */}
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}