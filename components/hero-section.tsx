"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

interface CarouselItem {
  image: string
  title: string
  subtitle: string
  link: string
  price?: string
  tag?: string
}

const carouselItems: CarouselItem[] = [
  {
    image: "/images/lionmara.jpg",
    title: "Park Adventures Await",
    subtitle: "From USD 160 Per Person Sharing",
    tag: "FEATURED TRAVEL",
    link: "/packages",
  },
  {
    image: "/images/two.webp",
    title: "Mountain Trek Expeditions",
    subtitle: "From USD 450 Per Person",
    tag: "FEATURED TRAVEL",
    link: "/packages",
  },
  {
    image: "/images/ambolife.jpg",
    title: "Safari Escape Deals",
    subtitle: "From USD 398 Per Person",
    tag: "FEATURED TRAVEL",
    link: "/packages",
  },
  {
    image: "/images/boatdiani.jpg",
    title: "Coastal Getaway Bliss",
    subtitle: "From USD 650 Per Person",
    tag: "FEATURED TRAVEL",
    link: "/packages",
  },
  {
    image: "/images/diving.jpg",
    title: "Dive in the tropical waters of Indian Ocean",
    subtitle: "From KES 11,200 Per Person",
    tag: "FEATURED TRAVEL",
    link: "/packages",
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [nextSlide])

  const currentItem = carouselItems[currentSlide]
  const nextItem = carouselItems[(currentSlide + 1) % carouselItems.length]

  return (
    <section className="relative w-full h-[calc(100vh-4rem)] min-h-[500px] max-h-[800px] overflow-hidden bg-gray-900">
      {/* Background Image with Smooth Transition */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={currentItem.image || "/placeholder.svg"}
            alt={currentItem.title}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full font-sans flex flex-col justify-end pb-16 sm:pb-24 text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="space-y-4"
          >
            <motion.span
              className="inline-block text-xs sm:text-sm font-medium tracking-wider mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {currentItem.tag}
            </motion.span>

            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {currentItem.title}
            </motion.h1>

            <motion.p
              className="text-sm sm:text-base md:text-lg opacity-90 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {currentItem.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link
                href={currentItem.link}
                className="inline-block bg-amber-800 hover:bg-amber-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded text-sm sm:text-base font-medium transition duration-300 mt-4"
              >
                LEARN MORE
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white w-4" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Preload next image */}
      <div className="hidden">
        <Image src={nextItem.image || "/placeholder.svg"} alt={nextItem.title} width={1} height={1} />
      </div>
    </section>
  )
}

