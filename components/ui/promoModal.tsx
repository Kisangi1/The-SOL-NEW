'use client'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { isHoliday } from "@/utils/holidayChecker";
import { Plane, X } from 'lucide-react';

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [holiday, setHoliday] = useState<{ name: string; date: Date } | null>(null);

  useEffect(() => {
    // Check for holiday and local storage
    const hasShownBanner = localStorage.getItem('hasShownPromoBanner');
    const currentHoliday = isHoliday();

    if (!hasShownBanner && currentHoliday) {
      setHoliday(currentHoliday);
      setIsVisible(true);
      localStorage.setItem('hasShownPromoBanner', 'true');
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed z-50 bg-green-50 shadow-lg overflow-hidden sm:bottom-4 sm:left-4 sm:max-w-[300px] sm:rounded-lg bottom-0 left-0 w-full rounded-t-lg">
      <div className="relative p-4">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center space-y-3">
          <Plane className="w-10 h-10 text-green-600" />
          
          <h3 className="text-lg font-bold text-center">
            {holiday ? `${holiday.name} Special Offer!` : "Special Travel Offer!"}
          </h3>
          
          <p className="text-sm text-gray-600 text-center">
            Get up to 20% off on selected tour packages and destinations!
          </p>
          
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            onClick={() => {
              setIsVisible(false);
              window.location.href = '/packages';
            }}
          >
            Explore Deals
          </Button>
        </div>
      </div>
    </div>
  );
}