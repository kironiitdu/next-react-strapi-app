"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getToken, clearToken } from '@/app/utils/tokenUtils';
import { removeUser} from '@/app/utils/userUtils';
import { Menu, X } from "lucide-react"; // icons

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const storedToken = getToken();
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    //Clearing token from local storage using tokenUtil
    clearToken();
    removeUser();
    setToken(null);
    setIsOpen(false);
  };

  return (
    <nav className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-indigo-600">Logo Goes Here</div>

        {/* Desktop navigation */}
        <div className="hidden md:flex space-x-8 text-lg font-medium items-center">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-indigo-600 transition-colors">About</Link>
          <Link href="/route" className="hover:text-indigo-600 transition-colors">Route</Link>
          {token ? (
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="ml-4 px-4 py-2 bg-black text-white rounded-md hover:bg-neutral-800 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button onClick={toggleMenu} className="md:hidden">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu items */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 space-y-2 text-lg font-medium">
          <Link href="/" className="block hover:text-indigo-600" onClick={toggleMenu}>Home</Link>
          <Link href="/about" className="block hover:text-indigo-600" onClick={toggleMenu}>About</Link>
          <Link href="/route" className="block hover:text-indigo-600" onClick={toggleMenu}>Route</Link>
          {token ? (
            <button
              onClick={handleLogout}
              className="inline-block w-full mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="inline-block mt-2 px-4 py-2 bg-black text-white rounded-md hover:bg-neutral-800 transition"
              onClick={toggleMenu}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
