'use client'
import React, { useState, useEffect } from 'react';
import { Facebook, Instagram,   Send, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { z } from 'zod';
import { FaTiktok } from "react-icons/fa";

const emailSchema = z.string().email({ message: "Invalid email address" });

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
      className={`fixed bottom-4 right-4 z-[60] bg-orange-600 hover:bg-orange-700 
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

const AfricanToursFooter = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus('loading');

    try {
      emailSchema.parse(email);
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubscribeStatus('success');
        setEmail('');
        setTimeout(() => setSubscribeStatus('idle'), 3000);
      } else {
        throw new Error(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      setSubscribeStatus('error');
      if (error instanceof z.ZodError) {
        setErrorMessage(error.errors[0].message);
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unexpected error occurred');
      }
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    }
  };

  return (
    <>
      <footer className="bg-gray-900 text-white">
        {/* Main Footer Content */}
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
                  { Icon:  FaTiktok, href: "https://www.tiktok.com/@the_sol_of_african" },
                ].map(({ Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
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
                  'diani,',
                  'watamu,' , 
                  'zanzibar'
                ].map((item) => (
                  <li key={item}>
                    <a
                      href={`/destinations/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-gray-300 hover:text-orange-500 transition-colors duration-200 block py-1"
                    >
                      {item}
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
                  />
                  <Button
                    type="submit"
                    className="absolute right-1 top-1 bg-orange-600 hover:bg-orange-700"
                    disabled={subscribeStatus === 'loading'}
                  >
                    <Send size={16} />
                  </Button>
                </div>
                {subscribeStatus === 'success' && (
                  <p className="text-green-500 text-sm">Successfully subscribed!</p>
                )}
                {subscribeStatus === 'error' && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-800 font-sans">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © {currentYear} Sol of African Tours. All rights reserved.
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
    </>
  );
};

export default AfricanToursFooter;