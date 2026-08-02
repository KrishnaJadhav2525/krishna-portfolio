'use client'

import { useEffect, useRef } from 'react'

export function CursorSpotlight() {
  const spotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = spotRef.current
    if (!el) return

    const move = (e: MouseEvent) => {
      el.style.setProperty('--x', `${e.clientX}px`)
      el.style.setProperty('--y', `${e.clientY}px`)
    }

    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      ref={spotRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 cursor-spotlight-layer"
    />
  )
}
