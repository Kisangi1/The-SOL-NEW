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
    images: ["/images/one.jpg"]
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
    src: '/images/one.webp',
    alt: 'Rhino in the savannah'
  },
  {
    src: '/images/three.webp',
    alt: 'Gazelles grazing in the wild'
  },
  {
    src: '/images/a.jpg',
    alt: 'Elephants at the field'
  },
  {
    src: '/images/two.webp',
    alt: 'Mount Kilimanjaro at dawn'
  },
  {
    src: '/images/c.jpg',
    alt: 'Lion resting under a tree'
  },
  // {
  //   src: '/images/d.jpg',
  //   alt: 'Giraffes in the wild'
  // },
  {
    src: '/images/e.jpg',
    alt: 'Vultures eating a carcass'
  }
  // {
  //   src: '/images/b.jpg',
  //   alt: 'Zebra herd in the savannah'
  // }
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-square relative group">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-medium">{image.alt}</p>
                </div>
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