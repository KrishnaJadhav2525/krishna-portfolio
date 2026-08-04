'use client'

import React from 'react'

export function VercelGeometryBoxes() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 min-h-full"
    >
      {/*
        ================================================================
        GLOBAL VERCEL ARCHITECTURAL BLUEPRINT BACKGROUND LAYER
        Massive outlined layout rectangles, overlapping construction frames,
        and offset boundaries spanning continuously across the entire document.
        ================================================================
      */}

      {/* --- ENORMOUS FRAME 01: Top-Left Hero & Navigation Architecture --- */}
      <div className="absolute -top-16 -left-20 w-[85vw] max-w-[1300px] h-[1400px] border border-[var(--color-border)]/40 dark:border-white/[0.04] light:border-black/[0.05] opacity-80">
        <div className="absolute top-4 left-6 font-mono text-[9px] text-[var(--color-subtle)]/50 tracking-[0.25em]">
          ARCH_FRAME_01 // 19.0760° N // MAIN_BOUND_X1
        </div>
        <div className="absolute bottom-4 right-6 font-mono text-[9px] text-[var(--color-subtle)]/40 tracking-[0.2em]">
          SYS_LAYOUT_PRIMARY
        </div>
        <span className="blueprint-card-corner blueprint-corner-tl">+</span>
        <span className="blueprint-card-corner blueprint-corner-tr">+</span>
        <span className="blueprint-card-corner blueprint-corner-bl">+</span>
        <span className="blueprint-card-corner blueprint-corner-br">+</span>
      </div>

      {/* --- ENORMOUS FRAME 02: Top-Right Bleeding Off Screen --- */}
      <div className="absolute top-32 -right-32 w-[75vw] max-w-[1100px] h-[1600px] border border-[var(--color-border)]/35 dark:border-white/[0.035] light:border-black/[0.045] rotate-[-1deg] opacity-70">
        <div className="absolute top-4 right-6 font-mono text-[9px] text-[var(--color-subtle)]/50 tracking-[0.25em]">
          72.8777° E // VECTOR_AXIS_Y2
        </div>
        <span className="blueprint-card-corner blueprint-corner-tl">+</span>
        <span className="blueprint-card-corner blueprint-corner-tr">+</span>
        <span className="blueprint-card-corner blueprint-corner-bl">+</span>
        <span className="blueprint-card-corner blueprint-corner-br">+</span>
      </div>

      {/* --- MASSIVE FRAME 03: Mid-Page Spanning Projects & Principles (Hero → Projects → About) --- */}
      <div className="absolute top-[1100px] left-[3%] right-[3%] h-[2200px] border border-[var(--color-border)]/30 dark:border-white/[0.03] light:border-black/[0.04] opacity-60">
        <div className="absolute top-3 right-8 font-mono text-[9px] text-[var(--color-subtle)]/40 tracking-[0.3em]">
          CANVAS_BLUEPRINT_CONTAINER // SPEC_V4
        </div>
        {/* Horizontal Ticks inside Central Architecture */}
        <div className="absolute left-0 top-1/3 w-6 h-px bg-[var(--color-border)]/40" />
        <div className="absolute right-0 top-1/3 w-6 h-px bg-[var(--color-border)]/40" />
        <div className="absolute left-0 top-2/3 w-6 h-px bg-[var(--color-border)]/40" />
        <div className="absolute right-0 top-2/3 w-6 h-px bg-[var(--color-border)]/40" />
        <span className="blueprint-card-corner blueprint-corner-tl">+</span>
        <span className="blueprint-card-corner blueprint-corner-tr">+</span>
        <span className="blueprint-card-corner blueprint-corner-bl">+</span>
        <span className="blueprint-card-corner blueprint-corner-br">+</span>
      </div>

      {/* --- ENORMOUS FRAME 04: Offset Left Frame Spanning Skills & Toolkit --- */}
      <div className="absolute top-[2800px] -left-16 w-[70vw] max-w-[1050px] h-[1800px] border border-[var(--color-border)]/35 dark:border-white/[0.035] light:border-black/[0.04] rotate-[1.2deg] opacity-65">
        <div className="absolute top-4 left-6 font-mono text-[9px] text-[var(--color-subtle)]/40 tracking-[0.25em]">
          TOOLKIT_GRID // SECTION_BOUND_04
        </div>
        <span className="blueprint-card-corner blueprint-corner-tl">+</span>
        <span className="blueprint-card-corner blueprint-corner-tr">+</span>
        <span className="blueprint-card-corner blueprint-corner-bl">+</span>
        <span className="blueprint-card-corner blueprint-corner-br">+</span>
      </div>

      {/* --- ENORMOUS FRAME 05: Lower Page Spanning Contact & Footer --- */}
      <div className="absolute top-[4200px] right-[-10%] w-[80vw] max-w-[1250px] h-[1600px] border border-[var(--color-border)]/35 dark:border-white/[0.035] light:border-black/[0.045] rotate-[-0.8deg] opacity-70">
        <div className="absolute bottom-4 left-6 font-mono text-[9px] text-[var(--color-subtle)]/40 tracking-[0.25em]">
          TERMINAL_BOUND_V0 // END_CANVAS
        </div>
        <span className="blueprint-card-corner blueprint-corner-tl">+</span>
        <span className="blueprint-card-corner blueprint-corner-tr">+</span>
        <span className="blueprint-card-corner blueprint-corner-bl">+</span>
        <span className="blueprint-card-corner blueprint-corner-br">+</span>
      </div>
    </div>
  )
}
