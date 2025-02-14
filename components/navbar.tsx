"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, ChevronRight } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-900 shadow-lg">
      <nav className="container mx-auto px-4">
        <div className="flex h-24 sm:h-28 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-orange-500">Sol of African Tours</span>
          </Link>
          <div className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-6">
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className="text-white hover:text-orange-500 transition-colors">
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className="text-white hover:text-orange-500 transition-colors">
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white bg-gray-900 hover:text-orange-500 transition-colors">
                    Destinations
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[500px] gap-4 p-4 bg-gray-900 text-white">
                      <div>
                        <h3 className="font-medium text-orange-500 mb-2">Popular Destinations</h3>
                        <ul className="grid grid-cols-2 gap-2">
                          <li>
                            <Link href="/masai-mara" className="flex items-center text-sm hover:text-orange-500">
                              Masai Mara <ChevronRight className="h-4 w-4 ml-auto" />
                            </Link>
                          </li>
                          <li>
                            <Link href="/nairobi-park" className="flex items-center text-sm hover:text-orange-500">
                              Nairobi National Park <ChevronRight className="h-4 w-4 ml-auto" />
                            </Link>
                          </li>
                          <li>
                            <Link href="/amboseli" className="flex items-center text-sm hover:text-orange-500">
                              Amboseli <ChevronRight className="h-4 w-4 ml-auto" />
                            </Link>
                          </li>
                          <li>
                            <Link href="/watamu" className="flex items-center text-sm hover:text-orange-500">
                              Watamu <ChevronRight className="h-4 w-4 ml-auto" />
                            </Link>
                          </li>
                          <li>
                            <Link href="/diani" className="flex items-center text-sm hover:text-orange-500">
                              Diani
                              <ChevronRight className="h-4 w-4 ml-auto" />
                            </Link>
                          </li>
                          <li>
                            <Link href="/samburu" className="flex items-center text-sm hover:text-orange-500">
                              Samburu <ChevronRight className="h-4 w-4 ml-auto" />
                            </Link>
                          </li>
                          <li>
                            <Link href="/serengeti" className="flex items-center text-sm hover:text-orange-500">
                              Serengeti <ChevronRight className="h-4 w-4 ml-auto" />
                            </Link>
                          </li>
                          <li>
                            <Link href="/arusha" className="flex items-center text-sm hover:text-orange-500">
                              Arusha <ChevronRight className="h-4 w-4 ml-auto" />
                            </Link>
                          </li>
                          <li>
                            <Link href="/zanzibar" className="flex items-center text-sm hover:text-orange-500">
                              Zanzibar <ChevronRight className="h-4 w-4 ml-auto" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/packages" legacyBehavior passHref>
                    <NavigationMenuLink className="text-white hover:text-orange-500 transition-colors">
                      Safari Packages
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/gallery" legacyBehavior passHref>
                    <NavigationMenuLink className="text-white hover:text-orange-500 transition-colors">
                      Gallery
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <Button variant="outline" className="bg-orange-600 hover:bg-orange-700 text-white border-none">
                      Enquire Now
                    </Button>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden bg-gray-900 text-white border-orange-500">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <MobileNav onClose={() => setIsOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

const MobileNav = ({ onClose }: { onClose: () => void }) => {
  const [destinationsOpen, setDestinationsOpen] = React.useState(false)

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      <div className="p-4 border-b border-gray-800">
        <span className="text-lg font-bold text-orange-500">Sol of African Tours</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col p-4">
          <Link href="/" className="py-2 text-lg hover:text-orange-500 transition-colors" onClick={onClose}>
            Home
          </Link>
          <Link href="/about" className="py-2 text-lg hover:text-orange-500 transition-colors" onClick={onClose}>
            About
          </Link>
          <button
            onClick={() => setDestinationsOpen(!destinationsOpen)}
            className="py-2 text-lg text-left hover:text-orange-500 transition-colors flex items-center justify-between"
          >
            Destinations
            <ChevronRight className={`h-5 w-5 transition-transform ${destinationsOpen ? "rotate-90" : ""}`} />
          </button>
          {destinationsOpen && (
            <div className="ml-4 space-y-2 mt-2">
              <ul className="space-y-2">
                <li>
                  <Link href="/masai-mara" className="block text-sm hover:text-orange-500" onClick={onClose}>
                    Masai Mara
                  </Link>
                </li>
                <li>
                  <Link href="/nairobi-park" className="block text-sm hover:text-orange-500" onClick={onClose}>
                    Nairobi National Park
                  </Link>
                </li>
                <li>
                  <Link href="/amboseli" className="block text-sm hover:text-orange-500" onClick={onClose}>
                    Amboseli
                  </Link>
                </li>
                <li>
                  <Link href="/samburu" className="block text-sm hover:text-orange-500" onClick={onClose}>
                    Samburu
                  </Link>
                </li>
                <li>
                  <Link href="/watamu" className="block text-sm hover:text-orange-500" onClick={onClose}>
                    Watamu
                  </Link>
                </li>
                <li>
                  <Link href="/diani" className="block text-sm hover:text-orange-500" onClick={onClose}>
                    Diani
                  </Link>
                </li>
                <li>
                  <Link href="/serengeti" className="block text-sm hover:text-orange-500" onClick={onClose}>
                    Serengeti
                  </Link>
                </li>
                <li>
                  <Link href="/arusha" className="block text-sm hover:text-orange-500" onClick={onClose}>
                    Arusha
                  </Link>
                </li>
                <li>
                  <Link href="/zanzibar" className="block text-sm hover:text-orange-500" onClick={onClose}>
                    Zanzibar
                  </Link>
                </li>
              </ul>
            </div>
          )}
          <Link href="/packages" className="py-2 text-lg hover:text-orange-500 transition-colors" onClick={onClose}>
            Safari Packages
          </Link>
          <Link href="/gallery" className="py-2 text-lg hover:text-orange-500 transition-colors" onClick={onClose}>
            Gallery
          </Link>
          <Link href="/contact" className="py-2 text-lg hover:text-orange-500 transition-colors" onClick={onClose}>
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar

