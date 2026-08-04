'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, useScroll } from "framer-motion"
import { useTheme } from "./theme-provider"
import { staggerFast, fadeIn } from "@/lib/animations"
import { AIAssistantButton } from "./ai-assistant-button"

const navLinks = [
  { href: "/", label: "Home", key: "/" },
  { href: "/#projects", label: "Projects", key: "/#projects" },
  { href: "/about", label: "About", key: "/about" },
  { href: "/blog", label: "Writing & Work", key: "/blog" },
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
  const [activeKey, setActiveKey] = useState<string>(pathname)

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Scroll Spy using IntersectionObserver when on homepage ('/')
  useEffect(() => {
    if (pathname !== "/") {
      if (pathname.startsWith("/about")) setActiveKey("/about")
      else if (pathname.startsWith("/blog")) setActiveKey("/blog")
      else setActiveKey(pathname)
      return
    }

    // Default to Home on load
    setActiveKey("/")

    const sectionMap: Record<string, string> = {
      hero: "/",
      projects: "/#projects",
      about: "/about",
      skills: "/blog",
      contact: "/blog",
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const mappedKey = sectionMap[entry.target.id]
            if (mappedKey) {
              setActiveKey(mappedKey)
            }
          }
        })
      },
      {
        rootMargin: "-25% 0px -45% 0px",
        threshold: 0.1,
      }
    )

    const sections = ["hero", "projects", "about", "skills", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
      observer.disconnect()
    }
  }, [pathname])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, key: string) => {
    setActiveKey(key)
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault()
      const targetId = href.replace("/#", "")
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
    } else if (href === "/" && pathname === "/") {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-14 bg-[var(--glass-bg)] backdrop-blur-xl border-b border-[var(--glass-border)] transition-all duration-300">
      <nav className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 h-full flex items-center justify-between">
        {/* Monogram Logo */}
        <Link
          href="/"
          onClick={(e) => handleLinkClick(e, "/", "/")}
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
          {navLinks.map(({ href, label, key }) => {
            const isActive = activeKey === key
            return (
              <motion.div key={key} variants={fadeIn}>
                <Link
                  href={href}
                  onClick={(e) => handleLinkClick(e, href, key)}
                  className={`relative text-sm transition-colors duration-200 py-1 ${
                    isActive
                      ? "text-[var(--color-fg)] font-medium"
                      : "text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavDot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-fg)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            )
          })}

          {/* Unified AIAssistantButton Navbar CTA */}
          <motion.div variants={fadeIn}>
            <AIAssistantButton
              onClick={() => window.dispatchEvent(new CustomEvent('toggle-ai-assistant'))}
              variant="nav"
              label="AI Assistant"
            />
          </motion.div>

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
          {navLinks.map(({ href, label, key }) => {
            const isActive = activeKey === key
            return (
              <Link
                key={key}
                href={href}
                onClick={(e) => {
                  setMobileOpen(false)
                  handleLinkClick(e, href, key)
                }}
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
