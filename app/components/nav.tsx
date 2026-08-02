'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTheme } from "./theme-provider"
import { staggerFast, fadeIn } from "@/lib/animations"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Writing & Work" },
]

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? theme === "dark" : true

  return (
    <button
      onClick={toggleTheme}
      className="font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors duration-150 tracking-widest uppercase flex items-center gap-1.5"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className="text-[10px] select-none">{isDark ? "○" : "●"}</span>
      <span>{isDark ? "LIGHT" : "DARK"}</span>
    </button>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()
  const borderOpacity = useTransform(scrollY, [0, 50], [0.4, 1])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-14 bg-[var(--glass-bg)] backdrop-blur-xl border-b border-[var(--glass-border)] transition-all duration-300">
      <nav className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Monogram Logo */}
        <Link
          href="/"
          className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--color-fg)] hover:opacity-70 transition-opacity"
        >
          KJ
        </Link>

        {/* Desktop Navigation */}
        <motion.div
          variants={staggerFast}
          initial="hidden"
          animate="visible"
          className="hidden md:flex items-center gap-6"
        >
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href))
            return (
              <motion.div key={href} variants={fadeIn}>
                <Link
                  href={href}
                  className={`relative text-sm transition-colors duration-150 py-1 ${
                    isActive
                      ? "text-[var(--color-fg)] font-medium"
                      : "text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavDot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-fg)]"
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                  )}
                </Link>
              </motion.div>
            )
          })}
          <span className="text-[var(--color-border-strong)] font-mono text-xs select-none">/</span>
          <motion.div variants={fadeIn}>
            <ThemeToggle />
          </motion.div>
        </motion.div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-fg)] uppercase tracking-wider p-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="md:hidden border-b border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-4 space-y-3"
        >
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`block text-sm py-1 transition-colors duration-150 ${
                  isActive
                    ? "text-[var(--color-fg)] font-medium"
                    : "text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                }`}
              >
                {label}
              </Link>
            )
          })}
        </motion.div>
      )}
    </header>
  )
}
