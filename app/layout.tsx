import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from 'sonner'
import AuthWrapper from '@/components/auth-wrapper'
import { Analytics } from "@vercel/analytics/react"
import Script from 'next/script'
import { OfflineWrapper } from "@/components/offlineWrapper"
import CookieConsentBanner from '@/components/CookieConsentBanner';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thesolofafrican.com"),
  title: {
    default: 'The Sol of African Tours',
    template: "%s | Tours & Travel",
  },
  description: 'The premier tour agency connecting travelers with magical African destinations',
  keywords: [
    'African Safaris', 'Tours in Africa', 'Kenya Safaris', 'Best African Tour Company', 
    'Big Five Safaris', 'Wildlife Tours', 'Luxury Safaris', 'Adventure Tours Africa', 
    'The Sol of African Tours', 'Africa Travel Packages', 'Kenya Travel Packages'
  ],
  verification: {
    google: 'google-site-verification: googlec1b1726e9f555276.html',
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE'
    }
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sol_of_african',
    creator: '@sol_of_african',
    images: {
      url: 'https://www.thesolofafrican.com/opengraph-image',
      alt: 'The Sol of African Tours',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.thesolofafrican.com',
    siteName: 'The Sol of African Tours',
    title: 'The Sol of African Tours',
    description: 'Tour agency connecting travelers with magical African destinations',
    images: [{
      url: 'https://www.thesolofafrican.com/opengraph-image',
      width: 1200,
      height: 630,
      alt: 'The Sol of African Tours',
    }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <AuthWrapper>
          <OfflineWrapper>
            {children}
            <Toaster />
            <CookieConsentBanner />
          </OfflineWrapper>
        </AuthWrapper>
        <Analytics />
        <Script 
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}