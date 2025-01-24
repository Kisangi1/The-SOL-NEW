// app/sitemap.ts
import { MetadataRoute } from 'next'

interface Blog {
  id: string
  slug: string
  updatedAt: string
}

interface Package {
  id: string
  slug: string
  updatedAt: string
}

async function fetchBlogs() {
  try {
    const res = await fetch(`${process.env.API_URL}/api/blogs`, { 
      next: { revalidate: 0 } 
    })
    return res.json()
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return []
  }
}

async function fetchPackages() {
  try {
    const res = await fetch(`${process.env.API_URL}/api/packages`, { 
      next: { revalidate: 0 } 
    })
    return res.json()
  } catch (error) {
    console.error('Error fetching packages:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.thesolofafrican.com'

  // Fetch dynamic data
  const [blogs, packages] = await Promise.all([
    fetchBlogs(),
    fetchPackages(),
  ])

  // Create static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/destinations/amboseli`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/destinations/kenyan-coast`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/destinations/arusha`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/destinations/samburu`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/destinations/samburu`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/destinations/serengeti`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/destinations/zanzibar`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/destinations/nairobi-park`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/destinations/masaai-mara`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/packages`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/terms-and-condition`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  // Create blog routes
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog: Blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(blog.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // Create package routes
  const packageRoutes: MetadataRoute.Sitemap = packages.map((pkg: Package) => ({
    url: `${baseUrl}/packages/${pkg.slug}`,
    lastModified: new Date(pkg.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...blogRoutes, ...packageRoutes]
}