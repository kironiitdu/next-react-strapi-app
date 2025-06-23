'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const router = useRouter();
  const { token, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="shadow-md bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* NAVIGATION LINKS */}
       
        <nav className="flex space-x-8 text-lg font-medium">
           {/* Conditionally show Dashboard if logged in */}
          {token && (
            <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">
              Dashboard
            </Link>
          )}
          <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-indigo-600 transition-colors">About</Link>
          <Link href="/route" className="hover:text-indigo-600 transition-colors">Route</Link>
        </nav>

        {/* LOGIN/LOGOUT BUTTON */}
        <div>
          {token ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-neutral-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
