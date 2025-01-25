import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Gallery | Sol Of African",
  description: "Explore breathtaking moments from our African travel experiences. Discover the raw beauty, wildlife, and cultural landscapes that define our extraordinary journeys.",
  keywords: [
    "African travel photography",
    "safari gallery",
    "wildlife photography",
    "African landscape images",
    "travel experience gallery",
    "African adventure moments"
  ],
  openGraph: {
    title: "Sol Of African: Visual Journey",
    description: "A visual exploration of Africa's most stunning destinations and unforgettable experiences.",
    type: "website",
    images: ["/images/safari-lion.jpg"]
  }
};

// Hero Component
const HeroSection = () => {
  return (
    <div className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden">
      <Image
          src="/images/destinations.jpeg"
        alt="African landscape"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center">
          <span className="text-orange-300 text-base sm:text-lg font-medium mb-4">
            Discover Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Get <span className="text-orange-400">African</span> memories
          </h1>
        </div>
      </div>
    </div>
  );
};

// Gallery Images Configuration
const galleryImages = [
  {
    src: '/images/elephant.jpg',
    alt: 'Majestic lion in savanna',
    featured: true
  },
  {
    src: '/images/elephant.jpg',
    alt: 'Elephant herd at sunset'
  },
  {
    src: '/images/elephant.jpg',
    alt: 'Dramatic African landscape'
  },
  {
    src: '/images/elephant.jpg',
    alt: 'Traditional tribal dance'
  },
  {
    src: '/images/elephant.jpg',
    alt: 'Mount Kilimanjaro at dawn'
  },
  {
    src: '/images/elephant.jpg',
    alt: 'Giraffes in open plains'
  },
  {
    src: '/images/elephant.jpg',
    alt: 'Vibrant African market scene'
  },
  {
    src: '/images/elephant.jpg',
    alt: 'Wildebeest river crossing'
  },
  {
    src: '/images/elephant.jpg',
    alt: 'Sunset over acacia trees'
  }
];

// Gallery Grid Component
const GalleryGrid = () => {
  return (
    <section className="w-full bg-gradient-to-b from-[#f4e6d0] to-[#f9f5f0] py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Moments of <span className="text-orange-600">African</span> Wonder
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Every image tells a story of adventure, culture, and the raw beauty of the African continent.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-xl shadow-lg ${
                image.featured ? 'md:col-span-2' : ''
              }`}
            >
              <div className="aspect-[4/3] relative group">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Gallery Page Component
export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#f9f5f0]">
      <HeroSection />
      <GalleryGrid />
    </main>
  );
}