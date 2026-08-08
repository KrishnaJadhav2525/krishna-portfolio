"use client"

import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <motion.main
      key={pathname}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 flex min-h-screen w-full flex-col"
    >
      {children}
    </motion.main>
  )
}
