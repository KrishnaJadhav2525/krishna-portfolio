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
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 bg-black/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LEFT: NAME */}
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-white hover:opacity-80 transition-opacity"
        >
          Krishna<span className="text-neutral-500">.</span>
        </Link>

        {/* RIGHT: LINKS */}
        <div className="flex items-center gap-10 text-sm font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative py-1 transition-all duration-300 ${isActive(href)
                ? 'text-white'
                : 'text-neutral-400 hover:text-white'
                }`}
            >
              {label}
              {/* Active indicator line */}
              <span className={`absolute -bottom-1 left-0 right-0 h-px bg-white transform origin-left transition-transform duration-300 ${isActive(href) ? 'scale-x-100' : 'scale-x-0'}`} />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
