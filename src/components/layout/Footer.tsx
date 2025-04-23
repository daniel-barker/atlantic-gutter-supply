"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 main-footer">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-semibold text-white">Atlantic Gutter Supply</h3>
            <p className="mt-4 text-gray-300">
              Providing quality gutter supplies for contractors and homeowners since 1995.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <address className="mt-4 not-italic text-gray-300">
              <p>123 Gutter Lane</p>
              <p>Atlantic City, NJ 08401</p>
              <p className="mt-4">Phone: (555) 123-4567</p>
              <p>Email: info@atlanticguttersupply.com</p>
            </address>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} Atlantic Gutter Supply. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
