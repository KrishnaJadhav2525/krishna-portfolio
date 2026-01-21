"use client"

import { usePathname } from "next/navigation"

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isBlog = pathname.startsWith("/blog")

  return (
    <main
      className={
        isBlog
          ? "" // Blog pages control width themselves
          : "max-w-3xl mx-auto px-6 md:px-0"
      }
    >
      {children}
    </main>
  )
}
