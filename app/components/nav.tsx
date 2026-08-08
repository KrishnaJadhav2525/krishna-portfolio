'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './theme-provider'
import { indicatorSpring } from '@/lib/animations'
import { AIAssistantButton } from './ai-assistant-button'

const navLinks = [
  { href: '/', label: 'Home', key: '/' },
  { href: '/about', label: 'About', key: '/about' },
  { href: '/#projects', label: 'Projects', key: '/#projects' },
  { href: '/blog', label: 'Writing & Work', key: '/blog' },
]

/**
 * Home-page sections mapped onto the nav keys they should activate.
 * Order matters: it defines document order for the observer.
 */
const SECTION_MAP: Record<string, string> = {
  hero: '/',
  capabilities: '/',
  projects: '/#projects',
  about: '/about',
  stack: '/about',
  writing: '/blog',
  contact: '/blog',
}

function ThemeGlyph({ dark }: { dark: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className="h-[13px] w-[13px]" aria-hidden="true">
      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path
        d={dark ? 'M8 2 A6 6 0 0 1 8 14 Z' : 'M8 2 A6 6 0 0 0 8 14 Z'}
        fill="currentColor"
      />
    </svg>
  )
}

function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted ? theme === 'dark' : true

  return (
    <button
      onClick={toggleTheme}
      className={`group t-mono link-quiet inline-flex items-center gap-2 uppercase ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <span className="transition-transform duration-500 group-hover:rotate-180">
        <ThemeGlyph dark={isDark} />
      </span>
      <span>Theme</span>
    </button>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeKey, setActiveKey] = useState<string>('/')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  /* Condense the bar once the page has moved. */
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24)
        raf = 0
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  /* Scroll spy — one section owns the middle band of the viewport at a time. */
  useEffect(() => {
    if (pathname !== '/') {
      if (pathname.startsWith('/about')) setActiveKey('/about')
      else if (pathname.startsWith('/blog')) setActiveKey('/blog')
      else setActiveKey(pathname)
      return
    }

    setActiveKey('/')

    const ids = Object.keys(SECTION_MAP)
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (sections.length === 0) return

    const visible = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        })

        // Pick the first section in document order that owns the band.
        const current = ids.find((id) => visible.has(id))
        if (current) setActiveKey(SECTION_MAP[current])
        else if (window.scrollY < 80) setActiveKey('/')
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [pathname])

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string, key: string) => {
      setActiveKey(key)
      setMobileOpen(false)

      if (href.startsWith('/#') && pathname === '/') {
        e.preventDefault()
        document.getElementById(href.replace('/#', ''))?.scrollIntoView({ behavior: 'smooth' })
      } else if (href === '/' && pathname === '/') {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    [pathname],
  )

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-[height,background-color] duration-300"
        style={{
          height: scrolled ? 56 : 64,
          borderColor: scrolled ? 'var(--line)' : 'transparent',
          background: scrolled ? 'var(--glass)' : 'transparent',
        }}
      >
        <nav className="shell flex h-full items-center justify-between gap-6">
          {/* Monogram */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/"
              onClick={(e) => handleLinkClick(e, '/', '/')}
              className="group flex items-center gap-2.5"
              aria-label="Krishna Jadhav — home"
            >
              <span
                className="t-label flex h-7 w-7 items-center justify-center border transition-colors duration-300 group-hover:border-[var(--line-3)]"
                style={{ borderColor: 'var(--line-2)', color: 'var(--fg)' }}
              >
                KJ
              </span>
              <span className="t-mono hidden uppercase text-[var(--subtle)] transition-colors duration-200 group-hover:text-[var(--fg)] sm:inline">
                Krishna Jadhav
              </span>
            </Link>
          </motion.div>

          {/* Desktop navigation */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
            className="hidden items-center gap-1 md:flex"
          >
            {navLinks.map(({ href, label, key }) => {
              const isActive = activeKey === key
              return (
                <motion.div
                  key={key}
                  variants={{ hidden: { opacity: 0, y: -6 }, visible: { opacity: 1, y: 0 } }}
                >
                  <Link
                    href={href}
                    onClick={(e) => handleLinkClick(e, href, key)}
                    className="group relative block px-3 py-2 text-[13px] transition-colors duration-200"
                    style={{ color: isActive ? 'var(--fg)' : 'var(--muted)' }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        transition={indicatorSpring}
                        className="absolute inset-0 border-b"
                        style={{
                          borderColor: 'var(--fg)',
                          background:
                            'linear-gradient(to bottom, transparent 40%, color-mix(in srgb, var(--fg) 6%, transparent))',
                        }}
                      />
                    )}
                    <span className="relative group-hover:text-[var(--fg)]">{label}</span>
                  </Link>
                </motion.div>
              )
            })}

            <span className="mx-2 h-4 w-px" style={{ background: 'var(--line-2)' }} />

            <motion.div variants={{ hidden: { opacity: 0, y: -6 }, visible: { opacity: 1, y: 0 } }}>
              <AIAssistantButton
                onClick={() => window.dispatchEvent(new CustomEvent('toggle-ai-assistant'))}
                variant="nav"
                label="AI Assistant"
              />
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: -6 }, visible: { opacity: 1, y: 0 } }}
              className="ml-3"
            >
              <ThemeToggle />
            </motion.div>
          </motion.div>

          {/* Mobile controls */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="t-label border px-2.5 py-2 text-[var(--fg)]"
              style={{ borderColor: 'var(--line-2)' }}
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-center backdrop-blur-2xl md:hidden"
            style={{ background: 'var(--glass)' }}
          >
            <div className="shell">
              <div className="t-label mb-8 text-[var(--subtle)]">Index</div>
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
                className="border-t"
                style={{ borderColor: 'var(--line)' }}
              >
                {navLinks.map(({ href, label, key }, i) => (
                  <motion.li
                    key={key}
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                    }}
                    className="border-b"
                    style={{ borderColor: 'var(--line)' }}
                  >
                    <Link
                      href={href}
                      onClick={(e) => handleLinkClick(e, href, key)}
                      className="flex items-baseline justify-between py-5"
                      style={{ color: activeKey === key ? 'var(--fg)' : 'var(--muted)' }}
                    >
                      <span className="t-item">{label}</span>
                      <span className="t-label">{String(i + 1).padStart(2, '0')}</span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              <button
                onClick={() => {
                  setMobileOpen(false)
                  window.dispatchEvent(new CustomEvent('toggle-ai-assistant'))
                }}
                className="btn-line mt-8 w-full"
              >
                AI Assistant
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
