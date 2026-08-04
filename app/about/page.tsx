'use client';

import Link from "next/link"
import { motion } from "framer-motion"
import { ContactSection } from "@/app/components/contact-section"
import { pageEnter, inViewFadeUp } from "@/lib/animations"
import { Container } from "@/app/components/ui/section"

const socialLinks = [
  { href: "https://github.com/KrishnaJadhav2525", label: "GitHub" },
  { href: "https://x.com/krlshn444", label: "Twitter" },
  { href: "https://www.linkedin.com/in/krishna-jadhav-a5122a316/", label: "LinkedIn" },
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

export default function AboutPage() {
  return (
    <motion.main
      variants={pageEnter}
      initial="hidden"
      animate="visible"
      className="w-full pt-32 pb-20 relative z-10 overflow-hidden"
    >
      <Container variant="wide" className="relative z-10">

        {/* BACK LINK */}
        <Link
          href="/"
          className="font-mono text-xs text-[var(--color-subtle)] hover:text-[var(--color-fg)] transition-colors mb-10 inline-block tracking-wider uppercase"
        >
          ← Back to Home
        </Link>

        {/* SECTION 1: STORY / BIOGRAPHY — Wide Desktop 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20 pb-16 border-b border-[var(--color-border)]">

          {/* Left: Headline & Bio Summary */}
          <div className="lg:col-span-5 space-y-6">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-shimmer select-none">
              01 / STORY & PROFILE
            </p>

            <motion.h1
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="metallic-text-shine text-[clamp(2.5rem,6vw,4.5rem)] font-normal tracking-[-0.04em] leading-[0.95] text-[var(--color-fg)] select-none"
            >
              Krishna<br />Jadhav
            </motion.h1>

            <p className="text-[clamp(1rem,1.8vw,1.25rem)] text-[var(--color-muted)] leading-relaxed font-normal">
              Full-Stack Engineer & AI Agent Developer creating reliable web architectures and vector intelligence systems.
            </p>

            <div className="pt-2">
              <Link
                href="/blog"
                className="animated-link text-sm font-medium text-[var(--color-fg)] pb-0.5"
              >
                Read technical blog & research →
              </Link>
            </div>
          </div>

          {/* Right: Detailed Story Paragraphs */}
          <div className="lg:col-span-7 space-y-6 text-base text-[var(--color-muted)] leading-relaxed lg:border-l border-[var(--color-border)] lg:pl-10">
            <p>
              I'm a Full-Stack Engineer and AI Developer who enjoys building software that performs reliably in production.
              Over the past couple of years I've engineered a <span className="text-[var(--color-fg)] font-medium">RAG-powered portfolio with sub-100ms vector retrieval</span>,
              an AI resume matching engine, an autonomous <span className="text-[var(--color-fg)] font-medium">AI video generation pipeline</span> orchestrated via n8n,
              and a fraud detection ML pipeline trained on 6.3M+ records.
            </p>

            <p>
              On the AI side, I work hands-on with <span className="text-[var(--color-fg)] font-medium">LLMs, vector embeddings, RAG, LangChain, and multi-API pipelines</span> —
              integrating Gemini, Pexels, GitHub API, and Pinecone to build systems that operate end-to-end.
              On full-stack development, I build with React/Next.js 16, Django/Flask/Node, and PostgreSQL/MongoDB.
            </p>

            <p>
              I prioritize <span className="text-[var(--color-fg)] font-medium">clean architecture, observable systems, and writing maintainable code</span> —
              and I thrive in engineering teams where software craft and precision matter.
            </p>
          </div>

        </div>

        {/* SECTION 2: ENGINEERING PHILOSOPHY */}
        <motion.div
          variants={inViewFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-20 pb-16 border-b border-[var(--color-border)]"
        >
          <div className="mb-10">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-shimmer mb-2">
              02 / MANIFESTO
            </p>
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-normal text-[var(--color-fg)]">
              Engineering Philosophy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engineeringPrinciples.map((item) => (
              <div key={item.number} className="card-hover-glow border border-[var(--color-border)] p-6 bg-[var(--color-surface)]/80 backdrop-blur-md relative">
                <span className="blueprint-card-corner blueprint-corner-tl" aria-hidden="true">+</span>
                <span className="blueprint-card-corner blueprint-corner-tr" aria-hidden="true">+</span>
                <span className="blueprint-card-corner blueprint-corner-bl" aria-hidden="true">+</span>
                <span className="blueprint-card-corner blueprint-corner-br" aria-hidden="true">+</span>

                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--color-border)]">
                  <span className="font-mono text-[10px] text-[var(--color-subtle)] tabular-nums">
                    {item.number}
                  </span>
                  <span className="font-mono text-[9px] text-[var(--color-subtle)] tracking-[0.15em] uppercase">
                    PRINCIPLE
                  </span>
                </div>
                <h3 className="font-mono text-xs tracking-[0.15em] uppercase text-[var(--color-fg)] font-medium mb-3">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* SECTION 3: FOCUS AREAS & NETWORKS */}
        <motion.div
          variants={inViewFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-8 mb-20 pb-16 border-b border-[var(--color-border)]"
        >
          <div className="card-hover-glow border border-[var(--color-border)] p-8 bg-[var(--color-surface)]/80 backdrop-blur-md relative">
            <span className="blueprint-card-corner blueprint-corner-tl" aria-hidden="true">+</span>
            <span className="blueprint-card-corner blueprint-corner-tr" aria-hidden="true">+</span>
            <span className="blueprint-card-corner blueprint-corner-bl" aria-hidden="true">+</span>
            <span className="blueprint-card-corner blueprint-corner-br" aria-hidden="true">+</span>

            <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-subtle)] mb-6 select-none">
              SPECIALIZED FOCUS AREAS
            </h3>
            <div className="flex flex-wrap gap-2">
              {['AI / Agent Systems', 'Full-Stack Dev', 'Data & ML', 'DevOps & Cloud', 'Vector RAG Search', 'Automation Workflows'].map(tag => (
                <span key={tag} className="font-mono text-[10px] text-[var(--color-muted)] border border-[var(--color-border)] px-3 py-1.5 tracking-wider uppercase shimmer-hover">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="card-hover-glow border border-[var(--color-border)] p-8 bg-[var(--color-surface)]/80 backdrop-blur-md relative">
            <span className="blueprint-card-corner blueprint-corner-tl" aria-hidden="true">+</span>
            <span className="blueprint-card-corner blueprint-corner-tr" aria-hidden="true">+</span>
            <span className="blueprint-card-corner blueprint-corner-bl" aria-hidden="true">+</span>
            <span className="blueprint-card-corner blueprint-corner-br" aria-hidden="true">+</span>

            <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-subtle)] mb-6 select-none">
              NETWORKS & CONNECTIVITY
            </h3>
            <div className="flex flex-col gap-3">
              {socialLinks.map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors uppercase tracking-widest flex items-center justify-between border-b border-[var(--color-border)] pb-2"
                >
                  <span>{label}</span>
                  <span>→</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* SECTION 4 & 5: EXPERIENCE & EDUCATION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">

          {/* EXPERIENCE */}
          <motion.div
            variants={inViewFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="font-mono text-[10px] tracking-[0.15em] uppercase text-shimmer mb-8 select-none">
              03 / CAREER EXPERIENCE
            </h2>
            <div className="space-y-8 border-l border-[var(--color-border)] ml-2 pl-6">

              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 bg-[var(--color-border-strong)]" />
                <h3 className="text-base font-medium text-[var(--color-fg)] mb-1">
                  Database & IT Support
                </h3>
                <p className="font-mono text-[10px] text-[var(--color-subtle)] mb-2 uppercase tracking-wider">
                  Kohinoor Ropes Pvt. Ltd. · May '25 – Aug '25
                </p>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  Optimized MySQL queries for data validation and provided on-site IT infrastructure support, ensuring 99% uptime for critical systems.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 bg-[var(--color-border-strong)]" />
                <h3 className="text-base font-medium text-[var(--color-fg)] mb-1">
                  Business Development Exec
                </h3>
                <p className="font-mono text-[10px] text-[var(--color-subtle)] mb-2 uppercase tracking-wider">
                  Conglomerate Magazine · Aug '24 – Feb '25
                </p>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  Led client requirements gathering and strategic outreach, acting as the technical bridge between clients and the engineering team.
                </p>
              </div>

            </div>
          </motion.div>

          {/* EDUCATION */}
          <motion.div
            variants={inViewFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="font-mono text-[10px] tracking-[0.15em] uppercase text-shimmer mb-8 select-none">
              04 / ACADEMIC CREDENTIALS
            </h2>
            <div className="space-y-8 border-l border-[var(--color-border)] ml-2 pl-6">

              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 bg-[var(--color-border-strong)]" />
                <h3 className="text-base font-medium text-[var(--color-fg)] mb-1">
                  B.Sc. Computer Science
                </h3>
                <p className="font-mono text-[10px] text-[var(--color-subtle)] mb-2 uppercase tracking-wider">
                  Rajarshi Shahu Mahavidyalaya · 2023 – 2026
                </p>
                <p className="text-xs text-[var(--color-muted)]">
                  CGPA: 7.53/10 · Specialized in Data Structures & AI
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 bg-[var(--color-border-strong)]" />
                <h3 className="text-base font-medium text-[var(--color-fg)] mb-1">
                  Higher Secondary (Science)
                </h3>
                <p className="font-mono text-[10px] text-[var(--color-subtle)] mb-2 uppercase tracking-wider">
                  Maharashtra State Board · 2023
                </p>
              </div>

            </div>
          </motion.div>

        </div>

        {/* SECTION 6: CONTACT */}
        <ContactSection />

      </Container>
    </motion.main>
  )
}
