'use client'

import { useEffect, useRef } from 'react'

export function CursorSpotlight() {
  const spotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = spotRef.current
    if (!el) return

    let rafId: number
    let latestX = 0
    let latestY = 0

    const updatePosition = () => {
      el.style.setProperty('--x', `${latestX}px`)
      el.style.setProperty('--y', `${latestY}px`)
      document.documentElement.style.setProperty('--mouse-x', `${latestX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${latestY}px`)
      rafId = 0
    }

    const move = (e: MouseEvent) => {
      latestX = e.clientX
      latestY = e.clientY
      if (!rafId) {
        rafId = requestAnimationFrame(updatePosition)
      }
    }

    window.addEventListener('mousemove', move, { passive: true })
    return () => {
      window.removeEventListener('mousemove', move)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={spotRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 cursor-spotlight-layer"
    />
  )
}
