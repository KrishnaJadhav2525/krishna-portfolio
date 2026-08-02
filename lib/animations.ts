import { Variants } from 'framer-motion'

// Entry animations
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
}

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
}

export const fadeUpSlow: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
}

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }
}

export const clipReveal: Variants = {
  hidden:  { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
  visible: { clipPath: 'inset(0 0% 0 0)',   opacity: 1,
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }
}

// Stagger containers
export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } }
}

export const staggerFast: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } }
}

export const staggerSlow: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
}

// Hover states
export const hoverLift = {
  y: -2,
  transition: { duration: 0.2, ease: 'easeOut' }
}

export const hoverScale = {
  scale: 1.015,
  transition: { duration: 0.2, ease: 'easeOut' }
}

// Scroll-triggered
export const inViewFadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
}

export const inViewFadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' } }
}

// Line / divider reveal
export const lineReveal: Variants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, originX: 0,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
}

// Page transition
export const pageEnter: Variants = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.05 } }
}
