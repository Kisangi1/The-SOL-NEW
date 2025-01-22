import React from 'react';
import { Button } from "@/components/ui/button";
import { Bus,  Compass, TentTree, Camera, LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";


const FeatureCard = ({ icon: Icon, title, description }: { icon: LucideIcon, title: string, description: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
    <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-amber-600" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-flex items-center rounded-full bg-amber-600  px-4 py-1 text-sm text-white">
              Discover Africa
            </div>
            
            <h2 className="text-4xl font-bold leading-tight">
              Experience the Magic <br />
              of African Wilderness
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>

            <div className="flex gap-4">
              <Link href="/packages">
                <Button className="bg-amber-600 hover:bg-amber-700">
                  Explore Packages
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative h-[600px] w-full">
              <Image
                src="/images/safari.svg"
                alt="African Safari"
                className="rounded-2xl object-cover"
                fill
                priority
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold">Serengeti Safari</p>
                    <p className="text-amber-600 font-sans">Starting from kes. 35000/-</p>
                  </div>
                  <Link href="destination/serengeti">
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
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