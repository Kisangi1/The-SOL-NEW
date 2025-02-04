'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

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
    image: '/images/one.webp',
    title: 'Explore Park Experiences',
    subtitle: 'From KES 16,000 Per Person Sharing',
    tag: 'FEATURED TRAVEL',
    link: '/packages'
  },
  {
    image: '/images/two.webp',
    title: 'Mountain Expeditions',
    subtitle: 'From KES 25,000 Per Person',
    tag: 'FEATURED TRAVEL',
    link: '/packages'
  },
  {
    image: '/images/three.webp',
    title: 'Explore Park Adventures',
    subtitle: 'From KES 20,000 Per Person',
    tag: 'FEATURED TRAVEL',
    link: '/packages'
  },
  {
    image: '/images/four.webp',
    title: 'Coastal Vibes',
    subtitle: 'From KES 18,000 Per Person',
    tag: 'FEATURED TRAVEL',
    link: '/packages'
  }
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
    }, 6000) // Slightly longer interval for smoother transitions

    return () => {
      clearInterval(interval)
    }
  }, [])

  const currentItem = carouselItems[currentSlide]
  const nextItem = carouselItems[(currentSlide + 1) % carouselItems.length]

  return (
    <section className="relative w-full h-screen min-h-[500px] max-h-[800px] overflow-hidden  bg-gray-900">
      {/* Background Image with Soft Transition */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ 
            duration: 1.5, 
            ease: "easeInOut" 
          }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${currentItem.image})`
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        </motion.div>
      </AnimatePresence>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full font-sans flex flex-col justify-end pb-16 sm:pb-24 text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ 
              duration: 1,
              ease: "easeInOut"
            }}
            className="space-y-4"
          >
            <motion.span 
              className="inline-block text-xs sm:text-sm font-medium tracking-wider mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ 
                delay: 0.2, 
                duration: 0.8,
                ease: "easeOut" 
              }}
            >
              {currentItem.tag}
            </motion.span>

            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: 0.4, 
                duration: 0.8,
                ease: "easeOut" 
              }}
            >
              {currentItem.title}
            </motion.h1>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl opacity-90 max-w-2xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: 0.6, 
                duration: 0.8,
                ease: "easeOut" 
              }}
            >
              {currentItem.subtitle}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.8, 
                duration: 0.8,
                ease: "easeOut" 
              }}
            >
              <Link 
                href={currentItem.link}
                className="inline-block bg-amber-800 hover:bg-amber-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded text-sm sm:text-lg font-medium transition duration-300 mt-4"
              >
                LEARN MORE
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Preload next image */}
      <div 
        className="hidden"
        style={{
          backgroundImage: `url(${nextItem.image})`
        }}
      />
    </section>
  )
}