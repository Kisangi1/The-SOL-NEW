import React from 'react';
import Image from 'next/image';

const images = [
  {
    src: '/images/one.jpg',
    alt: 'Next.js Conference Logo with Golden Gate Bridge',
    featured: true
  },
  {
    src: '/images/two.webp',
    alt: 'Conference attendee in Next.js t-shirt'
  },
  {
    src: '/images/three.webp',
    alt: 'Conference auditorium view'
  },
  {
    src: '/images/a.jpg',
    alt: 'Conference speakers on stage'
  },
  {
    src: '/images/b.jpg',
    alt: 'Conference attendees having fun'
  },
  {
    src: '/images/c.jpg',
    alt: 'Group photo of conference attendees'
  },
  {
    src: '/images/d.jpg',
    alt: 'Team members networking'
  },
  {
    src: '/images/e.jpg',
    alt: 'Conference attendees group photo'
  },
  {
    src: '/images/forest.jpg',
    alt: 'Conference networking session'
  },
  {
    src: '/images/forest.jpg',
    alt: 'Team members at conference booth'
  },
  {
    src: '/images/forest.jpg',
    alt: 'Evening conference event'
  },
  {
    src: '/images/forest.jpg',
    alt: 'Conference social gathering'
  },
  {
    src: '/images/forest.jpg',
    alt: 'Conference social gathering'
  }
];

const GallerySection = () => {
  return (
    <section className="w-full bg-gradient-to-b from-[#f6efe5]  py-12 md:py-16">
      <div className="container mx-auto px-4">
      <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
      Where Nature Meets <span className="text-green-600">Adventure </span>{" "}
      Gallery
            </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className={`relative overflow-hidden rounded-lg ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;