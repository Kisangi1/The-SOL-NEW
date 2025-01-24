import { ImageResponse } from 'next/og'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const runtime = 'edge'
export const alt = 'The Sol of African Tours'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: 'white',
          fontFamily: roboto.style.fontFamily,
        }}
      >
        {/* Left content section */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '50%',
            padding: '40px',
            gap: '20px',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 700,
              lineHeight: 1.1,
              margin: 0,
              color: '#000',
            }}
          >
            The Sol of African Tours
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: '#666',
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Discover the heart of Africa through extraordinary journeys
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '20px',
            }}
          >
            {/* Small circular avatar/logo */}
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundImage: 'url(https://utfs.io/f/your-logo-url-here)',
                backgroundSize: 'cover',
              }}
            />
            <span
              style={{
                fontSize: '24px',
                color: '#666',
              }}
            >
              www.thesolofafrican.com
            </span>
          </div>
        </div>
        
        {/* Right image section */}
        <div
          style={{
            width: '50%',
            height: '100%',
            backgroundImage: 'url(https://utfs.io/f/your-background-image-url-here)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}