'use client';

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

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
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto w-full max-w-7xl px-6 h-16 flex items-center justify-between">
        {/* LEFT: NAME */}
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity"
        >
          Krishna<span className="text-muted-foreground">.</span>
        </Link>

        {/* RIGHT: LINKS */}
        <div className="flex items-center gap-8 text-sm font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative py-1 transition-colors duration-300",
                isActive(href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
              {/* Active indicator line */}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 right-0 h-px bg-foreground transform origin-left transition-transform duration-300",
                  isActive(href) ? "scale-x-100" : "scale-x-0"
                )}
              />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
