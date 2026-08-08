import "./global.css"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import Navbar from "./components/nav"
import Footer from "./components/footer"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { baseUrl } from "./blog/lib/site"
import Script from "next/script"
import { ThemeProvider } from "./components/theme-provider"
import { SiteBackground, ConstructionRails } from "./components/background/site-background"

import PageWrapper from "./components/page-wrapper"
import ChatWidget from "./components/chat-widget"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Krishna | Full Stack & AI Systems Engineer",
    template: "%s | Krishna",
  },
  description: "Personal portfolio of Krishna, a Full Stack Engineer & AI Agent Developer specializing in Vector RAG, System Architectures, and Autonomous Automation Pipelines.",
  openGraph: {
    title: "Krishna | Full Stack & AI Systems Engineer",
    description: "Personal portfolio of Krishna, a Full Stack Engineer & AI Agent Developer specializing in Vector RAG, System Architectures, and Autonomous Automation Pipelines.",
    url: baseUrl,
    siteName: "Krishna Portfolio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Krishna",
    card: "summary_large_image",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Krishna",
    "url": baseUrl,
    "jobTitle": "Full Stack Developer",
    "sameAs": [
      "https://github.com/krishna-jadhav",
    ]
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        {/* Anti-FOUC: apply saved theme before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('theme');
                if (t === 'light') document.documentElement.classList.add('light');
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="relative flex min-h-screen flex-col antialiased">
        {/* JSON-LD for SEO */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <ThemeProvider>
          {/* Global blueprint background stack (DESIGN.md §5) */}
          <SiteBackground />
          <ConstructionRails />

          <Navbar />

          <PageWrapper>
            {children}
            <Footer />
          </PageWrapper>

          <ChatWidget />
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
