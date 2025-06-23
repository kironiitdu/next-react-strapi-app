export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-12">
      <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Kasper Transportation. All rights reserved.
      </div>
    </footer>
  );
}
