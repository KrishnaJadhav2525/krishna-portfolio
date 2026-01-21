import "./global.css"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import Navbar from "./components/nav"
import Footer from "./components/footer"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { baseUrl } from "./sitemap"
import PageWrapper from "./components/page-wrapper"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Krishna",
  description: "Personal portfolio",
}

const cx = (...classes: string[]) => classes.filter(Boolean).join(" ")

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        "bg-black text-white",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased">
        {/* NAVBAR — FULL WIDTH */}
        <div className="px-6 md:px-12">
          <Navbar />
        </div>

        {/* PAGE CONTENT (WIDTH CONTROLLED INSIDE) */}
        <PageWrapper>
          {children}
          <Footer />
        </PageWrapper>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
