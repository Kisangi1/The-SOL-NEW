"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Package } from "lucide-react"
import { getUpcomingHoliday, type Holiday } from "@/utils/holidayChecker"
import { getHolidayImage } from "@/utils/holidayImage"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export function PromoBanner() {
  const [isOpen, setIsOpen] = useState(false)
  const [holidayInfo, setHolidayInfo] = useState<{ holiday: Holiday; daysUntil: number } | null>(null)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const checkHoliday = () => {
      const upcomingHoliday = getUpcomingHoliday()
      if (upcomingHoliday) {
        setHolidayInfo(upcomingHoliday)
        const lastShown = localStorage.getItem("lastPromoShown")
        const now = new Date().getTime()
        if (!lastShown || now - Number.parseInt(lastShown) > 24 * 60 * 60 * 1000) {
          setIsOpen(true)
          localStorage.setItem("lastPromoShown", now.toString())
        }
      }
    }

    checkHoliday()
    const intervalId = setInterval(checkHoliday, 1000 * 60 * 60)

    return () => clearInterval(intervalId)
  }, [])

  if (!holidayInfo) return null

  const { holiday, daysUntil } = holidayInfo

  const getPromoMessage = () => {
    if (daysUntil === 0) {
      return `${holiday.name} is here! Celebrate with our special offers!`
    } else {
      return `${holiday.name} is coming in ${daysUntil} day${daysUntil > 1 ? "s" : ""}!`
    }
  }

  const getDiscountPercentage = () => {
    return daysUntil === 0 ? 30 : daysUntil === 1 ? 25 : 20
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] p-6 overflow-hidden">
        <div className="flex flex-col">
          <DialogHeader className="flex flex-row items-center space-x-4 pb-4">
            <div className="relative h-24 w-24 flex-shrink-0">
              {!imageError ? (
                <Image
                  src={getHolidayImage(holiday.name) || "/images/gift.svg"}
                  alt={holiday.name}
                  fill
                  className="object-contain"
                  onError={() => setImageError(true)}
                  sizes="96px"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-amber-100 rounded-full">
                  <Package className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold">{holiday.name} Special!</DialogTitle>
              <DialogDescription>
                <p className="text-lg font-semibold text-amber-600 mt-2">{getPromoMessage()}</p>
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-2xl font-bold text-amber-600">Save up to {getDiscountPercentage()}%</p>
              <p className="text-amber-600 ">Limited time offer!</p>
            </div>

            <div className="space-y-2">
              <p className="text-gray-600 font-medium">Book now and enjoy:</p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-2" />
                  Exclusive holiday packages
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-2" />
                  Special event access
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-2" />
                  Flexible booking options
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={() => (window.location.href = "/packages")}
                className="flex-1 bg-amber-600 hover:bg-amber-700"
              >
                Book Now
              </Button>
              <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1 border-amber-600">
                Maybe Later
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

