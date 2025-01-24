import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl w-full space-y-8 z-10 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex justify-center">
            <Image
              src="/images/notfound.svg"
              alt="SOL - Page Not Found"
              width={500}
              height={500}
              className="w-full max-w-[450px] h-auto object-contain"
              priority
            />
          </div>
          <div className="w-full lg:w-1/2 text-center lg:text-left lg:pl-12">
            <div className="font-sans inline-block py-2 px-4 mb-6 text-sm bg-amber-600 text-white font-medium rounded-full">
              404 Error
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Page Not Found
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-md mx-auto lg:mx-0">
              Oops! The page you&apos;re looking for seems to have wandered off. Let&apos;s get you back on track.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Link 
                href="/" 
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-amber-600 hover:bg-amber-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                Return to Home
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230066CC' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-50 z-0"></div>
    </div>
  )
}