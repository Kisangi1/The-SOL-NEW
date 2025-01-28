import React from 'react';
import Image from 'next/image';
import { Binoculars, Mountain, Sun, Users } from 'lucide-react';
import Link from "next/link";


export default function SolAfricanFeatures() {
  const experiences = [
    {
      title: "Safari Expeditions",
      icon: Binoculars,
      color: "bg-amber-100",
      textColor: "text-amber-800",
      description: "Track the Big Five across vast savannas",
    },
    {
      title: "Mountain Treks",
      icon: Mountain,
      color: "bg-emerald-100",
      textColor: "text-emerald-800",
      description: "Scale Kilimanjaro's majestic peaks",
    },
    {
      title: "Desert Adventures",
      icon: Sun,
      color: "bg-orange-100",
      textColor: "text-orange-800",
      description: "Journey through Sahara's golden dunes",
    },
    {
      title: "Cultural Immersion",
      icon: Users,
      color: "bg-purple-100",
      textColor: "text-purple-800",
      description: "Connect with indigenous communities",
    }
  ];

  return (
    <section className="py-16 px-4 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-5xl font-bold mb-6">
            <span className="text-amber-600">Sol</span> of African
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            Where every journey tells a story of discovery
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="relative h-[500px] rounded-3xl overflow-hidden group">
            <Image
              src="/images/wildbeast.svg"
              alt="Featured Tour"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="absolute bottom-0 p-8 text-white">
                <span className="text-amber-700 text-sm tracking-wider bg-white rounded-full px-4 py-2">FEATURED EXPERIENCE</span>
                <h3 className="text-3xl font-bold my-3">Wildbeast Migration</h3>
                <p className="text-gray-200 mb-4">Witness nature&apos;s greatest spectacle</p>
                <Link href="destinations/masai-mara">
                <button className="bg-amber-700 hover:bg-amber-600 text-white px-6 py-3 rounded-full transition-colors">
                  Book Now
                </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {experiences.map((exp, index) => (
              <div key={index} className="group rounded-2xl p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className={`${exp.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <exp.icon className={`w-6 h-6 ${exp.textColor}`} />
                </div>
                <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                <p className="text-gray-600 text-sm">{exp.description}</p>
                <div className="mt-4 flex items-center text-amber-600 text-sm font-medium">
                  <a href="/destinations" className="flex items-center">
                    Learn more
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}