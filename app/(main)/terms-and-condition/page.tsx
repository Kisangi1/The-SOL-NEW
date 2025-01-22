'use client';

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Shield, BookOpen, ChevronRight } from "lucide-react";

export default function TermsAndPrivacyPage() {
  const [activeTab, setActiveTab] = useState("terms");

  const tabs = [
    { 
      id: "terms", 
      label: "Terms & Conditions",
      icon: BookOpen
    },
    { 
      id: "privacy", 
      label: "Privacy Policy",
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <Image
          src="/images/hero_packages.jpg"
          alt="Legal Information"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent">
          <div className="container mx-auto h-full px-4">
            <div className="flex flex-col justify-center h-full max-w-4xl">
              <span className="text-orange-300 text-sm md:text-base lg:text-lg font-medium mb-4">
                Legal Information
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                Terms & Privacy
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-2xl">
                Our commitment to transparency and your privacy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Enhanced Tab Navigation */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant="outline"
                  className={cn(
                    "h-auto p-6 flex flex-col items-center gap-3 transition-all duration-200",
                    activeTab === tab.id
                      ? "bg-orange-50 border-orange-200 text-orange-900"
                      : "hover:bg-orange-50 hover:border-orange-200"
                  )}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon className={cn(
                    "h-6 w-6",
                    activeTab === tab.id ? "text-orange-600" : "text-gray-400"
                  )} />
                  <span className="font-semibold">{tab.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Content Card */}
          <Card className="bg-white shadow-lg rounded-xl overflow-hidden">
            <ScrollArea className="h-[60vh] p-6 md:p-8">
              {activeTab === "terms" && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-gray-900">Terms & Conditions</h2>

                  <section className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <span className="text-orange-600 font-semibold">1</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Booking Terms</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed pl-11">
                      By making a booking through our website, you agree to provide accurate and complete information. 
                      A booking is considered confirmed once you receive a confirmation email from us.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <span className="text-orange-600 font-semibold">2</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Your Responsibilities</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed pl-11">
                      You are responsible for ensuring all information provided during the booking process is accurate 
                      and complete. This includes but is not limited to full names, contact details, and any special requirements.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <span className="text-orange-600 font-semibold">3</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Cancellation Policy</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed pl-11">
                      Tour bookings can be modified or cancelled according to our cancellation policy. 
                      Please contact us directly for any changes to your booking. Cancellation terms may vary 
                      depending on the specific tour and timing of cancellation.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <span className="text-orange-600 font-semibold">4</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Disclaimer</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed pl-11">
                      While we strive to ensure all tour information is accurate, we reserve the right to modify 
                      tour itineraries and details when necessary. We are not liable for circumstances beyond 
                      our control that may impact tours.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <span className="text-orange-600 font-semibold">5</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Updates to Terms</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed pl-11">
                      We may update these terms of service at any time. Continued use of our booking service 
                      following any changes constitutes acceptance of the new terms.
                    </p>
                  </section>
                </div>
              )}

              {activeTab === "privacy" && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-gray-900">Privacy Policy</h2>

                  <section className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <span className="text-orange-600 font-semibold">1</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Information We Collect</h3>
                    </div>
                    <div className="pl-11 space-y-3">
                      <p className="text-gray-600 leading-relaxed">When you make a booking, we collect:</p>
                      <ul className="space-y-2 text-gray-600">
                        {["Full name", "Email address", "Phone number", "Special requirements"].map((item, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-orange-600" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <span className="text-orange-600 font-semibold">2</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">How We Use Your Information</h3>
                    </div>
                    <div className="pl-11 space-y-3">
                      <p className="text-gray-600 leading-relaxed">We use your information to:</p>
                      <ul className="space-y-2 text-gray-600">
                        {[
                          "Process and confirm your tour bookings",
                          "Contact you about your booking",
                          "Provide customer support",
                          "Send important updates about your tour"
                        ].map((item, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-orange-600" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <span className="text-orange-600 font-semibold">3</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Information Protection</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed pl-11">
                      We implement appropriate security measures to protect your personal information. 
                      Your booking data is only accessed by authorized personnel who need it to process 
                      your tour arrangements.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <span className="text-orange-600 font-semibold">4</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Information Sharing</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed pl-11">
                      We only share your information as necessary to fulfill your tour booking. This may include 
                      sharing relevant details with our tour operators and guides. We do not sell or share your 
                      personal information with third parties for marketing purposes.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <span className="text-orange-600 font-semibold">5</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Data Retention</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed pl-11">
                      We retain your booking information for as long as necessary to provide our services and 
                      comply with legal obligations. You may request to review, update, or delete your personal 
                      information at any time.
                    </p>
                  </section>
                </div>
              )}
            </ScrollArea>
          </Card>

          {/* Footer Note */}
          <div className="text-center mt-8 space-y-2">
            <p className="text-sm text-gray-500">
              Last updated: November 01, 2025
            </p>
            <p className="text-sm text-gray-500">
              If you have any questions about our terms or privacy policy, please{" "}
              <a href="/contact" className="text-orange-600 hover:text-orange-700">
                contact us
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}