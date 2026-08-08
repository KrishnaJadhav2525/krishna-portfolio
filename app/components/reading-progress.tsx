'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[100] h-px origin-left bg-[var(--fg)]"
      style={{ scaleX }}
    />
  )
}
