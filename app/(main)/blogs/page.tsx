import { Metadata } from 'next';
import BlogPage from '@/components/blogs/BlogsPageComponent';

export const metadata: Metadata = {
  title: "Travel Blogs | Sol Of African",
  description: "Dive into inspiring travel stories, expert tips, and personal experiences that capture the magic of African adventures. Get inspired for your next journey.",
  keywords: [
    "African travel stories",
    "travel blog",
    "safari experiences",
    "travel inspiration",
    "African adventure blog"
  ],
  openGraph: {
    title: "Sol Of African Travel Stories",
    description: "Explore captivating narratives from our travelers across Africa.",
    type: "website",
    images: ["/images/hero_packages.jpg"]
  }
};

export default BlogPage;