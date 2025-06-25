'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRoutes } from '@/app/services/route';
import { getToken } from '@/app/utils/tokenUtils';
import { Route } from '@/app/types/route';

export default function RouteListPage() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setError('You are not authorized to view the routes');
      router.replace('/login');
      return;
    }

    getRoutes()
      .then((data) => {
        setRoutes(data);
        setFilteredRoutes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch routes. Please login again.');
        router.replace('/login');
      });
  }, [router]);

  useEffect(() => {
    const filtered = routes.filter((route) =>
      route.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRoutes(filtered);
    setCurrentPage(1); // reset to first page after filtering
  }, [searchTerm, routes]);

  const totalPages = Math.ceil(filteredRoutes.length / itemsPerPage);
  const paginatedRoutes = filteredRoutes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return null;

  return (
    <section className="max-w-6xl mx-auto mt-10">
      <h1 className="text-xl font-bold mb-6 text-indigo-600">Available Routes</h1>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <input
        type="text"
        placeholder="Search routes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />

      <table className="min-w-full border border-gray-300 rounded-md overflow-hidden shadow-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border border-gray-300 text-left">Route Name</th>
            <th className="p-3 border border-gray-300 text-left">Duration</th>
            <th className="p-3 border border-gray-300 text-left">Price</th>
            <th className="p-3 border border-gray-300 text-left">Created</th>
            <th className="p-3 border border-gray-300 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRoutes.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                No routes found.
              </td>
            </tr>
          ) : (
            paginatedRoutes.map((route) => (
              <tr key={route.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="p-3 border border-gray-300">{route.name}</td>
                <td className="p-3 border border-gray-300">{route.duration_mins}</td>
                <td className="p-3 border border-gray-300">
                  {route.price !== null ? `$${route.price}` : 'N/A'}
                </td>
                <td className="p-3 border border-gray-300">
                  {new Date(route.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 border border-gray-300">
                  <button
                    className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    onClick={() => router.push(`/book-ticket?id=${route.id}`)}
                  >
                    Book Ticket
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
}
