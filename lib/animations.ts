import { Variants } from 'framer-motion'

/* Curves — mirrored from the CSS custom properties in global.css */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const
export const EASE_IO = [0.65, 0, 0.35, 1] as const
export const EASE_UI = [0.2, 0, 0, 1] as const

export const VIEWPORT = { once: true, margin: '-15% 0px -10% 0px' } as const

/* --------------------------------------------------------------------------
   Entrances
   -------------------------------------------------------------------------- */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE_OUT } },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
}

export const fadeUpSlow: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: EASE_OUT } },
}

/* Masked type reveal — the line slides up out of an overflow-hidden parent. */
export const maskUp: Variants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.95, ease: EASE_OUT } },
}

export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    opacity: 1,
    transition: { duration: 0.7, ease: EASE_IO },
  },
}

/* --------------------------------------------------------------------------
   Stagger containers
   -------------------------------------------------------------------------- */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
}

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
}

export const staggerSlow: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.16 } },
}

/* Section-level: children reveal 60ms apart per the motion spec. */
export const sectionStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}

/* --------------------------------------------------------------------------
   Scroll-triggered
   -------------------------------------------------------------------------- */
export const inViewFadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
}

export const inViewFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
}

/* Rule / divider draw */
export const lineReveal: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.9, ease: EASE_IO },
  },
}

export const lineRevealY: Variants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 1.1, ease: EASE_IO } },
}

/* --------------------------------------------------------------------------
   Hover
   -------------------------------------------------------------------------- */
export const hoverLift = { y: -2, transition: { duration: 0.24, ease: EASE_UI } }
export const hoverScale = { scale: 1.012, transition: { duration: 0.24, ease: EASE_UI } }

/* Shared-layout indicator spring */
export const indicatorSpring = { type: 'spring', stiffness: 420, damping: 38, mass: 0.9 } as const

/* Page transition */
export const pageEnter: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT, delay: 0.04 } },
}
