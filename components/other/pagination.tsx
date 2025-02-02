import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center">
      <ul className="flex items-center space-x-1">
        {currentPage > 1 && (
          <li>
            <Link href={`?page=${currentPage - 1}`} className="px-3 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300">
              Previous
            </Link>
          </li>
        )}
        {pages.map((page) => (
          <li key={page}>
            <Link
              href={`?page=${page}`}
              className={`px-3 py-2 rounded-md ${
                currentPage === page
                  ? 'bg-amber-500 text-white'
                  : 'bg-amber-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {page}
            </Link>
          </li>
        ))}
        {currentPage < totalPages && (
          <li>
            <Link href={`?page=${currentPage + 1}`} className="px-3 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300">
              Next
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}