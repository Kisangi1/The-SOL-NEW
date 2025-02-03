'use client';

import { useState } from "react";
import { Shield, BookOpen, } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export const TermsPrivacyTabs = () => {
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
    <>
      <div className="grid grid-cols-2 gap-4 mb-8 font-sans">
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

      <Card className="bg-white shadow-lg rounded-xl overflow-hidden">
        <ScrollArea className="h-[60vh] p-6 md:p-8">
          {activeTab === "terms" && <TermsContent />}
          {activeTab === "privacy" && <PrivacyContent />}
        </ScrollArea>
      </Card>

      <div className="text-center mt-8 space-y-2">
        <p className="text-sm text-gray-500">
          Last updated: January 24, 2025
        </p>
        <p className="text-sm text-gray-500">
          Questions? <a href="/contact" className="text-orange-600 hover:text-orange-700">
            Contact Us
          </a>
        </p>
      </div>
    </>
  );
};

const TermsContent = () => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold text-gray-900">Terms & Conditions</h2>

    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
          <span className="text-orange-600 font-semibold">1</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Definitions</h3>
      </div>
      <p className="text-gray-600 leading-relaxed pl-11">
        &quot;Sol Of African&quot; refers to our travel service. &quot;Customer&quot; means any individual using our services.
        &quot;Tour&quot; includes all travel arrangements made through our platform.
      </p>
    </section>

    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
          <span className="text-orange-600 font-semibold">2</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Booking Process</h3>
      </div>
      <ul className="text-gray-600 leading-relaxed pl-11 space-y-2 list-disc">
        <li>Bookings confirmed upon full payment receipt</li>
        <li>Prices subject to change until full payment</li>
        <li>30% non-refundable deposit required</li>
      </ul>
    </section>

    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
          <span className="text-orange-600 font-semibold">3</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Cancellation Policy</h3>
      </div>
      <div className="text-gray-600 leading-relaxed pl-11">
        <p>Cancellation fees:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>More than 90 days before departure: 30% of total cost</li>
          <li>60-89 days before departure: 50% of total cost</li>
          <li>Less than 60 days before departure: 100% of total cost</li>
        </ul>
      </div>
    </section>

    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
          <span className="text-orange-600 font-semibold">4</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Liability Disclaimer</h3>
      </div>
      <p className="text-gray-600 leading-relaxed pl-11">
        Sol Of African is not liable for personal injury, property loss, 
        travel delays, or circumstances beyond our control.
      </p>
    </section>

    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
          <span className="text-orange-600 font-semibold">5</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Amendments</h3>
      </div>
      <p className="text-gray-600 leading-relaxed pl-11">
        Terms may be updated without prior notice. Continued use of services 
        implies acceptance of current terms.
      </p>
    </section>
  </div>
);

const PrivacyContent = () => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold text-gray-900">Privacy Policy</h2>

    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
          <span className="text-orange-600 font-semibold">1</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Information Collection</h3>
      </div>
      <div className="text-gray-600 leading-relaxed pl-11">
        <p>We collect:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Name and contact information</li>
          <li>Passport details</li>
          <li>Travel preferences</li>
          <li>Payment information</li>
        </ul>
      </div>
    </section>

    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
          <span className="text-orange-600 font-semibold">2</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Data Usage</h3>
      </div>
      <div className="text-gray-600 leading-relaxed pl-11">
        <p>We use your data to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Process bookings</li>
          <li>Provide customer support</li>
          <li>Send travel updates</li>
          <li>Improve our services</li>
        </ul>
      </div>
    </section>

    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
          <span className="text-orange-600 font-semibold">3</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Data Protection</h3>
      </div>
      <p className="text-gray-600 leading-relaxed pl-11">
        We implement industry-standard security measures to protect 
        your personal information from unauthorized access.
      </p>
    </section>

    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
          <span className="text-orange-600 font-semibold">4</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Data Sharing</h3>
      </div>
      <p className="text-gray-600 leading-relaxed pl-11">
        We do not sell personal data. Information may be shared with 
        tour operators only to facilitate your travel arrangements.
      </p>
    </section>

    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
          <span className="text-orange-600 font-semibold">5</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Your Rights</h3>
      </div>
      <div className="text-gray-600 leading-relaxed pl-11">
        <p>You have the right to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Access your personal data</li>
          <li>Request data deletion</li>
          <li>Opt-out of marketing communications</li>
        </ul>
      </div>
    </section>
  </div>
);