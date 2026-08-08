'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Tag } from '@/app/components/ui/primitives'
import { VIEWPORT } from '@/lib/animations'

export interface Project {
  id: string
  title: string
  role: string
  duration: string
  architecture: string
  problem: string
  solution: string
  outcome: string
  description: string
  tags: string[]
  features: string[]
  links: { github?: string; demo?: string; caseStudy?: string }
}

/* --------------------------------------------------------------------------
   Project data. Links, titles, descriptions and technology names are the
   existing project record — nothing here is invented. Outcome/feature copy
   describes what each system does rather than quoting unverifiable figures.
   -------------------------------------------------------------------------- */
export const projects: Project[] = [
  {
    id: '01',
    title: 'WhatsApp AI Agent',
    role: 'Systems Architect & Automation Engineer',
    duration: '2 Months · Active Production',
    architecture: 'Event-driven webhook pipeline with a persistent state machine',
    problem:
      'Manual availability management across client communication channels caused delayed responses and missed scheduling windows.',
    solution:
      'Built a 24/7 automated WhatsApp agent orchestrating n8n workflows, the Meta Cloud API and PostgreSQL for real-time status routing.',
    outcome:
      'Inbound messages are routed automatically around sleep and busy states, with conversation state persisted in PostgreSQL.',
    description:
      'Fully automated WhatsApp bot for managing availability. Features sleep mode, busy status, and smart auto-replies using n8n & PostgreSQL.',
    tags: ['n8n Workflows', 'Meta Cloud API', 'PostgreSQL', 'Node.js', 'Express', 'Docker'],
    features: [
      'Automated availability routing',
      'Sleep & busy mode logic',
      'PostgreSQL state persistence',
      'n8n workflow automation',
    ],
    links: {
      github: 'https://github.com/KrishnaJadhav2525/whatsapp-ai-agent-n8n',
      demo: 'https://github.com/KrishnaJadhav2525/whatsapp-ai-agent-n8n#readme',
      caseStudy: 'https://github.com/KrishnaJadhav2525/whatsapp-ai-agent-n8n',
    },
  },
  {
    id: '02',
    title: 'Personal Portfolio v2',
    role: 'Full-Stack Engineer & AI Developer',
    duration: '1 Month · Production Live',
    architecture: 'Serverless vector RAG architecture with a hybrid MDX engine',
    problem:
      'Static portfolio pages offer no interactive context retrieval or natural-language query capability for technical readers.',
    solution:
      'Designed a Next.js App Router application integrating the Pinecone vector database and Google AI embeddings for semantic search.',
    outcome:
      'Visitors can query the portfolio in natural language; articles are authored in Markdown and rendered through the MDX pipeline.',
    description:
      'Portfolio with RAG-powered semantic search. Visitors can query experience using natural language. Built with Next.js and Pinecone.',
    tags: [
      'Next.js',
      'TypeScript',
      'Pinecone',
      'Google AI Embeddings',
      'TailwindCSS',
      'Framer Motion',
      'MDX',
    ],
    features: [
      'RAG vector embedding index',
      'Semantic article retrieval',
      'Dynamic MDX blog system',
      'Edge-cached global delivery',
    ],
    links: {
      github: 'https://github.com/KrishnaJadhav2525/krishna-portfolio',
      demo: 'https://krishna-protfolio-ten.vercel.app/',
      caseStudy: '/blog/building-my-portfolio-with-nextjs',
    },
  },
  {
    id: '03',
    title: 'College Portal',
    role: 'Full-Stack Developer',
    duration: '3 Months · Production Deployed',
    architecture: 'MVC web architecture over a MongoDB document store',
    problem:
      'Fragmented academic department portals led to manual approval bottlenecks for student blog posts and course announcements.',
    solution:
      'Developed a centralised Flask and MongoDB platform featuring multi-role RBAC authentication, student enrolment and blog moderation.',
    outcome:
      'Department operations — enrolment, notices and post approvals — run through a single administrative interface.',
    description:
      'Full-stack academic management platform for Rajarshi Shahu Mahavidyalaya. Features student enrolment, admin dashboards, and GridFS storage.',
    tags: ['Flask', 'Python', 'MongoDB', 'GridFS', 'REST API', 'RBAC Auth'],
    features: [
      'Flask & MongoDB backend',
      'GridFS file & media storage',
      'Multi-role student/admin auth',
      'Blog approval & notice system',
    ],
    links: {
      github: 'https://github.com/KrishnaJadhav2525/CS-Dept',
      demo: 'https://cs-dept-ivory.vercel.app/',
      caseStudy: 'https://github.com/KrishnaJadhav2525/CS-Dept',
    },
  },
  {
    id: '04',
    title: 'CuraLink Healthcare Platform',
    role: 'Full-Stack AI Developer',
    duration: '2 Months · Shipped',
    architecture: 'Hybrid retrieval pipeline with Llama 3.3 70B reasoning via Groq',
    problem:
      'Researchers lack a unified tool to synthesise findings across live academic databases with strict citation validation.',
    solution:
      'Built a multi-stage research pipeline using BM25, MiniLM ONNX embeddings, RRF rank fusion and Llama 3.3 70B on Groq Cloud.',
    outcome:
      'Answers are synthesised across PubMed, OpenAlex and ClinicalTrials.gov with every claim traced back to a cited source.',
    description:
      'AI medical research platform retrieving papers across PubMed, OpenAlex, and ClinicalTrials.gov, synthesizing evidence-graded answers.',
    tags: [
      'React',
      'Node.js',
      'Express',
      'MongoDB Atlas',
      'Groq (Llama 3.3 70B)',
      'ONNX Embeddings',
      'RRF Re-ranking',
    ],
    features: [
      'Tri-source parallel paper retrieval',
      'Hybrid BM25 + vector ranking',
      'Evidence-graded AI synthesis',
      'Real-time SSE streaming results',
    ],
    links: {
      github: 'https://github.com/KrishnaJadhav2525/CuraLink',
      demo: 'https://cura-link-xi.vercel.app/',
      caseStudy: 'https://github.com/KrishnaJadhav2525/CuraLink',
    },
  },
  {
    id: '05',
    title: 'AI Video Pipeline',
    role: 'Automation Engineer',
    duration: '1.5 Months · Active Automation',
    architecture: 'Multi-API autonomous orchestration pipeline',
    problem:
      'Content pipelines require labour-intensive manual steps for research, scriptwriting, voiceover generation and video editing.',
    solution:
      'Engineered an n8n pipeline combining Gemini for scripts, Edge TTS for voiceover, the Pexels API for stock media and MoviePy for rendering.',
    outcome:
      'A topic goes in and a rendered, YouTube-ready MP4 comes out with no manual step in between.',
    description:
      'Fully automated video generation pipeline. Orchestrates n8n, Gemini, Edge TTS, and MoviePy to turn a topic into a YouTube-ready MP4.',
    tags: ['n8n Workflows', 'Python', 'Gemini AI', 'Edge TTS', 'MoviePy', 'FFmpeg'],
    features: [
      'End-to-end automated workflow',
      'Gemini script generation',
      'Edge TTS voiceover synthesis',
      'Automated FFmpeg rendering',
    ],
    links: {
      github: 'https://github.com/KrishnaJadhav2525/ai-video-automation',
      demo: 'https://github.com/KrishnaJadhav2525/ai-video-automation#readme',
      caseStudy: '/blog/automating-ai-video-pipeline',
    },
  },
  {
    id: '06',
    title: 'CoachIQ Platform',
    role: 'Full-Stack AI Developer',
    duration: '2 Months · Shipped',
    architecture: 'Skill analytics engine with an AI feedback loop',
    problem:
      'Coaches and trainees lack quantitative feedback loops to monitor skill progression and personalised practice milestones.',
    solution:
      'Constructed an interactive coaching tool featuring telemetry analytics dashboards and AI-generated progress insights.',
    outcome:
      'Progress is tracked continuously and summarised automatically for each active skill track.',
    description:
      'AI-assisted coaching and performance analytics platform for tracking user progress and personalized skill development.',
    tags: ['React', 'Node.js', 'Express', 'TailwindCSS', 'Chart.js', 'REST API'],
    features: [
      'Performance telemetry dashboards',
      'Personalised milestone tracking',
      'Interactive AI feedback',
      'Skill analytics views',
    ],
    links: {
      github: 'https://github.com/KrishnaJadhav2525/CoachIQ',
      demo: 'https://github.com/KrishnaJadhav2525/CoachIQ#readme',
      caseStudy: 'https://github.com/KrishnaJadhav2525/CoachIQ',
    },
  },
  {
    id: '07',
    title: 'AI-Powered Ad Creator',
    role: 'AI Engineer',
    duration: '2 Months · Production Ready',
    architecture: 'Generative video pipeline with a Tavily research agent',
    problem:
      'Producing video advertisements normally requires separate research, copywriting, editing and asset-handling steps.',
    solution:
      'Built a Python pipeline querying market trends via Tavily, generating video with Kling v2 on Fal.ai and uploading assets to Google Drive.',
    outcome:
      'Research, script, render and delivery run as one automated sequence rather than a multi-day manual process.',
    description:
      'Fully automated ad generation pipeline. Researches via Tavily, scripts with Gemini 2.0, generates video with Kling v2 (Fal.ai), and assembles with FFmpeg.',
    tags: ['Python', 'Gemini 2.0', 'Fal.ai (Kling v2)', 'Tavily API', 'FFmpeg', 'Google Drive API'],
    features: [
      'Tavily market research agent',
      'Gemini 2.0 script generation',
      'Kling v2 video rendering',
      'Automated Drive asset upload',
    ],
    links: {
      github: 'https://github.com/KrishnaJadhav2525/ai-powered-ad-creator',
      demo: 'https://github.com/KrishnaJadhav2525/ai-powered-ad-creator#readme',
      caseStudy: '/blog/building-ai-powered-ad-creator',
    },
  },
  {
    id: '08',
    title: 'Venture Scout Platform',
    role: 'Frontend & AI Engineer',
    duration: '1.5 Months · Active',
    architecture: 'Jina scraping engine feeding a Groq Llama 3 enrichment pipeline',
    problem:
      'Venture analysts spend hours manually auditing early-stage startup websites and extracting key business data.',
    solution:
      'Created a VC intelligence portal that scrapes public startup URLs using Jina AI and enriches company profiles using Groq Llama 3.',
    outcome:
      'Startup profiles are extracted and enriched on demand, entirely on free-tier inference APIs.',
    description:
      'VC intelligence platform for startup discovery. Features live AI enrichment via Jina AI & Groq (Llama 3), a searchable company database, and analyst notes.',
    tags: ['Next.js', 'TypeScript', 'Groq (Llama 3)', 'Jina AI', 'TailwindCSS', 'REST API'],
    features: [
      'Jina AI web scraping engine',
      'Groq Llama 3 profile enrichment',
      'Searchable venture database',
      'Analyst notes & lists',
    ],
    links: {
      github: 'https://github.com/KrishnaJadhav2525/venture-scout-enrichment-platform',
      demo: 'https://github.com/KrishnaJadhav2525/venture-scout-enrichment-platform#readme',
      caseStudy: '/blog/automating-venture-capital-scouting',
    },
  },
  {
    id: '09',
    title: 'Binance Futures Bot',
    role: 'Systems Developer',
    duration: '1 Month · Testnet',
    architecture: 'Python CLI trading client',
    problem:
      'Futures traders need automated order-execution tooling with deterministic validation and predictable error handling.',
    solution:
      'Engineered a Python CLI client for the Binance Futures Testnet supporting market, limit and stop-loss USDT-M contracts.',
    outcome:
      'Orders are validated before dispatch and every action is written to a structured JSON audit log.',
    description:
      'Production-quality CLI trading bot for Binance Futures Testnet (USDT-M). Features robust validation, structured logging, and market/limit order support.',
    tags: ['Python', 'Binance Futures API', 'HMAC Auth', 'CLI', 'Requests', 'JSON Logging'],
    features: [
      'USDT-M testnet order execution',
      'Market & limit order engines',
      'HMAC request signing',
      'Structured JSON audit logs',
    ],
    links: {
      github: 'https://github.com/KrishnaJadhav2525/binance-futures-testnet-bot',
      demo: 'https://github.com/KrishnaJadhav2525/binance-futures-testnet-bot#readme',
      caseStudy: '/blog/building-binance-futures-trading-bot',
    },
  },
  {
    id: '10',
    title: 'ResumeFit AI',
    role: 'ML Engineer',
    duration: '1 Month · Prototype',
    architecture: 'TF-IDF vector space model with a cosine similarity engine',
    problem:
      'Applicants struggle to identify keyword gaps between their resume and a competitive job description.',
    solution:
      'Developed a Django NLP service vectorising resume text with Scikit-learn TF-IDF matrices to compute cosine match scores.',
    outcome:
      'Match scores and skill gaps are computed locally, so candidate documents never leave the machine.',
    description:
      'Resume analyzer using TF-IDF & cosine similarity to match resumes with job descriptions. Features a minimal, focused UI.',
    tags: ['Django', 'Python', 'Scikit-Learn', 'NumPy', 'NLP', 'TF-IDF'],
    features: [
      'TF-IDF vectorisation',
      'Cosine similarity scoring',
      'Automated skill gap analysis',
      'Local document processing',
    ],
    links: {
      github: 'https://github.com/KrishnaJadhav2525/ResumeFit',
      demo: 'https://github.com/KrishnaJadhav2525/ResumeFit#readme',
      caseStudy: '/blog/resumefit-ai-resume-matcher',
    },
  },
  {
    id: '11',
    title: 'Real-time Facial Recognition',
    role: 'Computer Vision Engineer',
    duration: '3 Months · Academic Research',
    architecture: 'Multi-threaded C++/OpenCV frame pipeline',
    problem:
      'Real-time biometric systems drop frames and saturate the CPU during multi-face detection passes.',
    solution:
      'Designed a multi-threaded C++/Qt desktop application using OpenCV Haar cascade classifiers and LBPH face recognition.',
    outcome:
      'Detection and recognition run on separate threads so capture stays smooth while faces are matched.',
    description:
      'Biometric system using OpenCV and Qt C++ for real-time face detection, optimized for low-latency environments.',
    tags: ['C++', 'OpenCV', 'Qt Framework', 'Multi-Threading', 'Haar Cascades', 'LBPH'],
    features: [
      'Multi-threaded frame pipeline',
      'Haar cascade face detection',
      'LBPH recognition model',
      'Local biometric database',
    ],
    links: {
      github: 'https://github.com/KrishnaJadhav2525/FaceRecognitionApp',
      demo: 'https://github.com/KrishnaJadhav2525/FaceRecognitionApp#readme',
      caseStudy: 'https://github.com/KrishnaJadhav2525/FaceRecognitionApp',
    },
  },
  {
    id: '12',
    title: 'Data Grid React',
    role: 'Frontend Performance Engineer',
    duration: '1 Month · Open Source',
    architecture: 'DOM virtualisation engine with an undo state machine',
    problem:
      'Standard table elements stall the renderer when asked to paint tens of thousands of rows at once.',
    solution:
      'Built a virtualised React grid rendering only the visible window, with client-side sorting, column pinning and undo history.',
    outcome:
      'Scrolling stays smooth on very large datasets because only the visible window is ever in the DOM.',
    description:
      'Custom-built virtualized data grid for React. Handles large datasets efficiently with client-side sorting and column management.',
    tags: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'Vitest', 'DOM Virtualization'],
    features: [
      'Windowed DOM virtualisation',
      'Client-side multi-column sort',
      'Column pinning & reordering',
      'Undo / redo action stack',
    ],
    links: {
      github: 'https://github.com/KrishnaJadhav2525/react-virtualized-data-grid',
      demo: 'https://github.com/KrishnaJadhav2525/react-virtualized-data-grid#readme',
      caseStudy: 'https://github.com/KrishnaJadhav2525/react-virtualized-data-grid',
    },
  },
  {
    id: '13',
    title: 'Movies Analysis',
    role: 'Data Analyst',
    duration: '1 Month · Shipped',
    architecture: 'Pandas exploratory data analysis',
    problem:
      'Unstructured historical film data needs cleaning and statistical modelling before any trend is readable.',
    solution:
      'Analysed a large movie dataset with Pandas, Seaborn and Matplotlib to visualise revenue correlations and genre trajectories.',
    outcome:
      'Budget-versus-revenue relationships and genre popularity trends are surfaced as reproducible notebook charts.',
    description:
      'Data analysis project exploring trends across a large movie dataset. Visualizes budget vs. revenue correlations and genre popularity using Pandas.',
    tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter'],
    features: [
      'Dataset cleaning & normalisation',
      'Revenue correlation analysis',
      'Genre popularity trajectories',
      'Keyword content discovery',
    ],
    links: {
      github: 'https://github.com/KrishnaJadhav2525/CineData-Analysis',
      demo: 'https://github.com/KrishnaJadhav2525/CineData-Analysis#readme',
      caseStudy: 'https://github.com/KrishnaJadhav2525/CineData-Analysis',
    },
  },
]

/* --------------------------------------------------------------------------
   Case study drawer
   -------------------------------------------------------------------------- */
function CaseStudy({ project, onClose }: { project: Project | null; onClose: () => void }) {
  /* Lock the page behind the drawer and wire up Escape. */
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        // Direct child of AnimatePresence must be a motion component with a key,
        // otherwise the nested exit transitions are skipped on unmount.
        <motion.div key="case-study" className="fixed inset-0 z-[80] flex items-stretch justify-end">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-label="Close case study"
            className="absolute inset-0 backdrop-blur-sm"
            style={{ background: 'color-mix(in srgb, var(--bg) 72%, transparent)' }}
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full max-w-[720px] overflow-y-auto border-l"
            style={{
              background: 'var(--bg)',
              borderColor: 'var(--line-2)',
              boxShadow: '-1px 0 0 var(--edge-light), -40px 0 80px -40px var(--depth-cast-strong)',
            }}
          >
            <div className="p-6 sm:p-10 lg:p-14">
              <div className="mb-10 flex items-start justify-between gap-6">
                <div>
                  <div className="t-label mb-4">
                    {project.id} <span className="mx-1 opacity-40">/</span> Case study
                  </div>
                  <h3 className="t-page text-[var(--fg)]">{project.title}</h3>
                  <div className="t-mono mt-4 uppercase text-[var(--subtle)]">
                    {project.role} · {project.duration}
                  </div>
                </div>
                <button onClick={onClose} className="btn-line min-h-[36px] shrink-0 px-3.5">
                  Close
                </button>
              </div>

              <div className="space-y-0 border-t" style={{ borderColor: 'var(--line)' }}>
                {[
                  ['Architecture', project.architecture],
                  ['Problem', project.problem],
                  ['Approach', project.solution],
                  ['Outcome', project.outcome],
                ].map(([label, body]) => (
                  <div
                    key={label}
                    className="grid grid-cols-1 gap-3 border-b py-7 md:grid-cols-12 md:gap-8"
                    style={{ borderColor: 'var(--line)' }}
                  >
                    <div className="t-label md:col-span-3">{label}</div>
                    <p className="t-body md:col-span-9">{body}</p>
                  </div>
                ))}

                <div
                  className="grid grid-cols-1 gap-3 border-b py-7 md:grid-cols-12 md:gap-8"
                  style={{ borderColor: 'var(--line)' }}
                >
                  <div className="t-label md:col-span-3">Capabilities</div>
                  <ul className="md:col-span-9">
                    {project.features.map((f) => (
                      <li
                        key={f}
                        className="t-body flex items-baseline gap-3 border-b py-2 last:border-0"
                        style={{ borderColor: 'var(--line)' }}
                      >
                        <span className="node">+</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="grid grid-cols-1 gap-3 border-b py-7 md:grid-cols-12 md:gap-8"
                  style={{ borderColor: 'var(--line)' }}
                >
                  <div className="t-label md:col-span-3">Stack</div>
                  <div className="flex flex-wrap gap-1.5 md:col-span-9">
                    {project.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-solid sheen-hover"
                  >
                    Live demo <span className="arrow">→</span>
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-line"
                  >
                    Source <span className="arrow">→</span>
                  </a>
                )}
                {project.links.caseStudy?.startsWith('/') && (
                  <Link href={project.links.caseStudy} className="btn-ghost">
                    Full write-up <span className="arrow">→</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* --------------------------------------------------------------------------
   Project record — a full-width horizontal engineering row
   -------------------------------------------------------------------------- */
function ProjectRow({
  project,
  onOpen,
  index,
}: {
  project: Project
  onOpen: () => void
  index: number
}) {
  const status = project.duration.split('·')[1]?.trim() ?? project.duration

  return (
    <motion.li
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, delay: Math.min(index, 4) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="riser group relative border-b px-4"
      style={{ borderColor: 'var(--line)' }}
    >
      {/* Left accent that grows on hover */}
      <span
        className="pointer-events-none absolute left-0 top-0 h-full w-px origin-top scale-y-0 transition-transform duration-500 group-hover:scale-y-100"
        style={{ background: 'var(--line-3)', transitionTimingFunction: 'cubic-bezier(.22,1,.36,1)' }}
      />

      <div className="relative grid grid-cols-1 gap-6 py-8 md:py-10 lg:grid-cols-12 lg:gap-6">
        {/* Index + status */}
        <div className="flex items-center justify-between gap-4 lg:col-span-1 lg:block">
          <span className="t-mono block text-[var(--subtle)] transition-colors duration-300 group-hover:text-[var(--fg)]">
            {project.id}
          </span>
          <span className="t-label mt-3 hidden lg:block">{status}</span>
        </div>

        {/* Title + role */}
        <div className="lg:col-span-4 lg:pr-8">
          <button
            onClick={onOpen}
            className="block text-left"
            aria-label={`Open case study for ${project.title}`}
          >
            <h3 className="t-item hover-text is-title inline-block transition-transform duration-500 group-hover:translate-x-1">
              {project.title}
            </h3>
          </button>
          <div className="t-mono mt-3 uppercase text-[var(--subtle)]">{project.role}</div>
          <div className="t-label mt-3 lg:hidden">{status}</div>
        </div>

        {/* Description + stack */}
        <div className="lg:col-span-4 lg:pr-8">
          <p className="t-body max-w-[46ch]">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col items-start gap-3 lg:col-span-3 lg:items-end">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line t-mono uppercase"
            >
              Live demo <span className="arrow">→</span>
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line t-mono uppercase text-[var(--muted)] hover:text-[var(--fg)]"
            >
              GitHub <span className="arrow">→</span>
            </a>
          )}
          <button onClick={onOpen} className="btn-line mt-1 min-h-[36px] px-3.5 text-[0.625rem]">
            Case study <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </motion.li>
  )
}

/* --------------------------------------------------------------------------
   Index
   -------------------------------------------------------------------------- */
export default function ProjectsIndex() {
  const [selected, setSelected] = useState<Project | null>(null)
  const [expanded, setExpanded] = useState(false)

  const visible = expanded ? projects : projects.slice(0, 6)

  return (
    <div className="w-full">
      <ul className="border-t" style={{ borderColor: 'var(--line-2)' }}>
        {visible.map((p, i) => (
          <ProjectRow key={p.id} project={p} index={i} onOpen={() => setSelected(p)} />
        ))}
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-10">
        <span className="t-label">
          Showing {String(visible.length).padStart(2, '0')} of {projects.length}
        </span>
        {expanded ? (
          <button onClick={() => setExpanded(false)} className="btn-ghost">
            Collapse <span className="arrow">↑</span>
          </button>
        ) : (
          <button onClick={() => setExpanded(true)} className="btn-line">
            View all projects <span className="arrow">↓</span>
          </button>
        )}
      </div>

      <CaseStudy project={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
