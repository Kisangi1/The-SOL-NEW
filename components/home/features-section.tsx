import React from 'react';
import { Button } from "@/components/ui/button";
import { Bus, Compass, TentTree, Camera, LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";

const FeatureCard = ({ icon: Icon, title, description }: { icon: LucideIcon, title: string, description: string }) => (
  <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
    <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-amber-600" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 text-sm md:text-base">{description}</p>
  </div>
);

export default function FeaturesSection() {
  const features = [
    {
      icon: Bus,
      title: "Safari Adventures",
      description: "Experience breathtaking wildlife encounters in their natural habitat"
    },
    {
      icon: Compass,
      title: "Expert Guides",
      description: "Local guides with deep knowledge of African terrain and wildlife"
    },
    {
      icon: TentTree,
      title: "Luxury Camps",
      description: "Premium accommodations blending comfort with wilderness"
    },
    {
      icon: Camera,
      title: "Photo Safari",
      description: "Perfect moments to capture Africa's stunning landscapes"
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-gray-50 font-sans">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
            <div className="inline-flex items-center rounded-full bg-amber-600 px-4 py-1 text-sm text-white">
              Discover Africa
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold leading-tight font-sans">
              Experience the magic <br className="hidden md:block" />
              of African Wilderness
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/packages">
                <Button className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700">
                  Explore Packages
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="w-full sm:w-auto border-amber-600 text-amber-600 hover:bg-amber-50">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative">
            <div className="relative h-64 sm:h-96 lg:h-[600px] w-full">
              <Image
                src="/images/kilimanjaro.jpg"
                alt="African Safari"
                className="rounded-2xl object-cover"
                fill
                priority
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 md:p-6 rounded-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold">Serengeti Safari</p>
                    <p className="text-amber-600 font-sans">Kilimanjaro and wildlife await.</p>
                  </div>
                  <Link href="destinations/serengeti">
                    <Button size="sm" className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}