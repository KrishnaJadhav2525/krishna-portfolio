'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import ProjectsIndex, { projects } from '@/app/components/projects'
import { ContactSection } from '@/app/components/contact-section'
import {
  Shell,
  Section,
  SectionHeader,
  MonoLabel,
  MetaRow,
  Reveal,
  Tag,
  Rule,
} from '@/app/components/ui/primitives'
import { VIEWPORT, maskUp } from '@/lib/animations'
import type { BlogPost } from '@/app/blog/lib/get-posts'

const socialLinks = [
  { href: 'https://github.com/KrishnaJadhav2525', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/krishna-jadhav-a5122a316/', label: 'LinkedIn' },
  { href: 'https://x.com/krlshn444', label: 'Twitter' },
]

const capabilities = [
  {
    index: '01',
    title: 'Full-Stack Engineering',
    body: 'Next.js and React front-ends over Node, Express, Flask and Django services, with PostgreSQL and MongoDB behind them.',
  },
  {
    index: '02',
    title: 'AI & Automation',
    body: 'Retrieval-augmented systems, vector search and multi-API agent pipelines orchestrated with n8n and hosted LLM providers.',
  },
  {
    index: '03',
    title: 'Data & Machine Learning',
    body: 'Embedding pipelines, classical NLP models and exploratory analysis in Python, from notebook to deployed service.',
  },
  {
    index: '04',
    title: 'Open Source',
    body: 'Public repositories for every project below — virtualised React components, CLI tooling and automation workflows.',
  },
]

const principles = [
  {
    number: '01',
    title: 'Architecture over hype',
    body: 'Clear boundaries, strict types and production-grade error handling instead of chasing transient stacks.',
  },
  {
    number: '02',
    title: 'Deterministic AI',
    body: 'LLMs, embeddings and multi-API pipelines wrapped in structured outputs, validation and retries.',
  },
  {
    number: '03',
    title: 'Observable & maintainable',
    body: 'Self-documenting code, structured logging and handoff notes so the next engineer is never guessing.',
  },
]

const stack = [
  {
    group: 'AI & Automation',
    items: ['LangChain', 'LangGraph', 'n8n', 'Pinecone', 'Google AI Embeddings', 'ONNX Runtime', 'Groq', 'Gemini'],
  },
  {
    group: 'Frontend',
    items: ['TypeScript', 'React', 'Next.js', 'Vue.js', 'TailwindCSS', 'Framer Motion', 'MDX'],
  },
  {
    group: 'Backend & Data',
    items: ['Node.js', 'Express', 'Python', 'FastAPI', 'Flask', 'Django', 'PostgreSQL', 'MongoDB'],
  },
  {
    group: 'Infrastructure',
    items: ['Docker', 'Git', 'Linux', 'Vercel', 'FFmpeg', 'CI/CD'],
  },
]

export default function HomeView({ posts }: { posts: BlogPost[] }) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, (v) => (reduce ? 0 : v * -0.08))
  const heroFade = useTransform(scrollY, [0, 520], [1, 0])

  const latest = posts.slice(0, 4)

  return (
    <div className="relative z-10 w-full">
      {/* ==================================================================
          HERO
          ================================================================== */}
      <section
        id="hero"
        className="relative flex min-h-[100svh] flex-col justify-between pb-10 pt-28 sm:pt-32"
      >
        <Shell className="flex flex-1 flex-col justify-center">
          <motion.div style={{ y: heroY }} className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left — identity */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mb-8"
              >
                <MonoLabel dot className="text-[var(--fg)]">
                  Full-stack &amp; AI systems engineer
                </MonoLabel>
              </motion.div>

              <h1 className="t-display select-none text-[var(--fg)]">
                {['Krishna', 'Jadhav'].map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-[0.06em]">
                    <motion.span
                      className="block"
                      variants={maskUp}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className={i === 0 ? 'sheen-idle' : undefined}>{line}</span>
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.62, duration: 0.7 }}
                className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
              >
                <a href="#projects" className="link-line t-mono uppercase">
                  Selected projects <span className="arrow">↓</span>
                </a>
                <a
                  href="#contact"
                  className="link-line t-mono uppercase text-[var(--muted)] hover:text-[var(--fg)]"
                >
                  Get in touch <span className="arrow">→</span>
                </a>
              </motion.div>
            </div>

            {/* Right — specification block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative lg:col-span-5 lg:pl-10"
            >
              <div
                className="absolute -left-px bottom-0 top-0 hidden w-px lg:block"
                style={{ background: 'var(--line)' }}
              />

              <p className="t-lead max-w-[46ch]">
                I build web applications, backend services and automation systems — and the
                retrieval pipelines that make them useful.
              </p>

              <div className="mt-9">
                <MetaRow label="Location">Mumbai, India</MetaRow>
                <MetaRow label="Coordinates">19.0760° N · 72.8777° E</MetaRow>
                <MetaRow label="Focus">AI systems · Full-stack</MetaRow>
                <MetaRow label="Repositories">{projects.length} public projects</MetaRow>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
                {socialLinks.map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="t-mono hover-text uppercase"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </Shell>

        {/* Bottom rail */}
        {/* Outer element owns the scroll-linked fade; inner owns the entrance,
            so the two never fight over the same opacity value. */}
        <motion.div style={{ opacity: heroFade }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Rule animate={false} />
            <Shell className="flex items-center justify-between py-4">
              <span className="t-label flex items-center gap-2">
                Scroll
                <motion.span
                  animate={reduce ? undefined : { y: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-block"
                >
                  ↓
                </motion.span>
              </span>
              <span className="t-label hidden sm:inline">Index · Projects · Profile · Writing</span>
              <span className="t-label">{new Date().getFullYear()}</span>
            </Shell>
          </motion.div>
        </motion.div>
      </section>

      {/* ==================================================================
          01 · CAPABILITIES
          ================================================================== */}
      <Section id="capabilities">
        <SectionHeader
          index="01"
          label="Capabilities"
          title="What I work on"
          meta="Four practice areas"
        />

        <div className="grid grid-cols-1 border-t sm:grid-cols-2 lg:grid-cols-4" style={{ borderColor: 'var(--line-2)' }}>
          {capabilities.map((c, i) => (
            <Reveal
              key={c.index}
              delay={i * 0.06}
              className="group relative border-b p-7 transition-colors duration-300 sm:border-r lg:p-8"
              style={{ borderColor: 'var(--line)' }}
            >
              <span
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'color-mix(in srgb, var(--surface) 60%, transparent)' }}
              />
              <div className="relative">
                <span className="t-label">{c.index}</span>
                <h3 className="t-item hover-text is-title mt-6">{c.title}</h3>
                <p className="t-body mt-4 text-[0.875rem]">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ==================================================================
          02 · PROJECTS
          ================================================================== */}
      <Section id="projects">
        <SectionHeader
          index="02"
          label="Selected projects"
          title="Systems, pipelines and interfaces"
          meta={`${projects.length} public repositories`}
          lead="Each entry links to its live deployment where one exists, its source, and a written case study covering architecture, problem and approach."
        />
        <ProjectsIndex />
      </Section>

      {/* ==================================================================
          03 · PROFILE
          ================================================================== */}
      <Section id="about">
        <SectionHeader index="03" label="Profile" title="How I work" meta="Engineering principles" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <p className="t-lead">
              I&rsquo;m a full-stack engineer and AI developer. Most of what I build sits at the
              seam between an interface and a system that has to keep running without me watching
              it.
            </p>
            <p className="t-body mt-6 max-w-[52ch]">
              That means retrieval pipelines that stay correct, workflow automations that recover
              from failure, and front-ends that hold up under real data. I care about clean
              boundaries and about code the next person can read.
            </p>
            <div className="mt-8">
              <Link href="/about" className="link-line t-mono uppercase">
                Read the full profile <span className="arrow">→</span>
              </Link>
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border-t" style={{ borderColor: 'var(--line-2)' }}>
              {principles.map((p, i) => (
                <Reveal
                  key={p.number}
                  delay={i * 0.06}
                  className="group grid grid-cols-12 gap-4 border-b py-7"
                  style={{ borderColor: 'var(--line)' }}
                >
                  <span className="t-label col-span-2">{p.number}</span>
                  <div className="col-span-10">
                    <h3 className="hover-text is-title text-[1.05rem] leading-snug">{p.title}</h3>
                    <p className="t-body mt-2 text-[0.875rem]">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ==================================================================
          04 · STACK
          ================================================================== */}
      <Section id="stack">
        <SectionHeader
          index="04"
          label="Core technologies"
          title="The toolset"
          meta="Primary working set"
        />

        <div className="border-t" style={{ borderColor: 'var(--line-2)' }}>
          {stack.map((row, i) => (
            <Reveal
              key={row.group}
              delay={i * 0.05}
              className="grid grid-cols-1 gap-4 border-b py-7 md:grid-cols-12 md:gap-8"
              style={{ borderColor: 'var(--line)' }}
            >
              <div className="t-label md:col-span-3 lg:col-span-2">{row.group}</div>
              <div className="flex flex-wrap gap-1.5 md:col-span-9 lg:col-span-10">
                {row.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ==================================================================
          05 · WRITING
          ================================================================== */}
      <Section id="writing">
        <SectionHeader
          index="05"
          label="Writing & work"
          title="Notes from the build"
          meta={`${posts.length} articles`}
        />

        <ul className="border-t" style={{ borderColor: 'var(--line-2)' }}>
          {latest.map((post, i) => (
            <motion.li
              key={post.slug}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.65, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group border-b"
              style={{ borderColor: 'var(--line)' }}
            >
              <Link href={`/blog/${post.slug}`} className="relative block py-7">
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: 'color-mix(in srgb, var(--surface) 55%, transparent)' }}
                />
                <div className="relative grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
                  <span className="t-label md:col-span-2">{post.date}</span>
                  <div className="md:col-span-7">
                    <h3 className="hover-text is-title text-[1.05rem] leading-snug transition-transform duration-500 group-hover:translate-x-1">
                      {post.title}
                    </h3>
                    <p className="t-body mt-2 line-clamp-2 max-w-[58ch] text-[0.875rem]">
                      {post.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-start gap-1.5 md:col-span-3 md:justify-end">
                    {post.tags.slice(0, 2).map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="pt-8">
          <Link href="/blog" className="link-line t-mono uppercase">
            All writing &amp; work <span className="arrow">→</span>
          </Link>
        </div>
      </Section>

      {/* ==================================================================
          06 · CONTACT
          ================================================================== */}
      <ContactSection />
    </div>
  )
}
