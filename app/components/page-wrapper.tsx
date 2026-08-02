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
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full min-h-screen flex flex-col"
    >
      {children}
    </motion.main>
  )
}
