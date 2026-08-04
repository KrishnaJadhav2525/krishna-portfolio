'use client';

import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown } from "lucide-react"
import ProjectCarousel from "@/app/components/project-carousel"
import { ContactSection } from "@/app/components/contact-section"
import { Badge } from "@/app/components/ui/badge"
import { ScrambleText } from "@/app/components/scramble-text"
import { StarField } from "@/app/components/star-field"
import {
  lineReveal,
  inViewFadeUp,
  clipReveal
} from "@/lib/animations"

const socialLinks = [
  { href: "https://github.com/KrishnaJadhav2525", label: "GITHUB" },
  { href: "https://x.com/krlshn444", label: "TWITTER" },
  { href: "https://www.linkedin.com/in/krishna-jadhav-a5122a316/", label: "LINKEDIN" },
]

const coreTechnologies = [
  {
    category: "AI & AUTOMATION",
    items: ["LangGraph", "LangChain", "n8n Workflows", "Llama 3.3 70B", "RAG & Pinecone", "Google AI Embeddings", "ONNX Embeddings", "RRF Re-ranking", "Meta Cloud API"]
  },
  {
    category: "FRONTEND & ARCHITECTURE",
    items: ["Next.js 16", "React 18", "Vue.js", "TypeScript", "TailwindCSS", "Framer Motion", "MDX Engine"]
  },
  {
    category: "BACKEND & DATABASES",
    items: ["Node.js", "Express", "Python", "FastAPI", "Flask", "Django", "MongoDB Atlas", "GridFS", "PostgreSQL", "REST APIs"]
  },
  {
    category: "INFRASTRUCTURE & DEVOPS",
    items: ["Docker", "Git & GitHub", "Linux", "Vercel", "FFmpeg / MoviePy", "CI/CD"]
  }
]

const engineeringPrinciples = [
  {
    number: "01",
    title: "ARCHITECTURE OVER HYPE",
    description: "Building systems with clear boundaries, strict type-safety, and production-grade resilience rather than chasing transient tech stack trends."
  },
  {
    number: "02",
    title: "DETERMINISTIC AI & RAG",
    description: "Orchestrating LLMs, vector embeddings, and multi-API pipelines with strict structured outputs and sub-millisecond retrieval."
  },
  {
    number: "03",
    title: "OBSERVABLE & MAINTAINABLE",
    description: "Writing self-documenting code with comprehensive error handling, structured logging, and clean team handoff protocols."
  }
]

export default function Page() {
  const { scrollYProgress } = useScroll()
  const heroParallaxY = useTransform(scrollYProgress, [0, 0.3], [0, -16])

  return (
    <div className="w-full relative z-10">
      {/* 100VH HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden">
        {/* Faint Star Field Overlay */}
        <StarField />

        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 w-full flex-1 flex flex-col justify-center relative z-10">

          {/* 2-Column Asymmetric Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column: Category Tag & Name */}
            <div className="lg:col-span-7 flex flex-col justify-center min-h-[55vh] lg:min-h-[65vh]">

              {/* Accent Label */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-[0.25em] font-medium flex items-center gap-2.5 mb-8 select-none"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-[pulse-dot_2s_ease-in-out_infinite]" />
                <span>01 / FULL-STACK & AI SYSTEMS ENGINEER</span>
              </motion.div>

              {/* Display Name Container with Parallax */}
              <motion.div style={{ y: heroParallaxY }} className="space-y-1">
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <h1 className="metallic-text-shine text-[clamp(4.5rem,12vw,9.5rem)] font-extralight tracking-[-0.05em] leading-[0.88] text-[var(--color-fg)] select-none">
                      <ScrambleText text="Krishna" delay={0.5} duration={1200} />
                    </h1>
                  </motion.div>
                </div>

                <div className="overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <h1 className="metallic-text-shine text-[clamp(4.5rem,12vw,9.5rem)] font-extralight tracking-[-0.05em] leading-[0.88] text-[var(--color-fg)] select-none">
                      <ScrambleText text="Jadhav" delay={0.7} duration={1200} />
                    </h1>
                  </motion.div>
                </div>
              </motion.div>

            </div>

            {/* Thin Vertical Blueprint Line */}
            <div className="hidden lg:block absolute left-[58%] top-24 bottom-24 w-px bg-[var(--divider-major)] pointer-events-none" />

            {/* Right Column: Coordinates & Bio */}
            <div className="lg:col-span-5 space-y-8 lg:pl-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="space-y-8"
              >
                <div className="font-mono text-xs text-[var(--color-subtle)] uppercase tracking-[0.2em] select-none flex items-center justify-between">
                  <span className="text-[var(--color-accent)] font-medium">MUMBAI, IN</span>
                  <span>19.0760° N, 72.8777° E</span>
                </div>

                <p className="text-base text-[var(--color-muted)] leading-[1.7] max-w-[460px]">
                  Crafting high-performance web applications, resilient backend architectures, and intelligent automation systems with Swiss design discipline.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/blog"
                    className="animated-link text-sm font-medium text-[var(--color-fg)] pb-0.5"
                  >
                    Selected Work & Writing →
                  </Link>
                  <span className="text-[var(--color-subtle)] select-none">—</span>
                  <a
                    href="#contact"
                    className="animated-link text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors duration-150 pb-0.5"
                  >
                    Get in touch
                  </a>
                </div>

                <div className="flex items-center gap-6 pt-6 border-t border-[var(--color-border)]">
                  {socialLinks.map(({ href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link-kinetic font-mono text-xs text-[var(--color-muted)] uppercase tracking-[0.15em] font-medium"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>

          <motion.div
            variants={lineReveal}
            initial="hidden"
            animate="visible"
            className="w-full h-px bg-[var(--color-border)] my-8"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex items-center justify-between text-xs font-mono text-[var(--color-subtle)] tracking-[0.2em] uppercase select-none pt-2"
          >
            <div className="flex items-center gap-2 text-[var(--color-muted)]">
              <span>SCROLL</span>
              <ChevronDown size={14} className="animate-bounce text-[var(--color-accent)]" />
            </div>
            <span className="hidden sm:inline text-[10px]">SWISS DESIGN SYSTEM · 2026</span>
          </motion.div>

        </div>
      </section>

      <div className="gradient-divider" aria-hidden="true" />

      {/* FEATURED PROJECTS SECTION */}
      <section id="projects" className="py-24 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            variants={clipReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--color-border)] pb-6"
          >
            <div>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-shimmer mb-2 font-medium">
                02 / SELECTED WORK & CASE STUDIES
              </p>
              <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-normal tracking-[-0.03em] text-[var(--color-fg)]">
                Featured Projects & Systems
              </h2>
            </div>
            <p className="font-mono text-xs text-[var(--color-subtle)] tracking-[0.15em] uppercase">
              13 REPOSITORIES · FULL SPECIFICATIONS
            </p>
          </motion.div>

          <motion.div
            variants={inViewFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <ProjectCarousel />
          </motion.div>
        </div>
      </section>

      <div className="gradient-divider" aria-hidden="true" />

      {/* ENGINEERING PHILOSOPHY & ABOUT SECTION */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            variants={clipReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-16 border-b border-[var(--color-border)] pb-6"
          >
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-shimmer mb-2 font-medium">
              03 / PHILOSOPHY & PROFILE
            </p>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-normal tracking-[-0.03em] text-[var(--color-fg)]">
              Engineering Principles
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engineeringPrinciples.map((item) => (
              <motion.div
                key={item.number}
                variants={inViewFadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="card-hover-glow border border-[var(--color-border)] p-6 bg-[var(--color-surface)]/80 backdrop-blur-md flex flex-col justify-between"
              >
                <span className="blueprint-card-corner blueprint-corner-tl" aria-hidden="true">+</span>
                <span className="blueprint-card-corner blueprint-corner-tr" aria-hidden="true">+</span>
                <span className="blueprint-card-corner blueprint-corner-bl" aria-hidden="true">+</span>
                <span className="blueprint-card-corner blueprint-corner-br" aria-hidden="true">+</span>

                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--color-border)]">
                    <span className="font-mono text-xs text-[var(--color-accent)] tabular-nums font-medium">
                      {item.number}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--color-subtle)] tracking-[0.15em] uppercase">
                      PRINCIPLE
                    </span>
                  </div>
                  <h3 className="font-mono text-xs tracking-[0.15em] uppercase text-[var(--color-fg)] font-medium mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="gradient-divider" aria-hidden="true" />

      {/* CORE TECHNOLOGIES SECTION */}
      <section id="skills" className="py-24 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            variants={clipReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-12 border-b border-[var(--color-border)] pb-6"
          >
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-shimmer mb-2 font-medium">
              04 / TOOLKIT & ARCHITECTURE
            </p>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-normal tracking-[-0.03em] text-[var(--color-fg)]">
              Core Technologies
            </h2>
          </motion.div>

          <motion.div
            variants={inViewFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="card-hover-glow border border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-md p-6 md:p-8"
          >
            <span className="blueprint-card-corner blueprint-corner-tl" aria-hidden="true">+</span>
            <span className="blueprint-card-corner blueprint-corner-tr" aria-hidden="true">+</span>
            <span className="blueprint-card-corner blueprint-corner-bl" aria-hidden="true">+</span>
            <span className="blueprint-card-corner blueprint-corner-br" aria-hidden="true">+</span>

            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--color-border)]">
              <span className="font-mono text-xs text-[var(--color-subtle)] tracking-[0.2em] uppercase select-none">
                TECHNICAL STACK
              </span>
              <span className="font-mono text-xs text-[var(--color-subtle)] uppercase tracking-wider">
                PRIMARY TOOLSET
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreTechnologies.map((techGroup) => (
                <div key={techGroup.category} className="space-y-3">
                  <div className="font-mono text-xs text-[var(--color-subtle)] tracking-[0.15em] uppercase select-none">
                    {techGroup.category}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {techGroup.items.map((tech) => (
                      <Badge key={tech} variant="secondary" className="shimmer-hover">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="gradient-divider" aria-hidden="true" />

      {/* CONTACT SECTION */}
      <section id="contact" className="relative overflow-hidden">
        <div className="relative z-10">
          <ContactSection />
        </div>
      </section>
    </div>
  )
}
