import React from 'react'
import ToursHeroCarousel from '../components/hero-section'
import EcoTourismFeatures from '../components/eco-tourism-features'
import DestinationGrid from '../components/destination-grid'
import TravelCTASection from '../components/Travel-cta-section'
import KenyaParksScroll from '../components/ticker' 

function page() {
  return (
    <div className='bg-green-50'>
      <ToursHeroCarousel/>
      <KenyaParksScroll/>
      <EcoTourismFeatures/>
      <DestinationGrid/>
      <TravelCTASection/>

    </div>
  )
}

export default page