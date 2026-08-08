'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shell } from '@/app/components/ui/primitives'
import { VIEWPORT } from '@/lib/animations'

const socialLinks = [
  { href: 'https://github.com/KrishnaJadhav2525', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/krishna-jadhav-a5122a316/', label: 'LinkedIn' },
  { href: 'https://x.com/krlshn444', label: 'Twitter' },
  { href: '/rss', label: 'RSS' },
]

const siteLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/#projects', label: 'Projects' },
  { href: '/blog', label: 'Writing & Work' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 mt-auto">
      <motion.div
        aria-hidden="true"
        className="rule-x origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
      />

      <Shell className="py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-12">
          <div className="sm:col-span-5">
            <div className="t-label mb-4">Krishna Jadhav</div>
            <p className="t-body max-w-[36ch] text-[0.875rem]">
              Full-stack &amp; AI systems engineer. Building web applications, automation
              pipelines and retrieval systems.
            </p>
          </div>

          <nav className="sm:col-span-3">
            <div className="t-label mb-4">Index</div>
            <ul className="space-y-2.5">
              {siteLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="t-mono hover-text uppercase">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="sm:col-span-4">
            <div className="t-label mb-4">Elsewhere</div>
            <ul className="space-y-2.5">
              {socialLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="t-mono hover-text uppercase"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div
          className="mt-12 flex flex-col items-start justify-between gap-3 border-t pt-6 sm:flex-row sm:items-center"
          style={{ borderColor: 'var(--line)' }}
        >
          <span className="t-label">© {new Date().getFullYear()} Krishna Jadhav</span>
          <span className="t-label">Built with Next.js · Deployed on Vercel</span>
        </div>
      </Shell>
    </footer>
  )
}
