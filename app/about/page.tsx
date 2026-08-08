'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ContactSection } from '@/app/components/contact-section'
import {
  Shell,
  Section,
  SectionHeader,
  MonoLabel,
  MetaRow,
  Reveal,
  Tag,
} from '@/app/components/ui/primitives'
import { maskUp } from '@/lib/animations'

const socialLinks = [
  { href: 'https://github.com/KrishnaJadhav2525', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/krishna-jadhav-a5122a316/', label: 'LinkedIn' },
  { href: 'https://x.com/krlshn444', label: 'Twitter' },
]

const experience = [
  {
    role: 'Database & IT Support',
    org: 'Kohinoor Ropes Pvt. Ltd.',
    period: "May '25 – Aug '25",
    body: 'Optimised MySQL queries for data validation and provided on-site IT infrastructure support for production systems.',
  },
  {
    role: 'Business Development Executive',
    org: 'Conglomerate Magazine',
    period: "Aug '24 – Feb '25",
    body: 'Led client requirements gathering and outreach, acting as the technical bridge between clients and the engineering team.',
  },
]

const education = [
  {
    role: 'B.Sc. Computer Science',
    org: 'Rajarshi Shahu Mahavidyalaya',
    period: '2023 – 2026',
    body: 'CGPA 7.53/10. Coursework focused on data structures, algorithms and artificial intelligence.',
  },
  {
    role: 'Higher Secondary (Science)',
    org: 'Maharashtra State Board',
    period: '2023',
    body: 'Physics, Chemistry, Mathematics and Computer Science.',
  },
]

const capabilities = [
  {
    group: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'C++', 'SQL'],
  },
  {
    group: 'Frontend',
    items: ['React', 'Next.js', 'Vue.js', 'TailwindCSS', 'Framer Motion', 'MDX'],
  },
  {
    group: 'Backend',
    items: ['Node.js', 'Express', 'Flask', 'Django', 'FastAPI', 'REST APIs'],
  },
  {
    group: 'Data',
    items: ['PostgreSQL', 'MongoDB', 'Pinecone', 'GridFS', 'Pandas', 'Scikit-Learn'],
  },
  {
    group: 'AI',
    items: ['LangChain', 'RAG Pipelines', 'Vector Embeddings', 'Groq', 'Gemini', 'ONNX Runtime'],
  },
  {
    group: 'Infrastructure',
    items: ['Docker', 'Git', 'Linux', 'Vercel', 'n8n', 'CI/CD'],
  },
]

const principles = [
  {
    number: '01',
    title: 'Architecture over hype',
    body: 'Systems with clear boundaries, strict typing and production-grade error handling — not whichever stack is trending this quarter.',
  },
  {
    number: '02',
    title: 'Deterministic AI',
    body: 'Language models are components, not magic. Structured outputs, validation, retries and traceable retrieval keep them honest.',
  },
  {
    number: '03',
    title: 'Observable & maintainable',
    body: 'Structured logging, meaningful errors and self-documenting code so the system explains itself when something breaks.',
  },
  {
    number: '04',
    title: 'Finish the last ten percent',
    body: 'Empty states, failure paths, mobile layouts and documentation are part of the work, not an optional follow-up.',
  },
]

function Timeline({ items }: { items: typeof experience }) {
  return (
    <div className="border-t" style={{ borderColor: 'var(--line-2)' }}>
      {items.map((item, i) => (
        <Reveal
          key={item.role}
          delay={i * 0.06}
          className="group relative grid grid-cols-1 gap-3 border-b py-7 md:grid-cols-12 md:gap-6"
          style={{ borderColor: 'var(--line)' }}
        >
          <div className="t-label md:col-span-4">{item.period}</div>
          <div className="md:col-span-8">
            <h3 className="hover-text is-title text-[1.05rem] leading-snug">{item.role}</h3>
            <div className="t-mono mt-1.5 uppercase text-[var(--subtle)]">{item.org}</div>
            <p className="t-body mt-3 max-w-[46ch] text-[0.875rem]">{item.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="relative z-10 w-full">
      {/* ================= MASTHEAD ================= */}
      <header className="relative pb-4 pt-32 sm:pt-40">
        <Shell>
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <Link href="/" className="link-line t-mono uppercase text-[var(--muted)] hover:text-[var(--fg)]">
              <span className="arrow inline-block rotate-180">→</span> Index
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <MonoLabel dot className="text-[var(--fg)]">
                Profile · Full-stack &amp; AI systems engineer
              </MonoLabel>

              <h1 className="t-page mt-8 select-none text-[var(--fg)]">
                {['Krishna', 'Jadhav'].map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-[0.06em]">
                    <motion.span
                      className="block"
                      variants={maskUp}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.12 + i * 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative lg:col-span-5 lg:pl-10"
            >
              <div
                className="absolute -left-px bottom-0 top-1 hidden w-px lg:block"
                style={{ background: 'var(--line)' }}
              />
              <p className="t-lead max-w-[44ch]">
                Building reliable web architectures, automation pipelines and retrieval systems —
                from Mumbai, for teams anywhere.
              </p>
              <div className="mt-8">
                <MetaRow label="Based in">Mumbai, India</MetaRow>
                <MetaRow label="Education">B.Sc. Computer Science</MetaRow>
                <MetaRow label="Working on">AI systems · Full-stack</MetaRow>
              </div>
            </motion.div>
          </div>
        </Shell>
      </header>

      {/* ================= 01 · STORY ================= */}
      <Section id="story" index="01" label="Background" meta="Profile">
        <SectionHeader title="The short version" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-6">
            <p className="t-lead">
              I&rsquo;m a full-stack engineer and AI developer who enjoys building software that
              keeps working after the demo is over.
            </p>
            <p className="t-body mt-6 max-w-[54ch]">
              Over the past couple of years I&rsquo;ve built a portfolio with retrieval-augmented
              semantic search over my own writing, an autonomous video generation pipeline
              orchestrated through n8n, a medical research assistant that fuses results from
              several academic databases, and a resume matching engine built on classical NLP.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-6 lg:pl-10">
            <p className="t-body max-w-[54ch]">
              On the AI side I work hands-on with language models, vector embeddings, retrieval
              pipelines and multi-API orchestration — wiring together providers like Gemini, Groq
              and Pinecone into systems that run end to end rather than demos that run once.
            </p>
            <p className="t-body mt-6 max-w-[54ch]">
              On the product side I build with React and Next.js on the front, Node, Flask and
              Django on the back, and PostgreSQL or MongoDB underneath. I care about clean
              architecture, observable systems and code the next engineer can read without me.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Link href="/blog" className="link-line t-mono uppercase">
                Technical writing <span className="arrow">→</span>
              </Link>
              <Link href="/#projects" className="link-line t-mono uppercase text-[var(--muted)] hover:text-[var(--fg)]">
                Selected projects <span className="arrow">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ================= 02 · EXPERIENCE & EDUCATION ================= */}
      <Section id="experience" tone="raised" index="02" label="Record" meta="2023 — present">
        <SectionHeader title="Experience & education" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <div className="t-label mb-5">Experience</div>
            <Timeline items={experience} />
          </div>
          <div className="lg:col-span-6">
            <div className="t-label mb-5">Education</div>
            <Timeline items={education} />
          </div>
        </div>
      </Section>

      {/* ================= 03 · CAPABILITIES ================= */}
      <Section id="capabilities" index="03" label="Technical capabilities" meta="Primary working set">
        <SectionHeader title="What I work with" />

        <div className="border-t" style={{ borderColor: 'var(--line-2)' }}>
          {capabilities.map((row, i) => (
            <Reveal
              key={row.group}
              delay={i * 0.04}
              className="grid grid-cols-1 gap-4 border-b py-6 md:grid-cols-12 md:gap-8"
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

      {/* ================= 04 · PRINCIPLES ================= */}
      <Section id="principles" tone="raised" index="04" label="Engineering principles" meta="Four rules">
        <SectionHeader title="How I make decisions" />

        <div className="grid grid-cols-1 border-t md:grid-cols-2" style={{ borderColor: 'var(--line-2)' }}>
          {principles.map((p, i) => (
            <Reveal
              key={p.number}
              delay={i * 0.06}
              className="riser group relative border-b p-7 md:odd:border-r lg:p-9"
              style={{ borderColor: 'var(--line)' }}
            >
              <div className="relative">
                <span className="t-label">{p.number}</span>
                <h3 className="t-item hover-text is-title mt-6">{p.title}</h3>
                <p className="t-body mt-4 max-w-[44ch] text-[0.875rem]">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ================= 05 · NETWORKS ================= */}
      <Section id="networks" index="05" label="Elsewhere" meta="External">
        <SectionHeader title="Find me" />

        <div className="border-t" style={{ borderColor: 'var(--line-2)' }}>
          {socialLinks.map(({ href, label }, i) => (
            <Reveal
              key={label}
              delay={i * 0.05}
              className="border-b"
              style={{ borderColor: 'var(--line)' }}
            >
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="riser group relative flex items-baseline justify-between gap-6 px-4 py-6"
              >
                <span className="hover-text is-title relative text-[1.05rem] transition-transform duration-500 group-hover:translate-x-1">
                  {label}
                </span>
                <span className="t-mono relative uppercase text-[var(--subtle)] transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      <ContactSection />
    </div>
  )
}
