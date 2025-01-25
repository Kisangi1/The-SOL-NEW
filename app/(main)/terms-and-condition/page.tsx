import Image from "next/image";
import { Metadata } from "next";
import { TermsPrivacyTabs } from "@/components/terms/TermsPrivacyTabs";

export const metadata: Metadata = {
  title: "Terms & Privacy | Sol Of African",
  description: "Comprehensive terms of service and privacy policy for Sol Of African travel experiences.",
  keywords: [
    "travel agency terms",
    "privacy policy",
    "booking conditions",
    "data protection",
    "travel service agreement"
  ],
  openGraph: {
    title: "Sol Of African: Terms & Privacy",
    description: "Transparent policies for your travel experience",
    type: "website",
    images: ["/images/hero_packages.jpg"]
  }
};

export default function TermsAndPrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="relative h-[40vh] w-full overflow-hidden">
        <Image
           src="/images/destinations.jpeg"
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
              Terms <span className="text-orange-400"> &</span> Privacy
              </h1>
             
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <TermsPrivacyTabs />
        </div>
      </div>
    </div>
  );
}