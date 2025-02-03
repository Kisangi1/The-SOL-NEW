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
    image: '/images/one.jpg',
    title: 'Explore Park Experiences',
    subtitle: 'From KES 16,000 Per Person Sharing',
    tag: 'FEATURED TRAVEL',
    link: '/packages'
  },
  {
    image: '/images/two.jpg',
    title: 'Mountain Expeditions',
    subtitle: 'From KES 25,000 Per Person',
    tag: 'FEATURED TRAVEL',
    link: '/packages'
  },
  {
    image: '/images/three.jpg',
    title: 'Explore Park Adventures',
    subtitle: 'From KES 20,000 Per Person',
    tag: 'FEATURED TRAVEL',
    link: '/packages'
  },
  {
    image: '/images/four.jpg',
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
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const currentItem = carouselItems[currentSlide]
  const nextItem = carouselItems[(currentSlide + 1) % carouselItems.length]

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden ">
      {/* Background Image with Gradient Overlay */}
      <motion.div 
        key={currentSlide}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${currentItem.image})`
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 h-full font-sans flex flex-col justify-end pb-32 text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut"
            }}
            className="space-y-4"
          >
            <motion.span 
              className="inline-block text-sm font-medium tracking-wider mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.2 }}
            >
              {currentItem.tag}
            </motion.span>

            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {currentItem.title}
            </motion.h1>
            
            <motion.p 
              className="text-xl sm:text-2xl opacity-90 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {currentItem.subtitle}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Link 
                href={currentItem.link}
                className="inline-block bg-amber-800 hover:bg-amber-700 text-white px-6 py-3 rounded text-lg font-medium transition duration-300 mt-4"
              >
                LEARN MORE
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
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