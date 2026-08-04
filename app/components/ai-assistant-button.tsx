'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface AIAssistantButtonProps {
  onClick?: () => void
  label?: string
  className?: string
  variant?: 'nav' | 'floating'
}

// Minimalist Four-Point Engineering Star Vector Node (Vercel / Linear inspired)
export function EngineeringStarIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  )
}

export function AIAssistantButton({
  onClick,
  label = "AI Assistant",
  className = "",
  variant = "floating"
}: AIAssistantButtonProps) {
  const isNav = variant === 'nav'

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`relative group shimmer-hover bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] text-[var(--color-fg)] rounded-full font-mono flex items-center justify-center transition-all duration-300 select-none overflow-hidden ${
        isNav
          ? 'px-3.5 py-1.5 text-xs shadow-[0_0_12px_rgba(255,255,255,0.06)] dark:shadow-[0_0_12px_rgba(255,255,255,0.06)] light:shadow-[0_1px_4px_rgba(0,0,0,0.05)]'
          : 'h-11 px-5 text-xs shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_15px_rgba(255,255,255,0.08)] light:shadow-[0_4px_20px_rgba(0,0,0,0.08)]'
      } ${className}`}
      aria-label="Toggle AI Assistant"
    >
      {/* Subtle Idle Ambient Border Breathing Pulse */}
      <span className="absolute inset-0 rounded-full border border-[var(--color-border-strong)] animate-pulse pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity" />

      {/* Vector Star Node Icon */}
      <EngineeringStarIcon className="w-3.5 h-3.5 text-[var(--color-fg)] transition-transform duration-300 group-hover:rotate-45" />

      {/* Button Text */}
      <span className="font-mono text-xs font-medium tracking-tight text-[var(--color-fg)] ml-2">
        {label}
      </span>
    </motion.button>
  )
}
