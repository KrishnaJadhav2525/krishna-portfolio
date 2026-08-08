'use client'

/**
 * SiteBackground — the single global background layer stack.
 *
 * Six depth layers of engineering-blueprint geometry sitting behind every page.
 * Nothing here is a card and nothing here is interactive; the whole stack is
 * fixed, aria-hidden and pointer-events:none.
 *
 * Motion budget: one rAF-throttled pointer listener plus transform-only
 * parallax driven by framer-motion scroll values. No canvas, no timers.
 */

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

/* Deterministic pseudo-random so server and client render identically. */
function seeded(i: number, salt = 1) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

/**
 * Round to two decimals and drop trailing zeros. The browser normalises inline
 * style values this way, so pre-normalising keeps SSR and client markup byte
 * identical and avoids a hydration mismatch.
 */
const px = (n: number) => Number(n.toFixed(2))

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: `${px(seeded(i, 1) * 100)}%`,
  top: `${px(seeded(i, 2) * 100)}%`,
  dur: `${px(22 + seeded(i, 3) * 20)}s`,
  delay: `${px(seeded(i, 4) * -34)}s`,
  scale: px(0.6 + seeded(i, 5) * 1.1),
}))

export function SiteBackground() {
  const rootRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()

  const factor = reduce ? 0 : 1
  const yDeep = useTransform(scrollY, (v) => v * -0.03 * factor)
  const yMid = useTransform(scrollY, (v) => v * -0.07 * factor)
  const yNear = useTransform(scrollY, (v) => v * -0.13 * factor)
  const yDust = useTransform(scrollY, (v) => v * -0.19 * factor)
  const rotMid = useTransform(scrollY, (v) => v * 0.004 * factor)

  /* Cursor light — one listener, coalesced into a single rAF write. */
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let raf = 0
    let x = 0
    let y = 0

    const write = () => {
      el.style.setProperty('--px', `${x}px`)
      el.style.setProperty('--py', `${y}px`)
      raf = 0
    }

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      if (!raf) raf = requestAnimationFrame(write)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={rootRef} aria-hidden="true" className="bg-root">
      {/* ---------- L0 · base wash + ambient pools ---------- */}
      <div className="bg-pools" />

      {/* ---------- L1 · hairline grid ---------- */}
      <motion.div
        className="bg-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* ---------- L2 · deep geometry: oversized wireframe rectangles ---------- */}
      <motion.div
        className="bg-layer"
        style={{ y: yDeep }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Extends far past the left and top edges. */}
        <div
          className="absolute -left-[18vw] -top-[26vh] h-[150vh] w-[86vw] border"
          style={{ borderColor: 'var(--geo)', transform: 'rotate(-0.6deg)' }}
        />
        {/* Bleeds off the right edge. */}
        <div
          className="absolute -right-[24vw] top-[8vh] h-[130vh] w-[72vw] border"
          style={{ borderColor: 'var(--geo-dim)', transform: 'rotate(0.9deg)' }}
        />
        {/* Centre construction box, inset. */}
        <div
          className="absolute left-[16vw] top-[14vh] hidden h-[74vh] w-[62vw] border md:block"
          style={{ borderColor: 'var(--geo-dim)' }}
        />
      </motion.div>

      {/* ---------- L3 · mid geometry: circles, long axes, drawn lines ---------- */}
      <motion.div className="bg-layer" style={{ y: yMid, rotate: rotMid }}>
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1600 1000"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Long intersecting axes, drawn in on load */}
          <line x1="0" y1="318" x2="1600" y2="318" className="bg-stroke draw-line" style={{ ['--len' as string]: 1600 }} />
          <line x1="1128" y1="0" x2="1128" y2="1000" className="bg-stroke draw-line" style={{ ['--len' as string]: 1000, animationDelay: '0.25s' }} />
          <line x1="286" y1="0" x2="286" y2="1000" className="bg-stroke-dim draw-line" style={{ ['--len' as string]: 1000, animationDelay: '0.45s' }} />
          <line x1="0" y1="742" x2="1600" y2="742" className="bg-stroke-dim draw-line" style={{ ['--len' as string]: 1600, animationDelay: '0.6s' }} />

          {/* Oversized circles — one bleeds off canvas */}
          <circle cx="1128" cy="318" r="252" className="bg-stroke" />
          <circle cx="1128" cy="318" r="128" className="bg-stroke-dim" />
          <circle cx="286" cy="742" r="368" className="bg-stroke-dim" />

          {/* Rotated diamond */}
          <rect x="1240" y="640" width="300" height="300" className="bg-stroke-dim" transform="rotate(45 1390 790)" />

          {/* Intersection nodes */}
          {[
            [1128, 318],
            [286, 318],
            [1128, 742],
            [286, 742],
          ].map(([cx, cy]) => (
            <g key={`${cx}-${cy}`} className="bg-stroke">
              <line x1={cx - 7} y1={cy} x2={cx + 7} y2={cy} />
              <line x1={cx} y1={cy - 7} x2={cx} y2={cy + 7} />
            </g>
          ))}
        </svg>
      </motion.div>

      {/* ---------- L4 · near geometry: small frames, labels, coordinates ---------- */}
      <motion.div
        className="bg-layer hidden sm:block"
        style={{ y: yNear }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1600 1000"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect x="86" y="120" width="150" height="150" className="bg-stroke" />
          <rect x="1382" y="828" width="104" height="104" className="bg-stroke-dim" />
          <rect x="640" y="452" width="320" height="196" className="bg-stroke-dim" />

          <text x="90" y="110" className="bg-text">FRAME · 01</text>
          <text x="1136" y="308" className="bg-text">NODE · X1 Y1</text>
          <text x="294" y="732" className="bg-text">19.0760 N / 72.8777 E</text>
          <text x="646" y="442" className="bg-text">VIEWPORT BOUND</text>
          <text x="1386" y="818" className="bg-text">04</text>
        </svg>
      </motion.div>

      {/* ---------- L5 · drifting particles ---------- */}
      <motion.div className="bg-layer" style={{ y: yDust }}>
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: p.left,
              top: p.top,
              transform: `scale(${p.scale})`,
              ['--dur' as string]: p.dur,
              ['--delay' as string]: p.delay,
            }}
          />
        ))}
      </motion.div>

      {/* ---------- L6 · cursor light ---------- */}
      <div className="bg-cursor" />
    </div>
  )
}

/**
 * ConstructionRails — the two vertical hairlines marking the layout shell edges.
 * Rendered above the background but below content.
 */
export function ConstructionRails() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] hidden lg:block">
      <div className="mx-auto h-full w-full max-w-[1560px] px-[56px]">
        <div className="relative h-full w-full">
          <div className="absolute inset-y-0 -left-px w-px" style={{ background: 'var(--line)' }} />
          <div className="absolute inset-y-0 -right-px w-px" style={{ background: 'var(--line)' }} />
        </div>
      </div>
    </div>
  )
}
