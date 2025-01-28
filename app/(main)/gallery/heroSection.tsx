'use client'
import Image from 'next/image'


export default function HeroSection() {
  return (
    <>
      <div className="relative z-10 overflow-hidden bg-black text-white">
        <div className="h-40 md:h-60 lg:h-80">
          <Image
             src="/images/destinations.jpeg"
            alt="Hero image"
            width={1920}
            height={1080}
            className="z-1 absolute left-0 top-0 h-full w-full object-cover"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg text-center px-4">
              Our Gallery
            </h1>
          </div>
        </div>
        <div
          className="relative z-20 h-32 w-full -scale-y-[1] bg-contain bg-repeat-x"
          style={{
            backgroundImage: "url('/images/banner_style.png')",
            filter:
              "invert(92%) sepia(2%) saturate(1017%) hue-rotate(342deg) brightness(106%) contrast(93%)",
          }}
        />
      </div>
    </>
  )
}

