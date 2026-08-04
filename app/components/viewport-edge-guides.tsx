'use client'

import React, { useEffect, useRef, useState } from 'react'

export function ViewportEdgeGuides() {
  const [dimensions, setDimensions] = useState<{ w: number; h: number }>({ w: 0, h: 0 })
  const scrollRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let animationFrameId: number

    const updateMetrics = () => {
      setDimensions({ w: window.innerWidth, h: window.innerHeight })
    }

    const updateScroll = () => {
      const h = window.innerHeight
      const docH = document.documentElement.scrollHeight - h
      const currentScroll = window.scrollY
      const pct = docH > 0 ? Math.round((currentScroll / docH) * 100) : 0

      if (scrollRef.current) {
        scrollRef.current.textContent = `DEPTH: ${pct.toString().padStart(3, '0')}%`
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(updateScroll)
    }

    updateMetrics()
    updateScroll()

    window.addEventListener('resize', updateMetrics, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('resize', updateMetrics)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-30 pointer-events-none select-none text-[9px] font-mono text-[var(--color-subtle)] uppercase tracking-[0.2em]"
    >
      {/* --- TOP VIEWPORT EDGE RULER & METRICS --- */}
      <div className="absolute top-0 inset-x-0 h-6 border-b border-[var(--color-border)] px-6 flex items-center justify-between bg-[var(--glass-bg)] backdrop-blur-[4px]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[var(--color-fg)]/70">
            <span className="w-1 h-1 rounded-full bg-[var(--color-accent)] animate-pulse" />
            <span>SYS_KERNEL // ONLINE</span>
          </span>
          <span className="hidden md:inline text-[var(--color-subtle)]/40">|</span>
          <span className="hidden md:inline text-[var(--color-subtle)]">19.0760° N, 72.8777° E</span>
        </div>

        {/* Top Edge Ruler Ticks */}
        <div className="hidden sm:flex items-center gap-2 opacity-40">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="inline-block w-px h-2 bg-[var(--color-border-strong)]" />
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[var(--color-subtle)]">FRAME_01 // SWISS OS</span>
        </div>
      </div>

      {/* --- BOTTOM VIEWPORT EDGE GUIDES --- */}
      <div className="absolute bottom-0 inset-x-0 h-6 border-t border-[var(--color-border)] px-6 flex items-center justify-between bg-[var(--glass-bg)] backdrop-blur-[4px]">
        <div className="flex items-center gap-4">
          <span className="text-[var(--color-subtle)]">
            VP_{dimensions.w}x{dimensions.h}
          </span>
          <span className="hidden sm:inline text-[var(--color-subtle)]/40">|</span>
          <span className="hidden sm:inline text-[var(--color-subtle)]">ENGINE: 60FPS CANVAS</span>
        </div>

        <div className="flex items-center gap-4">
          <span ref={scrollRef} className="tabular-nums text-[var(--color-fg)]/80 font-medium">
            DEPTH: 000%
          </span>
        </div>
      </div>

      {/* --- LEFT VIEWPORT EDGE MARKS --- */}
      <div className="hidden lg:flex absolute left-0 top-12 bottom-12 w-6 flex-col justify-between items-center py-6 border-r border-[var(--color-border)]">
        <span className="rotate-[-90deg] origin-center text-[var(--color-subtle)]/70 whitespace-nowrap">
          Y-AXIS [0..100%]
        </span>
        <div className="flex flex-col gap-3 opacity-40">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="w-1.5 h-px bg-[var(--color-border-strong)]" />
          ))}
        </div>
        <span className="text-[var(--color-subtle)]/60">01</span>
      </div>

      {/* --- RIGHT VIEWPORT EDGE MARKS --- */}
      <div className="hidden lg:flex absolute right-0 top-12 bottom-12 w-6 flex-col justify-between items-center py-6 border-l border-[var(--color-border)]">
        <span className="text-[var(--color-subtle)]/60">02</span>
        <div className="flex flex-col gap-3 opacity-40">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="w-1.5 h-px bg-[var(--color-border-strong)]" />
          ))}
        </div>
        <span className="rotate-[90deg] origin-center text-[var(--color-subtle)]/70 whitespace-nowrap">
          CANVAS GRID
        </span>
      </div>
    </div>
  )
}
