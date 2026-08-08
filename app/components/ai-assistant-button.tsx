'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface AIAssistantButtonProps {
  onClick?: () => void
  label?: string
  className?: string
  variant?: 'nav' | 'floating'
  active?: boolean
}

/**
 * AssistantGlyph — a custom technical node mark: an orthogonal frame with a
 * live centre node and four axis ticks. Deliberately not a sparkle.
 */
export function AssistantGlyph({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="6.5" y="6.5" width="11" height="11" transform="rotate(45 12 12)" />
      <circle cx="12" cy="12" r="2.1" fill="currentColor" stroke="none" />
      <path d="M12 0.5v3M12 20.5v3M0.5 12h3M20.5 12h3" />
    </svg>
  )
}

/* Kept for backwards compatibility with earlier imports. */
export const EngineeringStarIcon = AssistantGlyph

export function AIAssistantButton({
  onClick,
  label = 'AI Assistant',
  className = '',
  variant = 'floating',
  active = false,
}: AIAssistantButtonProps) {
  if (variant === 'nav') {
    return (
      <button
        onClick={onClick}
        aria-label="Toggle AI assistant"
        className={`group sheen-hover t-mono relative inline-flex items-center gap-2 border px-3 py-[7px] uppercase transition-colors duration-200 ${className}`}
        style={{
          borderColor: active ? 'var(--line-3)' : 'var(--line-2)',
          color: active ? 'var(--fg)' : 'var(--muted)',
        }}
      >
        <AssistantGlyph className="h-[13px] w-[13px] transition-transform duration-500 group-hover:rotate-90" />
        <span className="transition-colors duration-200 group-hover:text-[var(--fg)]">{label}</span>
        <span
          className="ml-0.5 h-[5px] w-[5px] rounded-full"
          style={{ background: 'var(--fg)', opacity: 0.75 }}
        />
      </button>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.24, ease: [0.2, 0, 0, 1] }}
      aria-label="Toggle AI assistant"
      className={`group relative flex h-[52px] w-[52px] items-center justify-center border backdrop-blur-xl transition-colors duration-300 ${className}`}
      style={{
        borderColor: active ? 'var(--line-3)' : 'var(--line-2)',
        background: 'var(--glass)',
        boxShadow: 'var(--elevation)',
        color: 'var(--fg)',
      }}
    >
      {/* Rotating dashed ring — the only continuously animated chrome element. */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-45 transition-opacity duration-300 group-hover:opacity-90"
        viewBox="0 0 52 52"
        aria-hidden="true"
      >
        <motion.circle
          cx="26"
          cy="26"
          r="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeDasharray="3 6"
          style={{ originX: '50%', originY: '50%' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 26, ease: 'linear', repeat: Infinity }}
        />
      </svg>

      {/* Corner ticks */}
      <span
        className="pointer-events-none absolute left-[-1px] top-[-1px] h-2.5 w-2.5 border-l border-t opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ borderColor: 'var(--line-3)' }}
      />
      <span
        className="pointer-events-none absolute bottom-[-1px] right-[-1px] h-2.5 w-2.5 border-b border-r opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ borderColor: 'var(--line-3)' }}
      />

      <AssistantGlyph className="h-[18px] w-[18px] transition-transform duration-500 group-hover:rotate-90" />

      {/* Live status indicator */}
      <span className="absolute right-[7px] top-[7px]">
        <span className="status-dot" />
      </span>

      {/* Hover caption */}
      <span
        className="t-label pointer-events-none absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2 whitespace-nowrap border px-2 py-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ borderColor: 'var(--line)', background: 'var(--glass)', color: 'var(--fg)' }}
      >
        {label}
      </span>
    </motion.button>
  )
}
