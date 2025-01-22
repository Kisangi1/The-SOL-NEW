"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Users,
  Award,
  MapPin,
  Star,
  Sunset,
  Mountain,
  Camera
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function AboutPage() {
  const experiences = [
    {
      icon: Sunset,
      title: "Safari Adventures",
      description: "Experience the magic of African wildlife in their natural habitat"
    },
    {
      icon: Mountain,
      title: "Cultural Immersion",
      description: "Connect with local communities and ancient traditions"
    },
    {
      icon: Camera,
      title: "Photo Expeditions",
      description: "Capture breathtaking moments in Africa's most scenic locations"
    },
    {
      icon: Star,
      title: "Luxury Stays",
      description: "Rest in comfort at carefully selected premium accommodations"
    }
  ];

  const teamMembers = [
    {
      name: "Michael Kisangi",
      role: "Founder & Lead Guide",
      image: "/images/profile1.jpg",
      quote: "Bringing Africa's magic to life through unforgettable journeys."
    },
    {
      name: "Faith Aboki",
      role: "Travel Coordinator",
      image: "/images/profile1.jpg",
      quote: "Creating seamless experiences across the African continent."
    },
    {
      name: "Jennifer Brubaker",
      role: "Client Relations",
      image: "/images/profile1.jpg",
      quote: "Every safari tells a unique story of Africa's wilderness."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden">
        <Image
          src="/images/hero_packages.jpg"
          alt="African landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent">
          <motion.div 
            className="container mx-auto px-4 h-full flex flex-col justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.span 
              className="text-orange-300 text-base sm:text-lg font-medium mb-4"
              {...fadeIn}
            >
              Discover Our Story
            </motion.span>
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
              {...fadeIn}
            >
              The Sol of <span className="text-orange-400">African</span> Travel
            </motion.h1>
          </motion.div>
        </div>
      </div>

      {/* Our Story Section */}
      <motion.section 
        className="py-16 sm:py-20 bg-gradient-to-b from-orange-50 to-white"
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            variants={fadeIn}
          >
            <span className="text-orange-600 font-semibold">Our Journey</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
              Crafting Unforgettable African Adventures
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Since our inception, Sol of African Tours has been dedicated to showcasing 
              the authentic spirit of Africa. We combine luxury with adventure, creating 
              journeys that touch the heart and soul of this magnificent continent.
            </p>
          </motion.div>

          {/* Experience Showcase */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            variants={staggerChildren}
          >
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={fadeIn}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full mb-6">
                  <experience.icon className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{experience.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{experience.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        className="py-16 sm:py-20 bg-white"
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={fadeIn}
          >
            <span className="text-orange-600 font-semibold">Our Team</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-4">
              Meet the Explorers
            </h2>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={staggerChildren}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl"
                variants={fadeIn}
              >
                <div className="aspect-[3/4] relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{member.name}</h3>
                    <p className="text-orange-300 mb-3 sm:mb-4">{member.role}</p>
                    <p className="text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      &quot;{member.quote}&quot;
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section 
        className="py-16 sm:py-20 bg-orange-50"
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={fadeIn}
          >
            <span className="text-orange-600 font-semibold">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-4">
              The Sol of African Difference
            </h2>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={staggerChildren}
          >
            {[
              {
                icon: MapPin,
                title: "Local Expertise",
                description: "Deep knowledge of Africa's hidden gems and authentic experiences"
              },
              {
                icon: Award,
                title: "Premium Service",
                description: "Luxury accommodations and personalized attention to detail"
              },
              {
                icon: Users,
                title: "Cultural Connection",
                description: "Meaningful interactions with local communities and traditions"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={fadeIn}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-6">
                  <feature.icon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}