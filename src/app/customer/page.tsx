'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCustomers } from '@/app/services/customer';
import { getToken } from '@/app/utils/tokenUtils';
import { Customer } from '@/app/types/customer';

/**
 * This component fetches and displays a list of customers.
 * Before fetching, it checks if the user is authenticated by verifying the presence of a token.
 * If not authorized, it redirects to the login page without rendering anything else.
 */
export default function CustomerPage() {
  // Holds the list of customers for rendering in the table
  const [customers, setCustomers] = useState<Customer[]>([]);
  // Error message to show if something fails
  const [error, setError] = useState('');
  // A flag to indicate the auth check and data fetch are in progress
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken(); // Get JWT or token from local storage

    // If token is missing (unauthenticated), redirect immediately
    if (!token) {
      setError('You are not authorized to view the customer list');
      router.replace('/login'); // I am using replace to prevent going "back" to this page
      return;
    }

    // If authorized, fetch customers
    getCustomers()
      .then((data) => {
        setCustomers(data);
        setLoading(false); // Done loading after successful fetch
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch customers. Please login again.');
        router.replace('/login');
      });
  }, [router]);

  // While loading/auth check is running, show nothing (or spinner if you want)
  if (loading) return null;

  return (
    <section className="max-w-6xl mx-auto mt-10">
      <h1 className="text-xl font-bold mb-6 text-indigo-600">Customer List</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <table className="min-w-full border border-gray-300 rounded-md overflow-hidden shadow-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border border-gray-300 text-left">Name</th>
            <th className="p-3 border border-gray-300 text-left">Email</th>
            <th className="p-3 border border-gray-300 text-left">Phone</th>
            <th className="p-3 border border-gray-300 text-left">Created</th>
            <th className="p-3 border border-gray-300 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="p-3 border border-gray-300">{c.name}</td>
              <td className="p-3 border border-gray-300">{c.email}</td>
              <td className="p-3 border border-gray-300">{c.phone}</td>
              <td className="p-3 border border-gray-300">
                {new Date(c.createdAt).toLocaleDateString()}
              </td>
              <td className="p-3 border border-gray-300 space-x-2">
                {/* Example buttons */}
                <button className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">View</button>
                <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">Edit</button>
                <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
