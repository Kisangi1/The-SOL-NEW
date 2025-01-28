'use client'
import React, { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaTiktok } from "react-icons/fa";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
} from "lucide-react";
import { toast } from "sonner";
import Image from 'next/image';

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

interface ApiResponse {
  error?: string;
  message?: string;
}

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setFormState({
      fullName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = (await response.json()) as ApiResponse;

      if (response.ok) {
        toast.success(data.message || "Message sent successfully!");
        resetForm();
      } else {
        throw new Error(data.error || "Failed to send message");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send message"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/solofafricantours",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/solofafricantours",
      label: "Instagram",
    },
    {
      icon: FaTiktok,
      href: "https://www.tiktok.com/@the_sol_of_african",
      label: "TikTok",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Enhanced Banner Section */}
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] w-full overflow-hidden">
        <Image
           src="/images/destinations.jpeg"
          alt="African landscape"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent">
          <div className="container mx-auto h-full px-4">
            <div className="flex flex-col justify-center h-full max-w-4xl">
              <span className="text-orange-300 text-sm md:text-base lg:text-lg font-medium mb-4">
                Your Gateway to African Adventures
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Chat <span className="text-orange-400"> with</span> us
              </h1>
             
            </div>
          </div>
        </div>
      </div>

      {/* Contact Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center mb-4 md:mb-6">
            <span className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wide text-orange-800 bg-orange-100 px-4 py-2 rounded-full">
              Ready to Experience Africa?
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
            Begin Your <span className="text-orange-600">African</span> Journey
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8 p-6 md:p-8 lg:p-12 bg-white rounded-2xl shadow-lg">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-900 mb-6">
                Get In Touch
              </h2>
              <p className="text-orange-700 mb-8 text-base md:text-lg">
                Let us help you discover the soul of Africa. From serene safaris to
                cultural encounters, we&apos;re here to craft your perfect African adventure.
              </p>
            </div>

            <div className="space-y-6 font-sans">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  content: "the.sol.of.african@gmail.com",
                },
                {
                  icon: Phone,
                  title: "Phone",
                  content: "+254768453819",
                },
                {
                  icon: MapPin,
                  title: "Location",
                  content: "Nairobi, Kenya",
                },
                {
                  icon: Clock,
                  title: "Hours",
                  content: "Mon - Sun: 9AM - 6PM",
                },
              ].map(({ icon: Icon, title, content }, index) => (
                <div key={index} className="flex items-center space-x-4 group hover:bg-orange-50 p-4 rounded-lg transition-colors">
                  <div className="p-3 bg-orange-200 rounded-full group-hover:bg-orange-300 transition-colors">
                    <Icon className="w-6 h-6 text-orange-700" />
                  </div>
                  <div>
                    <p className="text-sm text-orange-600">{title}</p>
                    <p className="text-lg font-semibold text-orange-900">
                      {content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-orange-200">
              <h4 className="text-base font-semibold text-orange-900 mb-4">
                Follow Our Journey
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map(({ icon: Icon, href, label }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-orange-200 rounded-full hover:bg-orange-300 transition-colors group"
                    aria-label={`${label} link`}
                  >
                    <Icon className="w-6 h-6 text-orange-700 group-hover:text-orange-900 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-lg font-sans">
            <h4 className="text-2xl md:text-3xl font-bold text-orange-900 mb-8 text-center">
              Plan Your African Adventure
            </h4>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="fullName"
                    className="block mb-2 text-sm font-semibold"
                  >
                    Full Name
                    <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    className="w-full"
                    placeholder="John Doe"
                    value={formState.fullName}
                    onChange={(e) =>
                      setFormState({ ...formState, fullName: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label
                    htmlFor="email"
                    className="block mb-2 text-sm font-semibold"
                  >
                    Email
                    <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="w-full"
                    placeholder="johndoe@example.com"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-semibold"
                >
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  className="w-full"
                  placeholder="+2547000000"
                  value={formState.phone}
                  onChange={(e) =>
                    setFormState({ ...formState, phone: e.target.value })
                  }
                />
              </div>

              <div>
                <Label
                  htmlFor="message"
                  className="block mb-2 text-sm font-semibold"
                >
                  Message
                  <span className="text-red-600">*</span>
                </Label>
                <Textarea
                  id="message"
                  className="w-full h-32 resize-y min-h-[8rem]"
                  placeholder="Tell us about your dream African adventure..."
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full py-3 bg-orange-700 hover:bg-orange-800 text-white text-base transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Start Your Journey"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}