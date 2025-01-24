import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const domain = 'https://www.thesolofafrican.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/tours',
          '/destinations',
          '/about',
          '/contact',
          '/blogs',
          '/gallery',
        ],
        disallow: [
          '/management-portal/*',
          '/sign-in',
          '/sign-up',
          '/api/*',
          '/user/*',
          '/profile',
          '/draft/*',
          '/preview/*'
        ],
      },
    ],
    sitemap: `${domain}/sitemap.xml`,
    host: domain,
  }
}