'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, User, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/types/blogs';

// Skeleton Loading Component
const BlogDetailSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-[50vh] bg-orange-100"></div>
    <div className="max-w-4xl mx-auto px-4 -mt-32 relative z-10">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="h-8 bg-orange-100 w-3/4 rounded mb-4"></div>
        <div className="flex space-x-6 mb-8">
          <div className="h-4 bg-orange-50 w-32 rounded"></div>
          <div className="h-4 bg-orange-50 w-32 rounded"></div>
        </div>
        <div className="space-y-4">
          {Array(6).fill(null).map((_, i) => (
            <div key={i} className="h-4 bg-orange-50 rounded w-full"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Related Blog Card Component
const RelatedBlogCard = ({ blog }: { blog: BlogPost }) => (
  <Link
    href={`/blogs/${blog.id}`}
    className="block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
  >
    {blog.imageData && (
      <div className="relative h-48">
        <Image
          src={blog.imageData}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>
    )}
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
        {blog.title}
      </h3>
      <div className="flex items-center text-gray-600 text-sm">
        <User className="w-4 h-4 mr-2" />
        <span>{blog.authorName}</span>
      </div>
    </div>
  </Link>
);

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const [blogResponse, allBlogsResponse] = await Promise.all([
          fetch(`/api/blogs/${params.id}`),
          fetch('/api/blogs'),
        ]);

        if (!blogResponse.ok || !allBlogsResponse.ok) {
          throw new Error('Failed to fetch blog data');
        }

        const blogData = await blogResponse.json();
        const allBlogs = await allBlogsResponse.json();

        setBlog(blogData);
        setRelatedBlogs(allBlogs.filter((b: BlogPost) => b.id !== params.id));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [params.id]);

  if (loading) return <BlogDetailSkeleton />;
  if (error)
    return (
      <div className="text-center py-16">
        <p className="text-2xl text-red-600 font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Blog Detail Section */}
      <div className="relative h-[50vh]">
        {blog?.imageData && (
          <Image
            src={blog.imageData}
            alt={blog.title}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="max-w-4xl mx-auto px-4 -mt-32 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Link href="/blogs" className="text-orange-600 flex items-center mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blogs
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog?.title}</h1>
          <div className="flex space-x-6 text-gray-600 mb-8">
            <span>
              <User className="inline-block w-4 h-4 mr-2" />
              {blog?.authorName}
            </span>
            <span>
              <Calendar className="inline-block w-4 h-4 mr-2" />
              {new Date(blog?.createdAt || '').toLocaleDateString()}
            </span>
          </div>
          <div className="text-gray-700 space-y-4">{blog?.content}</div>
        </div>
      </div>

      {/* Related Blogs Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">More Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedBlogs.slice(0, 6).map((relatedBlog) => (
            <RelatedBlogCard key={relatedBlog.id} blog={relatedBlog} />
          ))}
        </div>
      </div>
    </div>
  );
}
