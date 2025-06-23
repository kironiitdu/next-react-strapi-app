'use client';

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Link from "next/link";

const sampleSalesData = [
  { date: "Jun 1", sales: 300 },
  { date: "Jun 2", sales: 500 },
  { date: "Jun 3", sales: 200 },
  { date: "Jun 4", sales: 400 },
  { date: "Jun 5", sales: 350 },
];

// Sidebar styled like a card
const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (key: string) => {
    setOpenMenu(openMenu === key ? null : key);
  };

  return (
    <aside className="w-64 bg-white shadow rounded-xl p-4 h-fit sticky top-6 ml-4 mt-6">
      <h2 className="text-xl font-bold mb-6 text-indigo-600">Dashboard</h2>
      <nav className="space-y-2 text-gray-700">
        {/* Routes */}
        <div>
          <button
            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded transition"
            onClick={() => toggleMenu("routes")}
          >
            Routes
          </button>
          {openMenu === "routes" && (
            <div className="ml-4 mt-1 space-y-1">
              <Link href="#" className="block px-3 py-1 hover:bg-gray-100 rounded">All Routes</Link>
              <Link href="#" className="block px-3 py-1 hover:bg-gray-100 rounded">Add Route</Link>
            </div>
          )}
        </div>

        {/* Customers */}
        <div>
          <button
            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded transition"
            onClick={() => toggleMenu("buses")}
          >
            Customers
          </button>
          {openMenu === "buses" && (
            <div className="ml-4 mt-1 space-y-1">
              <Link href="#" className="block px-3 py-1 hover:bg-gray-100 rounded">All Customers</Link>
              <Link href="#" className="block px-3 py-1 hover:bg-gray-100 rounded">Add Customer</Link>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default function DashboardPage() {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Welcome to Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-4">Total Sales (Sample)</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={sampleSalesData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Total Routes */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-2">Total Routes</h2>
            <p className="text-4xl font-bold text-indigo-600">42</p>
          </div>

          {/* Most Busy Route */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-2">Most Busy Route</h2>
            <p className="text-lg">Route A</p>
            <p className="text-sm text-gray-600">1,230 passengers</p>
          </div>

          {/* Ticket Selling Trend */}
          <div className="bg-white p-4 rounded-xl shadow md:col-span-2">
            <h2 className="font-semibold mb-2">Ticket Selling Trend</h2>
            <p className="text-sm text-gray-600">(Sample data. Will populate via API.)</p>
            <div className="h-32 bg-gray-200 rounded mt-2 flex items-center justify-center text-gray-500">
              Trend Chart Coming Soon
            </div>
          </div>

          {/* Bus Schedule */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-2">Current Bus Schedule</h2>
            <ul className="text-sm space-y-1">
              <li>Bus 21 - 10:00 AM - Downtown</li>
              <li>Bus 18 - 10:30 AM - Uptown</li>
              <li>Bus 12 - 11:00 AM - Airport</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
