import Image from "next/image"
import { Users, Award, MapPin, Star, Sunset, Mountain, Camera } from "lucide-react"

export default function AboutPageComponent() {
  const experiences = [
    {
      icon: Sunset,
      title: "Safari Adventures",
      description: "Experience the magic of African wildlife in their natural habitat",
    },
    {
      icon: Mountain,
      title: "Cultural Immersion",
      description: "Connect with local communities and ancient traditions",
    },
    {
      icon: Camera,
      title: "Photo Expeditions",
      description: "Capture breathtaking moments in Africa's most scenic locations",
    },
    {
      icon: Star,
      title: "Luxury Stays",
      description: "Rest in comfort at carefully selected premium accommodations",
    },
  ]

  const teamMembers = [
    {
      name: "Michael Kisangi",
      role: "Founder & Lead Guide",
      image: "/images/mike.jpg",
      quote: "Bringing Africa's magic to life through unforgettable journeys.",
    },
    {
      name: "Nelson Pere",
      role: "Driver/Guide",
      image: "/placeholder.svg?height=400&width=300",
      quote: "Creating seamless experiences across the African continent.",
    },
    {
      name: "Jennifer Brubaker",
      role: "Client Relations",
      image: "/images/jeniffer.jpg",
      quote: "Every safari tells a unique story of Africa's wilderness.",
    },
  ]

  return (
    <div className="min-h-screen font-sans bg-orange-50">
      {/* Hero Section */}
      <div className="relative h-[70vh] lg:h-[80vh] overflow-hidden">
        <Image
         src="/images/destinations.jpeg"
          alt="African landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <span className="text-orange-300 text-lg sm:text-xl font-medium mb-4">Discover Our Story</span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6">
              Understand<span className="text-orange-400"> our</span> story
            </h1>
            {/* <p className="text-white text-xl md:text-2xl max-w-2xl">
              Embark on a journey through the heart of Africa with Sol of African
            </p> */}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-orange-600 font-semibold text-lg">Our Journey</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mt-4 mb-6">
              Crafting Unforgettable African Adventures
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              Sol of African is a premier tour and travel company for those who want to experience the best that Africa
              has to offer. We specialize in creating customized trips that allow you to explore and discover the beauty
              of East Africa&apos;s nature, wildlife, and culture. Our tours are tailored to meet your interests and
              preferences, and we work tirelessly to ensure your trip is nothing short of extraordinary. Let us help you
              create lasting memories and fall in love with everything Africa offers.
            </p>
          </div>

          {/* Experience Showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {experiences.map((experience, index) => (
              <div
                key={index}
                className="bg-orange-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-200 rounded-full mb-6">
                  <experience.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{experience.title}</h3>
                <p className="text-gray-700 text-lg">{experience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 sm:py-24 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-orange-600 font-semibold text-lg">Our Team</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mt-4 mb-6">Meet the Explorers</h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
              Our passionate team of experts is dedicated to crafting extraordinary African experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {teamMembers.map((member, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg">
                <div className="aspect-[3/4] relative">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">{member.name}</h3>
                    <p className="text-orange-300 text-lg mb-4">{member.role}</p>
                    <p className="text-sm sm:text-base opacity-100 transition-opacity duration-300 delay-100">
                      &quot;{member.quote}&quot;
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-orange-600 font-semibold text-lg">Why Choose Us</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mt-4 mb-6">
              The Sol of African Difference
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
              Experience Africa like never before with our unparalleled service and expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {[
              {
                icon: MapPin,
                title: "Local Expertise",
                description: "Deep knowledge of Africa's hidden gems and authentic experiences",
              },
              {
                icon: Award,
                title: "Premium Service",
                description: "Luxury accommodations and personalized attention to detail",
              },
              {
                icon: Users,
                title: "Cultural Connection",
                description: "Meaningful interactions with local communities and traditions",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-orange-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-200 rounded-full mb-6">
                  <feature.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-700 text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

