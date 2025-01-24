'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { MoveUpRight } from 'lucide-react'
import ScrollIndicator from '@/components/scroll-indicator'

// Define the structure of a carousel item
interface CarouselItem {
  image: string
  title: string
  subtitle: string
  link: string
}

// Carousel data
const carouselItems: CarouselItem[] = [
  {
    image: '/images/twelve.jpg',
    title: 'Mountain Expeditions',
    subtitle: 'Conquer Peaks, Create Memories',
    link: '/packages'
  },
  {
    image: '/images/one.jpg',
    title: 'Bird Watching',
    subtitle: 'Explore the Avian Wonders',
    link: '/packages'
  },
  {
    image: '/images/lamu.jpg',
    title: 'Coastal Experiences',
    subtitle: 'Luxury Adventures and Unforgettable Moments',
    link: '/packages'
  }
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
    }, 5000) 

    const handleScroll = () => {
      if (window.scrollY > 100) { // Hide after 100px of scrolling
        setShowScrollIndicator(false)
      } else {
        setShowScrollIndicator(true)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      clearInterval(interval)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const currentItem = carouselItems[currentSlide]
  const nextItem = carouselItems[(currentSlide + 1) % carouselItems.length]

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-gray-900">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out"
        style={{
          backgroundImage: `url(${currentItem.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Overlay to improve text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-start text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ 
              type: 'tween',
              duration: 0.6
            }}
            className="max-w-3xl space-y-4"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              {currentItem.title}
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl mb-6 max-w-2xl opacity-90">
              {currentItem.subtitle}
            </p>
            
            <Link 
              href={currentItem.link}
              className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 sm:px-6 sm:py-3 rounded-lg transition duration-300 group/link"
            >
              View Destinations
              <MoveUpRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 sm:bottom-12 lg:bottom-16 left-1/2 -translate-x-1/2 z-20">
        <ScrollIndicator isVisible={showScrollIndicator} />
      </div>

      {/* Preload Next Background (hidden) */}
      <div 
        className="hidden"
        style={{
          backgroundImage: `url(${nextItem.image})`
        }}
      />
    </section>
  )
}