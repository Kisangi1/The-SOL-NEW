import { Metadata } from 'next';
import ContactPage from '@/components/contact/ContactPageComponent';

export const metadata: Metadata = {
  title: "Contact Us | Sol Of African",
  description: "Get in touch with Sol Of African. Let our experts help you plan your perfect African adventure. Reach out for personalized travel guidance and unforgettable experiences.",
  keywords: [
    "African travel contact",
    "travel agency consultation",
    "safari booking",
    "African trip planning",
    "travel experience inquiry"
  ],
  openGraph: {
    title: "Contact Sol Of African",
    description: "Connect with us to start your African journey today.",
    type: "website",
    images: ["/images/hero_packages.jpg"]
  }
};

export default ContactPage;