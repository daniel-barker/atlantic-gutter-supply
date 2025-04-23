"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-blue-800 main-header">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-blue-700 py-6 lg:border-none">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">Atlantic Gutter Supply</span>
            </Link>
            <div className="ml-10 hidden space-x-8 lg:block">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-base font-medium ${
                    pathname === link.href
                      ? 'text-white underline underline-offset-8'
                      : 'text-blue-100 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <Link
              href="/admin"
              className="inline-block rounded-md border border-transparent bg-blue-600 py-2 px-4 text-base font-medium text-white hover:bg-blue-700"
            >
              Admin
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 py-4 lg:hidden">
          {navigation.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-base font-medium ${
                pathname === link.href
                  ? 'text-white underline underline-offset-8'
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
