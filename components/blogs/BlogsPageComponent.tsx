'use client';

import { useState, useEffect } from "react";
import { ChevronDown} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/types/blogs";

// Skeleton Loading Component
const BlogCardSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
    <div className="h-64 bg-orange-100"></div>
    <div className="p-6">
      <div className="h-4 bg-orange-100 w-1/3 rounded mb-4"></div>
      <div className="h-8 bg-orange-100 w-3/4 rounded mb-3"></div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-orange-50 w-full rounded"></div>
        <div className="h-4 bg-orange-50 w-5/6 rounded"></div>
      </div>
      <div className="flex items-center mt-6">
        <div className="w-10 h-10 rounded-full bg-orange-100"></div>
        <div className="ml-3">
          <div className="h-4 bg-orange-100 w-24 rounded"></div>
          <div className="h-3 bg-orange-50 w-32 rounded mt-2"></div>
        </div>
      </div>
    </div>
  </div>
);

// Blog Card Component
const BlogCard = ({ blog }: { blog: BlogPost }) => (
  <article className="bg-white rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-all duration-300">
    {blog.imageData && (
      <div className="relative h-64">
        <Image
          src={blog.imageData}
          alt={blog.title}
          fill
          className="object-cover"
        />
        {blog.category && (
          <span className="absolute top-4 left-4 bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full">
            {blog.category}
          </span>
        )}
      </div>
    )}
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
        {blog.title}
      </h2>
      <p className="text-gray-600 mb-4 line-clamp-3">
        {blog.excerpt || blog.content.substring(0, 150) + "..."}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center">
            <span className="text-orange-800 font-semibold">
              {blog.authorName?.[0]}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{blog.authorName}</p>
            <p className="text-sm text-gray-500">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <Link
          href={`/blogs/${blog.id}`}
          className="text-orange-600 hover:text-orange-700 font-medium text-sm"
        >
          Read More →
        </Link>
      </div>
    </div>
  </article>
);

// Main Blog Page Component
export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleBlogs, setVisibleBlogs] = useState(6);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white ">
      {/* Hero Section */}
        <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] w-full overflow-hidden">
              <Image
                 src="/images/destinations.jpeg"
                alt="African landscape"
                width={1920}
                height={1080}
                className="absolute inset-0 w-full h-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent">
                <div className="container mx-auto h-full px-4">
                  <div className="flex flex-col justify-center h-full max-w-4xl">
                    <span className="text-orange-300 text-sm md:text-base lg:text-lg font-medium mb-4">
                      Your African Adventure Starts Here
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                    What <span className="text-orange-400">our</span> writers say 
                    </h1>
                  </div>
                </div>
              </div>
            </div>

      {/* Blog Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="text-sm md:text-base font-semibold uppercase tracking-wide text-orange-800 bg-orange-100 px-4 py-2 rounded-full">
              Explore Our Stories
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Journey Through <span className="text-orange-600">Africa</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Immerse yourself in authentic African experiences through our carefully curated stories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array(6).fill(0).map((_, i) => <BlogCardSkeleton key={i} />)
          ) : error ? (
            <div className="col-span-full bg-red-50 border-2 border-red-200 rounded-2xl p-10 text-center">
              <p className="text-2xl text-red-600 font-semibold">Oops! {error}</p>
              <p className="text-gray-600 mt-4">
                We&apos;re having trouble loading the stories. Please try again later.
              </p>
            </div>
          ) : (
            blogs.slice(0, visibleBlogs).map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))
          )}
        </div>

        {visibleBlogs < blogs.length && (
          <div className="text-center mt-16">
            <button
              onClick={() => setVisibleBlogs((prev) => prev + 6)}
              className="inline-flex items-center px-8 py-4 rounded-full 
                bg-orange-700 text-white font-semibold 
                hover:bg-orange-800 transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <ChevronDown className="w-6 h-6 mr-3 animate-bounce" />
              Load More Stories
            </button>
          </div>
        )}
      </div>
    </div>
  );
}