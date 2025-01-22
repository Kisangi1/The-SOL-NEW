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
  const [direction, setDirection] = useState(0)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
    }, 5000) // Change slide every 5 seconds

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

  const backgroundVariants = {
    initial: (direction: number) => ({
      opacity: 0,
      scale: direction > 0 ? 1.1 : 0.9,
      transition: { duration: 0 }
    }),
    animate: {
      opacity: 1,
      scale: 1.1,
      transition: {
        duration: 5,
        ease: 'easeInOut'
      }
    },
    exit: (direction: number) => ({
      opacity: 0,
      scale: direction > 0 ? 1.2 : 1,
      transition: {
        duration: 1.5,
        ease: 'easeInOut'
      }
    })
  }

  const currentItem = carouselItems[currentSlide]
  const nextItem = carouselItems[(currentSlide + 1) % carouselItems.length]

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gray-900">
      <div className="absolute inset-0">
        {/* Previous/Current Background */}
        <motion.div
          key={`bg-${currentSlide}`}
          custom={direction}
          variants={backgroundVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${currentItem.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* Preload Next Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-0"
          style={{
            backgroundImage: `url(${nextItem.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </div>
      
     
    
      
      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ 
            type: 'tween',
            duration: 0.8
          }}
          className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-start text-white"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            {currentItem.title}
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-2xl opacity-90">
            {currentItem.subtitle}
          </p>
          
          <div>
            <Link 
              href={currentItem.link}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg flex items-center transition duration-300 group/link"
            >
              View Destinations
              <MoveUpRight className="ml-2 h-5 w-5 transition group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Scroll Indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20">
        <ScrollIndicator isVisible={showScrollIndicator} />
      </div>
    </section>
  )
}

