'use client'
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookText, Users } from 'lucide-react';

interface Stats {
  totalBlogs: number;
  totalBookings: number;
  blogsTrend: number;
  bookingsTrend: number;
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    totalBlogs: 0,
    totalBookings: 0,
    blogsTrend: 0,
    bookingsTrend: 0,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (retryCount = 0) => {
      try {
        const [blogsResponse, bookingsResponse] = await Promise.all([
          fetch('/api/blogs'),
          fetch('/api/bookings'),
        ]);

        if (!blogsResponse.ok || !bookingsResponse.ok) {
          throw new Error('One or more API calls failed');
        }

        const [blogsData, bookingsData] = await Promise.all([
          blogsResponse.json(),
          bookingsResponse.json(),
        ]);

        setStats({
          totalBlogs: Array.isArray(blogsData) ? blogsData.length : (blogsData.total || 0),
          totalBookings: bookingsData.length,
          blogsTrend: blogsData.trend || 0,
          bookingsTrend: 0, // You may want to calculate this based on bookings data
        });
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (retryCount < 3) {
          console.log(`Retrying... Attempt ${retryCount + 1}`);
          setTimeout(() => fetchData(retryCount + 1), 1000);
        } else {
          setError('Failed to fetch data after multiple attempts');
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 px:2 lg:px-20">
      {error ? (
        <div className="col-span-2 text-red-500">{error}</div>
      ) : (
        <>
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2">
                <BookText className="h-4 w-4 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{stats.totalBlogs}</div>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-2">
                <Users className="h-4 w-4 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">
                {stats.totalBookings}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}