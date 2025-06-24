'use client';

import Link from "next/link";
import { useEffect, useState } from 'react';
import { getCustomers } from '@/app/services/customer';
import { Customer } from '@/app/types/customer';
import { useRouter } from 'next/navigation';

/**
 * encodeId:
 * Encodes the given numeric or string ID into a URL-safe base64 string.
 * This is a simple obfuscation to avoid exposing raw database IDs in URLs,
 * which can help reduce the risk of malicious users guessing IDs and
 * tampering with URLs. Note this is encoding, not encryption,
 * so not secure from determined attackers.
 *
 * @param id - The numeric or string ID to encode
 * @returns URL-safe base64 encoded string version of the ID
 */
function encodeId(id: number | string): string {
  return btoa(String(id))
    .replace(/\+/g, '-') // replace '+' with '-' to make URL-safe
    .replace(/\//g, '_') // replace '/' with '_' to make URL-safe
    .replace(/=+$/, ''); // remove trailing '=' padding
}

/**
 * CustomerPage component:
 * This component fetches the list of customers from the backend API
 * when the component is mounted and displays them in a nicely styled
 * table using Tailwind CSS. It also handles error cases like when the user
 * is unauthorized and redirects them to login.
 *
 * For each customer, the table displays name, email, phone, and creation date.
 * Additionally, it provides action buttons for "View", "Edit", and "Delete".
 * The View/Edit buttons use encoded IDs in the URL to avoid exposing raw IDs.
 */
export default function CustomerPage() {
  // State to hold the list of customers fetched from the API
  const [customers, setCustomers] = useState<Customer[]>([]);
  // State to hold any error messages (e.g. unauthorized access)
  const [error, setError] = useState('');
  // Next.js router object for programmatic navigation (e.g. redirecting to login)
  const router = useRouter();

  // useEffect to fetch customers when component mounts (or router changes)
  useEffect(() => {
    getCustomers()
      .then(setCustomers) // On success, set the customers state
      .catch((err) => {
        console.error(err);
        setError('Please login to view customers'); // Show user-friendly error
        router.push('/login'); // Redirect to login page if unauthorized
      });
  }, [router]);

  return (
    <section className="max-w-6xl mx-auto mt-10">
      {/* Heading for the page */}
      <h1 className="text-2xl font-bold mb-4">Customer List</h1>

      {/* Display error message if any */}
      {error && <p className="text-red-600">{error}</p>}

      {/* Customer table with Tailwind styling */}
      <table className="min-w-full border border-gray-300 rounded-md overflow-hidden shadow-sm">
        <thead>
          <tr className="bg-gray-100">
            {/* Table headers */}
            <th className="p-3 border border-gray-300 text-left">Name</th>
            <th className="p-3 border border-gray-300 text-left">Email</th>
            <th className="p-3 border border-gray-300 text-left">Phone</th>
            <th className="p-3 border border-gray-300 text-left">Created</th>
            <th className="p-3 border border-gray-300 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {/* Map over customers array and render one table row per customer */}
          {customers.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50 transition-colors duration-150">
              {/* Display customer details */}
              <td className="p-3 border border-gray-300">{c.name}</td>
              <td className="p-3 border border-gray-300">{c.email}</td>
              <td className="p-3 border border-gray-300">{c.phone}</td>
              <td className="p-3 border border-gray-300">{new Date(c.createdAt).toLocaleDateString()}</td>

              {/* Action buttons column */}
              <td className="p-3 border border-gray-300 space-x-2">
                {/* 
                  View button:
                  Links to customer view page with encoded ID in URL,
                  styled with Tailwind classes for consistent appearance.
                */}
                <Link
                  href={`/customer/view/${encodeId(c.id)}`}
                  className="inline-block px-3 py-1 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  View
                </Link>

                {/* 
                  Edit button:
                  Links to customer edit page with encoded ID,
                  styled similarly with Tailwind.
                */}
                <Link
                  href={`/customer/edit/${encodeId(c.id)}`}
                  className="inline-block px-3 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700 transition"
                >
                  Edit
                </Link>

                {/* 
                  Delete button:
                  Calls alert for demo purposes on click,
                  styled with red background for destructive action.
                */}
                <button
                  onClick={() => alert(`Delete customer ${c.name} (ID encoded: ${encodeId(c.id)})`)}
                  className="inline-block px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
