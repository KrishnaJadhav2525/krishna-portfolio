'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeIn } from "@/lib/animations"

const socialLinks = [
  { href: "https://github.com/KrishnaJadhav2525", label: "GitHub" },
  { href: "https://x.com/krlshn444", label: "Twitter" },
  { href: "https://www.linkedin.com/in/krishna-jadhav-a5122a316/", label: "LinkedIn" },
  { href: "/rss", label: "RSS" },
]

export default function Footer() {
  return (
    <motion.footer
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="border-t border-[var(--color-border)] py-10 mt-20"
    >
      <div className="max-w-[680px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-[10px] text-[var(--color-subtle)] tracking-[0.15em] uppercase select-none">
          © {new Date().getFullYear()} KRISHNA JADHAV
        </span>

        <div className="flex items-center gap-5">
          {socialLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="font-mono text-[10px] text-[var(--color-subtle)] hover:text-[var(--color-fg)] transition-colors duration-150 tracking-[0.15em] uppercase"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </motion.footer>
  )
}
