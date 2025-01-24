import { Metadata } from 'next';
import AboutPageComponent from '@/components/about/AboutPage';

export const metadata: Metadata = {
  title: "About Us | Sol Of African",
  description: "Discover Sol Of African's mission to provide extraordinary African travel experiences. Learn about our passion for exploration and commitment to sustainable tourism.",
  keywords: [
    "African travel company",
    "travel agency mission", 
    "sustainable tourism",
    "African adventure experts",
    "travel experience creators"
  ],
  openGraph: {
    title: "About Sol Of African",
    description: "Our story, our passion, our commitment to unforgettable African journeys.",
    type: "website",
    images: ["/images/hero_packages.jpg"]
  }
};

export default AboutPageComponent;