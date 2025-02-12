'use client'

import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Send, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { z } from 'zod';
import { FaTiktok } from "react-icons/fa";
import { toast } from 'sonner';

const emailSchema = z.string().email({ message: "Invalid email address" });

// TawkTo Widget Component
interface TawkToAPI {
  onLoad?: () => void;
  visitor?: {
    name?: string;
    email?: string;
    hash?: string;
  };
}

declare global {
  interface Window {
    Tawk_API?: TawkToAPI;
    Tawk_LoadStart?: Date;
  }
}

const TawkToWidget = () => {
  useEffect(() => {
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/66bbc28d146b7af4a439fee4/1i56mvvcd';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    document.body.appendChild(script);

    return () => {
      const tawkScript = document.querySelector(`script[src="${script.src}"]`);
      if (tawkScript && tawkScript.parentNode) {
        tawkScript.parentNode.removeChild(tawkScript);
      }
    };
  }, []);

  return null;
};

// ScrollToTop Component
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight;
      const scrollThreshold = totalHeight - viewportHeight * 1.25;
      setIsVisible(scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-4 left-4 z-[60] bg-orange-600 hover:bg-orange-700 
        text-white rounded-full cursor-pointer transition-all duration-300 ease-in-out
        w-12 h-12 flex items-center justify-center shadow-lg
        hover:shadow-xl transform hover:-translate-y-1
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
      `}
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
};

// Main Footer Component
const AfricanToursFooter = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      emailSchema.parse(email);

      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Thank you for subscribing to our newsletter!", {
          description: "You'll receive updates about new tours and exclusive offers.",
        });
        setEmail('');
      } else if (response.status === 409) {
        toast.info("Already subscribed!", {
          description: data.error || "This email is already registered for our newsletter.",
        });
      } else {
        throw new Error(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      let errorMessage = 'An unexpected error occurred';
      
      if (error instanceof z.ZodError) {
        errorMessage = error.errors[0].message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error("Subscription failed", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <footer className="bg-gray-900 text-white relative">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-orange-500">Sol of African Tours</h3>
              <p className="text-gray-300 text-sm">
                Discover the heart of Africa through authentic experiences, cultural immersion, 
                and unforgettable adventures across the continent.
              </p>
              <div className="flex space-x-4">
                {[
                  { Icon: Facebook, href: "https://www.facebook.com/share/xJYd3ocdUWag4jsW/?mibextid=LQQJ4d" },
                  { Icon: Instagram, href: "https://www.instagram.com/sol_of_african" },
                  { Icon: FaTiktok, href: "https://www.tiktok.com/@the_sol_of_african" },
                ].map(({ Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-gray-800 rounded-full transition-colors duration-200"
                    aria-label={`Social media link ${index + 1}`}
                  >
                    <Icon size={20} className="text-orange-500" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-orange-500">Quick Links</h4>
              <ul className="space-y-2">
                {['About', 'Packages', 'Destinations', 'Blogs'].map((item) => (
                  <li key={item}>
                    <a
                      href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-gray-300 hover:text-orange-500 transition-colors duration-200 block py-1"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Destinations */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-orange-500">Popular Destinations</h4>
              <ul className="space-y-2">
                {[
                  'masai-mara',
                  'serengeti',
                  'samburu',
                  'diani',
                  'watamu', 
                  'zanzibar'
                ].map((item) => (
                  <li key={item}>
                    <a
                      href={`/${item}`}
                      className="text-gray-300 hover:text-orange-500 transition-colors duration-200 block py-1"
                    >
                      {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-orange-500">Newsletter</h4>
              <p className="text-gray-300 text-sm mb-4">
                Subscribe to receive updates about new tours, travel tips, and exclusive offers.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white 
                      placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    className="absolute right-1 top-1 bg-orange-600 hover:bg-orange-700"
                    disabled={isLoading}
                  >
                    <Send size={16} className={isLoading ? 'animate-pulse' : ''} />
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © {currentYear} Sol Of African Tours. All rights reserved.
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <a href="/terms-and-condition" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="/terms-and-condition" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                  Terms & Conditions
                </a>
                <a href="/contact-us" className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <ScrollToTopButton />
      <TawkToWidget />
    </>
  );
};

export default AfricanToursFooter;