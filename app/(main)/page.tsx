"use client"

import React from 'react'
import ToursHeroCarousel from '../../components/hero-section'
import EcoTourismFeatures from '../../components/eco-tourism-features'
import { PromoBanner } from '@/components/ui/promoModal'
import HomeSection from '@/components/home/homepage'      


function HomePage() {
  return (
    <div className='bg-gradient-to-b from-orange-50 to-white'>
      <ToursHeroCarousel/>
      <EcoTourismFeatures/>
      <HomeSection/>
      <PromoBanner />
    </div>
  )
}

export default HomePage