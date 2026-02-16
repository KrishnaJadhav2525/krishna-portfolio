'use client';

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useState } from "react"

export default function Navbar() {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

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
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md sm:max-w-xl px-4">
      <nav className="flex items-center justify-between py-2 px-5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-black/50 ring-1 ring-white/5 transition-all hover:bg-black/50 hover:border-white/20">

        {/* LEFT: NAME */}
        <Link
          href="/"
          className="text-base font-bold tracking-tight text-white mr-6 hover:text-indigo-400 transition-colors"
        >
          Krishna<span className="text-indigo-500">.</span>
        </Link>

        {/* RIGHT: LINKS */}
        <div className="flex items-center gap-0.5">
          {navLinks.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-full",
                  active ? "text-white" : "text-neutral-400 hover:text-white"
                )}
                onMouseEnter={() => setHoveredPath(href)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                {/* Text Label */}
                <span className="relative z-10">{label}</span>

                {/* Hover Background */}
                {hoveredPath === href && (
                  <motion.div
                    className="absolute inset-0 bg-white/10 rounded-full -z-0"
                    layoutId="navbar-hover"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 25,
                    }}
                  />
                )}

                {/* Active Dot Indicator */}
                {active && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-500 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  )
}
