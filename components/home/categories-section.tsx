import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export function CategoriesSection() {
  const categories = [
    { name: "Destinations", image: "/images/destinations_image.svg", link: "/destinations" },
    { name: "Packages", image: "/images/packages_image.svg", link: "/packages" },
    { name: "Family", image: "/images/family.svg", link: "/packages" },
    { name: "Accommodation", image: "/images/hotel_image.svg", link: "/destiantions" },
  ]

  return (
    <section className="py-16 font-sans">
      <div className="container mx-auto px-4">
      <div className="inline-flex items-center rounded-full bg-green-100 px-4 py-1 text-sm text-green-600">
             We belive in freedom
            </div>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold mt-4 mb-2">Explore another category</h2>
          <Link href="/packages" className="text-green-600 text-md hover:underline">
            All Category
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link href={category.link} key={index}>
              <Card className="group cursor-pointer overflow-hidden">
                <CardContent className="relative p-0">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={300}
                    height={200}
                    className="h-[200px] w-full object-fit transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 p-6">
                    <div className="flex h-full items-center justify-center">
                      <h3 className="text-xl font-bold text-white">{category.name}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

