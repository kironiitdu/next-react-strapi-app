import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext"; // <-- added

/*
  This file defines the RootLayout component, which serves as the root layout wrapper for the entire Next.js application.

  Key points:

  1. Fonts Setup:
     - Imports two Google fonts (Geist Sans and Geist Mono) using Next.js built-in font optimization.
     - Defines CSS custom properties (--font-geist-sans and --font-geist-mono) to apply these fonts globally.

  2. Metadata:
     - Exports a 'metadata' object describing the page title and description.
     - This metadata can be used by Next.js for SEO, browser tab title, and social sharing info.

  3. RootLayout Component:
     - Wraps the entire app content inside <html> and <body> tags.
     - Adds the font CSS variables as classes on the <body> for styling.
     - Sets global styling for background color, text color, and anti-aliasing for smooth fonts.
     - Wraps content with <AuthProvider> context to provide authentication state and functions app-wide.
     - Renders a consistent page Header and Footer around the main content.
     - The main content area has a maximum width and padding for layout consistency and spacing.
     - Uses a calculated minimum height to ensure the main area fills the viewport height minus header/footer.

  4. Children:
     - The 'children' prop represents nested page content that will be rendered inside the <main> section.
     - This enables all pages to share the same layout and styling without repeating the wrapper code.

  Summary:
  This file centralizes global styles, fonts, SEO metadata, authentication context,
  and page frame components to maintain consistent look & behavior across the app.
*/

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kasper Adaptation Project",
  description: "A modern Next.js app with Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-800`}
      >
        <AuthProvider>
          <Header />
          <main className="max-w-7xl mx-auto px-6 py-10 min-h-[calc(100vh-160px)]">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
