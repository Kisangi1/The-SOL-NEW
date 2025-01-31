import { motion } from 'framer-motion';
import Image from 'next/image';

export default function DestinationPage() {
  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        <Image
          src="/images/destination.jpg"
          alt="Destination Image"
          layout="fill"
          objectFit="cover"
          className="opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-gray-900/90 flex flex-col justify-center items-center">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }}
            className="text-5xl font-bold tracking-wide text-center"
          >
            Explore the Beauty of Africa
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.2, delay: 0.3 }}
            className="mt-4 text-lg text-gray-300"
          >
            Unforgettable adventures await you.
          </motion.p>
        </div>
      </div>

      {/* Destinations Section */}
      <section className="py-16 px-6 md:px-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
          className="text-4xl font-semibold text-center"
        >
          Top Destinations
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div 
              key={item} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-800 p-5 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <Image
                src={`/images/destination-${item}.jpg`}
                alt={`Destination ${item}`}
                width={400}
                height={250}
                className="rounded-lg object-cover"
              />
              <h3 className="mt-4 text-xl font-semibold">Beautiful Destination {item}</h3>
              <p className="text-gray-400 mt-2">Discover stunning landscapes and incredible wildlife.</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
