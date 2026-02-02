'use client';

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/#skills", label: "Skills" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
  ];

  const isActive = (href: string) => {
    if (href === '/blog') return pathname.startsWith('/blog');
    if (href === '/about') return pathname === '/about';
    if (href === '/#skills') return pathname === '/' || pathname === '/#skills';
    return false;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-neutral-900/50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LEFT: NAME */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-white hover:text-indigo-300 transition-colors"
        >
          Krishna<span className="text-indigo-400">.</span>
        </Link>

        {/* RIGHT: LINKS */}
        <div className="flex items-center gap-8 text-sm">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative py-1 transition-colors ${isActive(href)
                  ? 'text-white'
                  : 'text-neutral-400 hover:text-white'
                }`}
            >
              {label}
              {/* Active indicator line */}
              {isActive(href) && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
