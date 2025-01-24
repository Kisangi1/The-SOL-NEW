import { Metadata } from 'next';
import BlogDetailPage from '@/components/blogs/BlogsPageComponent';

// Dynamically generate metadata for each blog post
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs/${params.id}`);
    
    if (!response.ok) {
      return {
        title: "Blog Post | Sol Of African",
        description: "Discover inspiring travel stories from Sol Of African"
      };
    }

    const blog = await response.json();

    return {
      title: `${blog.title} | Sol Of African`,
      description: blog.excerpt || blog.content.substring(0, 160),
      keywords: [
        "African travel story",
        "travel blog",
        "safari experience",
        blog.category || "African adventure"
      ],
      openGraph: {
        title: blog.title,
        description: blog.excerpt || blog.content.substring(0, 160),
        type: "article",
        images: [blog.imageData || "/images/hero_packages.jpg"]
      }
    };
  } catch {
    return {
      title: "Blog Post | Sol Of African",
      description: "Discover inspiring travel stories from Sol Of African"
    };
  }
}

export default BlogDetailPage;