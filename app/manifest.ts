import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'The Sol of African Tours: Authentic African Experiences',
        short_name: 'Sol African Tours',
        description: 'Embark on transformative journeys through Africa with The Sol of African Tours. Discover unique destinations, cultural experiences, and unforgettable adventures across the continent.',
        start_url: '/',
        display: 'standalone',
        background_color: '#FFF9E6',
        theme_color: '#8B4513',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}